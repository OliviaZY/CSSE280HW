/* 
    Complete these and the remaining functions described in the 
    assignment in this file.

    You may work with your in-class partner.
*/

function isBlank(input) {
    return input.length <= 0;
}

function stringToArray(input) {
    return input.split(' ');
}

function abbreviateName(name) {
    const nameList = name.split(' ');
    const firstName = nameList[0];
    if(nameList.length == 1)
        return firstName;
    const lastName = nameList[1].substring(0, 1) + '.';
    return firstName + ' ' + lastName;
}

function titleCase(input) {
    let toreturn = "";
    let i;
    toreturn += input.charAt(0).toUpperCase();
    for (i = 1; i < input.length; i++){
        if(input.charAt(i-1) == ' '){
            toreturn += input.charAt(i).toUpperCase();
        }else{
            toreturn += input.charAt(i).toLowerCase();
        }
    }
    return toreturn;
}

function firstN(array, n) {
    if (n) {
        if (n < array.length) {
            if (n < 0) {
                return [];
            }
            return array.slice(0, n);
        }
        return array;
    } else {
        return array[0];
    }
}

function lastN(array, n) {
    if (n) {
        if (n < array.length) {
            array.splice(0, array.length - n);
        }
        return array;
    } else {
        return array[array.length - 1];
    }
}

function sumPair(numbers, target) {
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i - 1] + numbers[i] === target) {
            return [i - 1, i];
        }
    }
    return [-1, -1];
}

function move(array, from, to) {
    const temp = array.splice(from, 1);
    if(to>0){
        array.splice(to,0,temp[0]);
    }else{
        array.splice(to+1,0,temp[0]);
    }
    return array;
}

module.exports = {
    isBlank,
    stringToArray,
    abbreviateName,
    titleCase,
    firstN,
    lastN,
    sumPair,
    move
};