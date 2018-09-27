/* The script is placed inside an immediately invoked function expression
   (arrow function) to help protect the scope of variables */

( () => {
    
    // PART ONE: CREATE HOTEL CLASS AND WRITE OUT THE OFFER DETAILS
    
    // Create a hotel class
    class Hotel {
        constructor (name, roomRate, discount) {
            this.name = name;   // Hotel name
            this.roomRate = roomRate; // Amount in dollars
            this.discount = discount; // Percentage discount
        }

    }
    
    // Write out the hotel name, standard rate, and the special rate
    
    const hotel = new Hotel('Park', 240, 15);
    const hotelName = document.getElementById('hotelName'); // Declare variables/constants to get elements
    const roomRate = document.getElementById('roomRate');
    const specialRate = document.getElementById('specialRate');
    
    hotelName.textContent = hotel.name; // Write hotel name
    roomRate.textContent = '$' + hotel.roomRate.toFixed(2); // Write room rate
    const discountedPrice = hotel.roomRate - (hotel.roomRate * hotel.discount/100.0);
    specialRate.textContent = '$' + discountedPrice; // Write offer price
    
    
    // PART TWO: CALCULATE AND WRITE OUT THE EXPIRY DETAILS FOR THE OFFER
    
    function offerExpires(today) {
        // Declare variables within the function for local scope
        let expiryMsg;
    
        // Add 7 days time (added in milliseconds)
        const weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
        // Create arrays to hold the names of days / months
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        // Collect the parts of the date to show on the page
        const day = dayNames[weekFromToday.getDay()];
        const date = weekFromToday.getDate();
        const month = monthNames[weekFromToday.getMonth()];
        const year = weekFromToday.getFullYear();
    
        // Create the message
        expiryMsg = 'Offer expires next ';
        expiryMsg += day + ' <br />(' + date + ' ' + month + ' ' + year + ')';
        return expiryMsg; // Message displayed to users
    }
    
    const today = new Date(); // Put today's date in variable/constant
    const elEnds = document.getElementById('offerEnds'); // Get the offerEnds element
    elEnds.innerHTML = offerExpires(today); // Add the expiry message
    
    // Finish the immediately invoked function expression
})();
    