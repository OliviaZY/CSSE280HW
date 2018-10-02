
// Invocation as a constructor function
function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = function () {
        return this.first + ' ' + this.last;
    };
    this.fullNameReversed = function () {
        return this.last + ', ' + this.first;
    };
}

console.log(new Person('Delvin', 'Thomas').greet()); //Delvin says hi.

function convertFromMiles (to) {
    const feetInMile = 5280;
    const knInMile = 1.6;
    return function (miles) {

    }
}
const milesToKm = convertFromMiles('km');
console.log(milesToKm(100));