/*
$ npm install -g jasmine-node
Update .eslintrc.json "env" object: add
"jasmine": true,
Run test:
$ cd path/to/project/js
Create a spec directory and add this file to it.
$ jasmine-node spec
Jasmine unit testing framework -- https://jasmine.github.io/2.0/introduction.html
Jasmine tutorial for beginners --
http://ddayporter.github.io/tutorial/2016/01/01/getting-started-with-jasmine/
Exporting multiple ES6 functions --
https://stackoverflow.com/questions/33178843/es6-export-default-with-multiple-functions-referring-to-each-other
*/

const sar = require('../stringAndArray');

describe("isBlank", function () {
    it("should return true for empty string", function () {
        expect(sar.isBlank("")).toBe(true);
    });

    it("should return false for non-empty string", function () {
        expect(sar.isBlank("hello")).toBe(false);
    });
});

describe("stringToArray", function () {
    it("should split a string with multiple words into an array of strings", function () {
        expect(sar.stringToArray("Robin Singh")).toEqual(["Robin", "Singh"]);
    });
    it("should convert a string with a single word into an array of 1 string", function () {
        expect(sar.stringToArray("Robin")).toEqual(["Robin"]);
    });
});
describe("stringToArray", function () {
    it("should split a string with multiple words into an array of strings", function () {
        expect(sar.stringToArray("Robin Singh")).toEqual(["Robin", "Singh"]);
    });
    it("should convert a string with a single word into an array of 1 string", function () {
        expect(sar.stringToArray("Robin")).toEqual(["Robin"]);
    });
});

describe("abbreviateName", function () {
    it("should return Firstname and lastname Initial", function () {
        expect(sar.abbreviateName("Robin Singh")).toEqual("Robin S.");
    });
    it("should return Firstname if no lastname is provided", function () {
        expect(sar.abbreviateName("Robin")).toEqual("Robin");
    });
});

describe("titleCase", function () {
    it("should convert only the first letter of every word to uppercase", function () {
        expect(sar.titleCase("JavaScript exercises. python exercises."))
            .toEqual("Javascript Exercises. Python Exercises.");
    });
    it("should leave a Title Case string unchanged", function () {
        expect(sar.titleCase("Javascript")).toEqual("Javascript");
    });
});

describe("firstN", function () {
    it("should return the first element if n is not given", function () {
        expect(sar.firstN([7, 9, 0, -2])).toEqual(7);
    });
    it("should return the empty array if the input array is empty", function () {
        expect(sar.firstN([], 3)).toEqual([]);
    });
    it("should return the first n elements if n < array length", function () {
        expect(sar.firstN([7, 9, 0, -2], 3)).toEqual([7, 9, 0]);
    });
    it("should return the input array if n > array length", function () {
        expect(sar.firstN([7, 9, 0, -2], 6)).toEqual([7, 9, 0, -2]);
    });
    it("should return the empty array if n is negative", function () {
        expect(sar.firstN([7, 9, 0, -2], -3)).toEqual([]);
    });
});

describe("lastN", function () {
    it("should return the last element if n is not given", function () {
        expect(sar.lastN([7, 9, 0, -2])).toEqual(-2);
    });
    it("should return the empty array if the input array is empty", function () {
        expect(sar.lastN([], 3)).toEqual([]);
    });
    it("should return the last n elements if n < array length", function () {
        expect(sar.lastN([7, 9, 0, -2], 3)).toEqual([9, 0, -2]);
    });
    it("should return the input array if n > array length", function () {
        expect(sar.lastN([7, 9, 0, -2], 6)).toEqual([7, 9, 0, -2]);
    });
    it("should return the empty array if n is negative", function () {
        expect(sar.lastN([7, 9, 0, -2], -3)).toEqual([]);
    });
});

describe("sumPair", function () {
    let numbers;
    let notFound;
    beforeEach(function () {
        numbers = [10, 20, 10, 40, 50, 60, 70];
        notFound = [-1, -1];
    });

    it("should return array of indices of pair of consecutive numbers that sum to target", function () {
        expect(sar.sumPair(numbers, 50)).toEqual([2, 3]);
    });
    it("should return the array [-1, -1] if the target is not met", function () {
        expect(sar.sumPair(numbers, 35)).toEqual(notFound);
    });
});


describe("move", function () {
    let numbers;
    beforeEach(function () {
        numbers = [10, 20, 30, 40, 50];
    });

    it("should move array element at 'from' index to 'to' index", function () {
        expect(sar.move(numbers, 0, 2)).toEqual([20, 30, 10, 40, 50]);
    });
    it("should work with negative indices", function () {
        expect(sar.move(numbers, -1, -2)).toEqual([10, 20, 30, 50, 40]);
    });
});