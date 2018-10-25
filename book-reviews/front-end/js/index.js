(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/books/";
    let AllBooks;

    // make ajax call to get all the books from api
    function getBooks() {
        $('#add-book-div').empty();
        $('#add-book-search-results-div').empty();
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    AllBooks = data;
                    console.log(AllBooks);
                    displayBooks(AllBooks);
                } else {
                    displayBooksError('Books not Found in API data store.');
                }
            },
            error:  (request, status, error) => {
                displayBooksError('Error finding book in API data store.');
                console.log(error, status, request);
            }
        });
    }

    // save book ID in browser session storage
    function saveBookIdAndRedirect(bookToStore) {
        let error = false;
        try {
            console.log('Book to store ', bookToStore);
            const bookToStoreString = JSON.stringify(bookToStore._id);
            sessionStorage.setItem("bookToStore", bookToStoreString);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        }
        if (!error) {
            window.location = "book.html";
        }
    }

    // dynamically display all the books from api
    function displayBooks(books) {
        const booksDisplayLocation = $("#display-books-div").empty();
        let jsId, currentBookDiv;
        books.forEach((book) => {
            jsId = "book-" + book.isbn; 
            const isbnToShow = book.isbn[0].identifier || book.isbn[0];
            currentBookDiv = $("<div>").addClass("book").attr("id", jsId);
            currentBookDiv
                .append(
                    '<div class="cover-image">' +
                    '<img src="' + book.coverImage + '" alt="' + book.title +'"' +
                        'width="200px">' +
                    '</div>' +
                    '<div>' +
                        '<h3>' + book.title + '</h3>' +
                        '<p> By ' + displayAuthor(book.author) + '</p>' +
                        '<p>ISBN: ' + isbnToShow + '</p>' +
                    '</div>' +
                    '<div class="clear"></div>'
                );
            booksDisplayLocation.append(currentBookDiv);
            currentBookDiv.click( () => {
                saveBookIdAndRedirect(book);
            });
        });
    }

    function createAddBookForm() {
        $("#display-books-div").empty();
        const container = $("#add-book-div").empty();
        const form = $('<form name="find-book">');
        const submitButton = $('<button id="find-book-button" type="submit" class="table-cell"> Find book </button>');
        form.append('<label for="isbn">Enter book\'s ISBN</label>');
        form.append('<input type="text" name="isbn" class="table-cell" placeholder="e.g., 9781617292422">');
        form.append(submitButton);
        container.append(form);
        container.append('<div class="clear"></div>');
        submitButton.on('click', (event) => {
            event.preventDefault();
            const isbn = $('input[name="isbn"]').val();
            if (isbn && isbn.trim().length > 0) {
                searchForBook();
            } else {
                errorsOnFindingBook('Please enter a valid ISBN number.');
            }
        });
    }

    function searchForBook() {
        const isbn = $('input[name="isbn"]').val().replace(/-/g, '');
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    getBookDetails(data);
                } else {
                    errorsOnFindingBook('No book found with ISBN entered.');
                    console.log("Book not Found");
                }
            },
            error:  (request, status, error) =>{
                errorsOnFindingBook('There was an error with finding a book with ISBN');
                console.log(error, status, request);
            }
        });
    }

    function getBookDetails(results) {
        // const results = JSON.parse(response);
        const newBook = {
            found: false
        };
        console.log(results);
        if (results.totalItems) {
            // There will be only 1 book per ISBN
            const book = results.items[0];
            newBook.title = book.volumeInfo.title;
            newBook.author = book.volumeInfo.authors;
            newBook.printType = book.volumeInfo.printType;
            newBook.pageCount = book.volumeInfo.pageCount;
            newBook.publisher = book.volumeInfo.publisher;
            newBook.publishedDate = book.volumeInfo.publishedDate;
            newBook.webReaderLink = book.accessInfo.webReaderLink;
            newBook.coverImage = book.volumeInfo.imageLinks.thumbnail;
            newBook.isbn = book.volumeInfo.industryIdentifiers;
            newBook.found = true;
        }
        displayBookFound(newBook);

    }
    
    function displayBookFound(book) {
        if (book.found) {
            const container = $('#add-book-search-results-div').empty();
            const jsId = "book-" + book.isbn[0].identifier; 
            const currentBookDiv = $("<div>").addClass("book").attr("id", jsId);
            currentBookDiv.append(
                '<div class="cover-image">' +
                    '<img src="' + book.coverImage + '" alt="' + book.title +'"' +
                        'width="200px">' +
                '</div>' +
                '<div>' +
                    '<h3>' + book.title + '</h3>' +
                    '<p> By ' + displayAuthor(book.author) + '</p>' +
                    '<p>ISBN:' + book.isbn[0].identifier + '</p>' +
                '</div>' +
                '<div class="clear"></div>'
            );
            container.append(currentBookDiv);
            const submitButton = $('<button id="post-book-button" type="submit" class="table-cell"> Add book </button>');
            submitButton.click(() => {
                postBook(book);
            });
            container.append(submitButton);
        } else {
            errorsOnFindingBook('No book found with ISBN entered.');
        }
    }

    // TODO:  Add book to system 
    function postBook(book) {
        // Post the book found ny ISBN from the Google books API
        // Save book ID in browser session storage.
        // Redirect to the page that displays the newly added book.
    }
    
    function errorsOnFindingBook(message) {
        const container = $('#add-book-search-results-div').empty();
        container.append(`<h3 class="error">${message}</h3>`);
    }
    
    function displayBooksError(message) {
        const booksDisplayLocation = $("#display-books-div").empty();
        booksDisplayLocation.append(`<h3 class="error">${message}</h3>`);
    }

    function displayAuthor(author) {
        let result = author[0];
        for (let i =1; i < author.length; i++) {
            result = result + `, ${author[i]}`;
        }
        return result;
    }

    $(document).ready( () => {
        $("#add-book").click(createAddBookForm);
        $("#display-books").click(getBooks);
        getBooks();
    });

})();