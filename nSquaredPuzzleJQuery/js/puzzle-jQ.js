
(function () {
    "use strict";

    // CONSTANTS
    const BOARD_WIDTH = 500;  // 500 pixels
    const BORDER_SIZE = 2;    // 3 pixels
	
    // OTHER VARS
    let SQUARE_SIZE;
    let NUM_SQUARES;
    let SIZE;  // 4 for 16 puzzle, 5 for 25 puzzle, etc.
    let tileList = [];
    let spacePos;
    let emptySpace;
    let minSwaps;
    let maxSwaps;

    function getSize() {
        SIZE = parseInt($('[name="size"]:checked').val());
        NUM_SQUARES = SIZE * SIZE;
        SQUARE_SIZE = parseInt((BOARD_WIDTH - (SIZE * BORDER_SIZE * 2))/ SIZE);
        minSwaps = NUM_SQUARES;
        maxSwaps = NUM_SQUARES * 20;
        setupBoard();
    }

    function setup() {
        // Another way to attach an event listener to an element
        $('#sizeChoice').click(getSize);
    }

    // called when the page first loads to create tiles and empty space 
    function setupBoard() {
        tileList = [];
        const boardDiv = $('#board').empty().css('width', `${BOARD_WIDTH}px`);

        for (let i = 1; i <= NUM_SQUARES; i++) {
            let nodeName = i;
            if (i === NUM_SQUARES) {
                nodeName = '&nbsp;';
            }
            const newSpan = $(`<span> ${nodeName} </span>`).addClass('tile').css({
                'width': `${SQUARE_SIZE}px`,
                'height': `${SQUARE_SIZE}px`,
                'lineHeight': `${SQUARE_SIZE}px`,
                'border': `${BORDER_SIZE}px solid white`
            });
            if (i === NUM_SQUARES) {
                newSpan.addClass('space');
                spacePos = NUM_SQUARES - 1;
                emptySpace = newSpan;
            }

            tileList.push(newSpan);
            boardDiv.append(newSpan);
        }

    }

    function shuffleTiles() {
        // Shuffle the tiles
        const numSwaps = parseInt(minSwaps + Math.random() * (maxSwaps - minSwaps));
        let swapCount = 0;
        while (swapCount < numSwaps) {
            const index = parseInt(Math.random() * NUM_SQUARES);
            swapCount += moveTile.call(tileList[index]);  // tileList[index] will be "this" inside moveTile.
        }
    }

    function swapArrayElements(a, p1, p2) {
        const temp = a[p1];
        a[p1] = a[p2];
        a[p2] = temp;
    }

    // If clicked tile is next to the empty space, swap them.
    function moveTile() {

    }

    function sameRow(pos1, pos2, rowSize) {
        return rowNumber(pos1, rowSize) == rowNumber(pos2, rowSize);
    }

    function rowNumber(pos, rowSize) {
        return parseInt(pos / rowSize);
    }

    function isSolved() {

    }

    // Exchange the locations of two JQuery DOM elements.  
    // Assumes that neither element is the parent of the other.	
    // adapted from  http://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them
    function swapDomElements(element1, element2) {
        // create marker element and insert it where element1 is
        const temp = $("<div>");

        // insert temp before element1

        // move element1 to immediately before element2
        element1.insertBefore(element2);

        // move element2 to immediately before where element1 used to be
        element2.insertBefore(temp);

        // remove temporary marker node
    }

    $(window).on('load', setup);

})();



