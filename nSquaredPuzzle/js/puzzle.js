(function () {

    /*
        By: <Your name>
        On: <Date>
    */

    "use strict";

    // CONSTANTS
    const SIZE = 4;  // 4 for 16 puzzle, 5 for 25 puzzle, etc.
    const BOARD_WIDTH = 500;  // 500 pixels
    const BORDER_SIZE = 3;    // 3 pixels


    // OTHER VARS


    // called when the page first loads to create tiles and empty space 
    const setup = () => {
        const boardDiv = document.getElementById("board");

    };

    // Exchange the locations of two elements in the DOM.  
    // Assumes that neither element is the parent of the other.	
    // from http://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them

    function swapDomElements(element1, element2) {
        // create marker element and insert it where element1 is
        const temp = document.createElement("div");
        element1.parentNode.insertBefore(temp, element1);

        // move element1 to immediately before element2
        element2.parentNode.insertBefore(element1, element2);

        // move element2 to immediately before where element1 used to be
        temp.parentNode.insertBefore(element2, temp);

        // remove temporary marker node
        temp.parentNode.removeChild(temp);
    }

    // If clicked tile is next to the empty space, 
    // swap them
    function moveTile() {

    }

    window.onload = setup;
})();
