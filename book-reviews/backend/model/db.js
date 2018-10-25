const mongoose = require('mongoose');

// A graceful shut down function
// To be called when process is restarted or terminated
const gracefulShutdown =  (msg, callback) =>{
    // Close Mongoose connection, passing through an 
    // anonymous function to run when closed
    mongoose.connection.close( () => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

const dbURI = 'mongodb://localhost/bookreviews';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Emulating disconnection events on Windows
const readLine = require("readline");
if (process.platform === "win32") {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT",  () => {
        process.emit("SIGINT");
    });
}

// CONNECTION EVENTS
// Monitoring for successful connection through Mongoose
mongoose.connection.on('connected',  () => {
    console.log('Mongoose connected to ' + dbURI);
});

// Checking for connection error
mongoose.connection.on('error',  (err) => {
    console.log('Mongoose connection error: ' + err);
});

// Checking for disconnection event
mongoose.connection.on('disconnected',  () => {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS

// Listens for SIGUSR2, which is what nodemon uses when it restarts app
process.once('SIGUSR2',  () => {
    gracefulShutdown('nodemon restart',  () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination',  () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination',  () => {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
// Use plural form of name
require('./books');