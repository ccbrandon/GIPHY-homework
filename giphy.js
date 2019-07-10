var topics =["pigs","skunks","badgers","dogs","lions","bears","frogs"];
$(document).ready(function(){
   function createButtons (){
        $("#buttonsDisplay").empty();
        $("#buttonsDisplay").text('');
        for (var i = 0; i < topics.length; i++) {
            //  generates buttons for each topic in the array
            var a = $("<button>");
            a.addClass("giphy");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttonsDisplay").append(a);
        }  
    }
        
    createButtons();
    
    $("#addTopic").on("click", function (e) {
        e.preventDefault();
    
        var topic = $("#giphyInput").val().trim();
    
        topics.push(topic);
        // calls the createButtons to create new button
        createButtons();
    });
    
    
    
    function displayGiphyApi() {
        $('#giphysDisplay').empty('');
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=15";
        
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            var results = res.data;
    
            for (var i = 0; i < results.length; i++) {
    
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    
                    var rating = results[i].rating;
                    var p = $("<p>").html("Rating: " + rating);
                    var image = $('<img>');
    
                    image.attr('src', results[i].images.fixed_height_still.url);
                    image.attr('data-still', results[i].images.fixed_height_still.url)
                    image.attr('data-animate', results[i].images.fixed_height.url)
                    image.attr('data-move', 'still')
                    $("#giphysDisplay").append(p);
                    $("#giphysDisplay").append(image);
                    //will display gif image after the loop on #giphysDisplay
                }
    
            }
        });
    
    }
    
    $(document).on("click", "img", function () {
    
        if ($(this).attr('data-move') === 'still') {
            $(this).attr('src', $(this).attr('data-animate'))
            $(this).attr('data-move', 'animate')
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-move', 'still')
        }
    })
    
    
    $(document).on("click", ".giphy", displayGiphyApi);
    
    
});
