(function () {
    "use strict";

    const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=89b61c03';

    let responseDiv;
    let plot, year, title, responseType;

    function getFormData(){
        plot = $("[name='plot' option:selected").text();
        responseType=$("[name='r'] option:selected").text();
        title=$('#t').val();
        year=$('#y').val();
        console.log(plot);
        console.log(responseType);
        console.log(title);
        console.log(year);
        loadMovieData();
    }

    function loadMovieData() {
        const inputData = {
            t: title,
            r: responseType,
            y: year,
            plot: plot
        };
         $.ajax(apiUrl, {
             type: 'GET',
             data: inputData,
         });
    }

    $(document).ready(function () {
        //load in initial state
        const searchByTitle = $('#search-by-title-button').on('click', getFormData);
        responseDiv = $('#search-by-title-response');
    });
})();