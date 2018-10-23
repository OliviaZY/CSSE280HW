const mongoose = require('mongoose');

// Use native promises since the default mpromise is deprecated.
mongoose.Promise = global.Promise;

/* Create a schema to give structure to contacts data. */
const contactSchema  = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    homePhone: String,
    cellPhone: String,
    birthDay: Date,
    website: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;