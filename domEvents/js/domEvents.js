const instructions = ["Say Hello", "Click Me"];

const overMeEl = document.getElementById("overme");

const clickMeEl = document.getElementById("clickMe");

clickMeEl.onclick = sayHello;
let count = 0;

function sayHello() {
    count = 1- count;
    clickMeEl.textContent = instructions[count];
    const helloEl = document.getElementById("demo");
    helloEl.textContent = count ? "Hello World" : "";
}

function dispalyDate() {
    // complete this function.
}

function passOverMe() {
    // use this.style to help you solve this
}

function leaveMe() {
    // complete this function
}
