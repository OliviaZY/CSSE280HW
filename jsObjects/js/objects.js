// Create the simon object

const simon =  {	
    first: "Simon",
    last: "Willison",
    getFullName: function () {
        return this.first + ' ' + this.last;
    }
};  

// ways to access properties and methods
// use member notation
const firstName =  simon.first;
const fullname = simon.getFullName();

// use associative array notation
const simonsFirstName = simon["first"]; 
const simonsFullName = simon["getFullName"]();


// constructor notation

const bill = new Object();
bill.first = "Bill";
bill.last = "Waterson";
bill.age = 25;
bill.getFullName = function () {
    return this.first + ' ' + this.last;
};

// Ways to update an object
const lnp = "last";
bill.first = "William";
bill[lnp] = "James";
delete bill.age;

console.log(bill.getFullName());

const names = ['Locke', 'Franklin', 'Smith', 'Misses'];

/* 
    Quiz Practice Question on set timeout and array
    Question:
        - use setTimeout() in a loop to log each name of the 
        names array such that each name is logged 1 second 
        after it is visited. 
*/


// Attempt 1
const logName = name => {
    console.log(name);
};
let name;

for (let i=0; i < names.length; i++) {
    name = names[i];
    setTimeout( () => {
        const current = name;
        logName(current);
    }, 1000);
}

// Why isn't Attempt 1 working as expected?
// How do we fix this?

