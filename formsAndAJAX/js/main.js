(function () {
    "use strict";

    const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=89b61c03';

    let responseDiv;

    $(document).ready(function () {
        //load in initial state
        responseDiv = $('#search-by-title-response');
    });
})();