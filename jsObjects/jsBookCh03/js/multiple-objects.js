// Create class for objects that are hotels
(() => {
    class Hotel {
        constructor(name, rooms, booked) {
            this.name = name;
            this.rooms = rooms;
            this.booked = booked;
        }
        checkAvailability() {
            return this.rooms - this.booked;
        }
    }
    
    // Create two hotel objects
    const quayHotel = new Hotel('Quay', 40, 25);
    const parkHotel = new Hotel('Park', 120, 77);

    // Update the HTML for the page
    let details1 = quayHotel.name + ' rooms: ';
    details1 += quayHotel.checkAvailability();
    const elHotel1 = document.getElementById('hotel1');
    elHotel1.textContent = details1;

    let details2 = parkHotel.name + ' rooms: ';
    details2 += parkHotel.checkAvailability();
    const elHotel2 = document.getElementById('hotel2');
    elHotel2.textContent = details2;

    /* 
    NOTE: textContent does not work in IE8 or earlier
    You can use innerHTML on lines 21 and 26, but note the security issues on p228-231
    */

    /* 
    NOTE: textContent does not work in IE8 or earlier
    You can use innerHTML on lines 21 and 26, but note the security issues on p228-231
    */
})();