(() => {
    "use strict";
    let book = {}, review;
    const apiUrl = "http://localhost:4500/books/";

    function loadAndDisplayBook() {
        let bookToStoreString, error = false;
        try {
            bookToStoreString = sessionStorage.getItem("bookToStore");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
        }
        if (!error) {
            book._id = JSON.parse(bookToStoreString);
            getBookById();
        }
    }

    function getBookById() {
        $.ajax({
            url: apiUrl + book._id,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    book = data;
                    displayBook();
                } else {
                    console.log("Book not Found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function loadReview() {
        let reviewString, error = false;
        try {
            reviewString = sessionStorage.getItem("reviewToStore");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
        }
        if (!error) {
            review = JSON.parse(reviewString);
        }
    }

    function storeReviewAndGotoUpdate(review) {
        const reviewString = JSON.stringify(review);
        let error = false;
        try {
            sessionStorage.setItem("reviewToStore", reviewString);
        } catch (e) {
            alert("Error reading to session storage");
            error = true;
        }
        if (!error) {
            window.location.href = 'updateReview.html';
        }
    }

    function displayBook() {
        $('#title').text(book.title);
        $('#author').text("By " + displayAuthor(book.author));
        $('#cover-image').append(
            $('<img>').attr('src', book.coverImage).attr('width', "300px").attr('alt', book.title)
        );
        if (window.location.pathname.indexOf('book.html') > -1) {
            displayReviews();
        } else if (window.location.pathname.indexOf('addReview.html') > -1) {
            setupAddReviewHandlers();
        } else if (window.location.pathname.indexOf('updateReview.html') > -1) {
            setupUpdateReviewHandlers();
        }
    }

    function displayReviews() {
        const reviewsContainer = $('#book-reviews');
        let quote;
        reviewsContainer.append($('<h4>').text('Reviews'));
        book.reviews.forEach( (review) => {
            const date = (new Date(review.when)).toLocaleString();
            quote = $('<blockquote>').append(
                '<p>' +
                '<span>' + review.stars + ' Stars</span> ' + review.review + '</p>' +
                '<span class="cite">—  ' + review.author + ' on ' + date + '</span>'
            );
            reviewsContainer.append(quote);
            quote.click( () => {
                storeReviewAndGotoUpdate(review);
            });
        });
    }

    function populateReview() {
        const reviewObject = {
            author: $('[name="author"]').val(),
            review: $('[name="book-review"]').val(),
            stars: $('[name="stars"]').val(),
            when: new Date()
        };
        if (review && review._id) {
            reviewObject._id = review._id;
        }
        return reviewObject;
    }

    function setupAddReviewHandlers() {
        $("#submit-button").click( (e) => {
            e.preventDefault();
            postReview(populateReview());
        });
    }

    function setupUpdateReviewHandlers() {
        loadReview();
        $('[name="author"]').val(review.author);
        $('[name="book-review"]').val(review.review);
        $('[name="stars"]').val(review.stars);
        $("#submit-button").click( (e) => {
            e.preventDefault();
            updateReview(populateReview());
        });
        $("#delete-button").click( (e) =>{
            e.preventDefault();
            deleteReview(populateReview());
        });
    }

    // TODO complete this function to post a newly created review
    // This function is far from being complete, see updateReview for ideas
    function postReview(review) {
        $.ajax({
            url: apiUrl + book._id + '/reviews',
            data: review
        });
    }

    function updateReview(review) {
        $.ajax({
            url: apiUrl + book._id + '/reviews/' + review._id,
            type: 'PUT',
            data: review,
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    window.location.href = "./book.html";
                } else {
                    console.log("Book not Found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function deleteReview(review) {
        $.ajax({
            url: apiUrl + book._id + '/reviews/' + review._id,
            type: 'DELETE',
            dataType: 'JSON',
            success:  () => {
                window.location.href = "./book.html";
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function displayAuthor(author) {
        let result = author[0];
        for (let i =1; i < author.length; i++) {
            result = result + `, ${author[i]}`;
        }
        return result;
    }

    $(document).ready( () => {
        loadAndDisplayBook();
    });

})();
