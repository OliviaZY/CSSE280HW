(function () {
    "use strict";
    const apiUrl = "http://localhost:3000/contacts/";
    let contactsDisplayLocation;
    let AllContacts;

    // make ajax call to get all the contacts from api
    function getContacts() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    AllContacts = data;
                    displayContacts(AllContacts);
                } else {
                    console.log("Contact not Found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    // save contact to update in browser storage and go to update page
    function contactRowClickHandler(contact) {
        let error = false;
        function contactWithID(thisContact) {
            return thisContact._id === contact._id;
        }
        const contactToUpdate = AllContacts.filter(contactWithID)[0];
        try {
            const contactToUpdateString = JSON.stringify(contactToUpdate);
            sessionStorage.setItem("contactToUpdate", contactToUpdateString);
        } catch (e) {
            alert(`Error when writing to Session Storage ${e}`);
            error = true;
        }
        if (!error) {
            window.location.href = "update.html";
        }
    }

    // dynamically display all the contacts from api
    function displayContacts(contacts) {
        contactsDisplayLocation = $("table.table-bordered>tbody").empty();
        contacts.forEach( (contact) => {
            const $contactRow = $('<tr>').attr('data-contact-id', contact._id);
            $contactRow.append(
                "<td>" + (contact.firstName || "") + "</td>" +
                "<td>" + (contact.lastName || "") + "</td>" 
            );
            // append row with contact details to DOM tree
            contactsDisplayLocation.append($contactRow);

            // Save contact to update in local storage
            $contactRow.click( () => {
                contactRowClickHandler(contact);
            });
        });
    }

    $(document).ready( () => {
        // get contacts from api
        getContacts();
    });

})();