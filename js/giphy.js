$(document).ready(function(){
  // This calls the renderButtons() function


  var topics = ['butterflies', 'flowers', 'colors', 'lion', 'deer'];

  renderButtons();

  // Generic function for displaying movie data 
  function renderButtons(){ 

    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
    $('.topicsView').empty();

    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++){

      // Then dynamicaly generates buttons for each movie in the array

      // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('btn btn-primary btn-xs btnTopic'); // Added a class 
        a.attr('data-topic', topics[i]); // Added a data-attribute
        a.text(topics[i]); // Provided the initial button text
        $('.topicsView').append(a); // Added the button to the HTML
    }
    //$('#topic-input').text('');
    $('input[type="text"]').val('');
    
  }

  //adding a button with new topic
  $('#addTopic').on('click', function(){

    // This line of code will grab the input from the textbox
    
    var topic = $('#topic-input').val().trim();

    // The movie from the textbox is then added to our array
    topics.push(topic);
    
    // Our array then runs which handles the processing of our movie array
    renderButtons();
    
    
    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
  })


  // This function handles events where one button is clicked
  $(document.body).on('click', '.btnTopic', function(){

    console.log(topics);

    var tempTopic = $(this).data('topic');
    //console.log(tempTopic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +  tempTopic + "&api_key=dc6zaTOxFJmzC&limit=5";
    
    $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                //console.log(queryURL);

                //console.log(response);
                $('#gifsAppearHere').empty();

                var results = response.data;
                
                for (var i = 0; i < results.length; i++) {

          var myTopicDiv = $('<div>');
          myTopicDiv.addClass('col-lg-2');

          var tImage = $('<img>');
          tImage.attr('src', results[i].images.fixed_width_still.url);
          tImage.attr('data-still', results[i].images.fixed_width_still.url);
          tImage.attr('data-state', 'still');
          tImage.attr('data-animate', results[i].images.fixed_width.url);
          tImage.attr('class', 'topicImg');

          if (results[i].rating == "r" || results[i].rating == "pg-13" || results[i].rating == " ")
          {

          }
          else {

            var p = $('<p id="rating-txt">').text("Rating: " + results[i].rating);
          }

          myTopicDiv.append(p);
          myTopicDiv.append(tImage);

          $('#gifsAppearHere').prepend(myTopicDiv);

                  }

            });
            return false;
     })

      $(document).on('click', '.topicImg', function(){

        var state = $(this).attr('data-state');

        if (state == 'still') {
              $(this).attr('src', $(this).attr('data-animate'));
              $(this).attr('data-state', 'animate');
          }
          else {
              $(this).attr('src', $(this).attr('data-still'));
              $(this).attr('data-state', 'still');
          }

      });


});


  // ========================================================



  // ========================================================




/*
data:
  images:
            fixed_width: {
                url: "http://media1.giphy.com/media/11eZCNibwDFx6w/200w.gif",
                width: "200",
                height: "135",
                size: "72894",
                mp4: "http://media1.giphy.com/media/11eZCNibwDFx6w/200w.mp4",
                mp4_size: "175118",
                webp: "http://media1.giphy.com/media/11eZCNibwDFx6w/200w.webp",
                webp_size: "115364"
            },
            fixed_width_still: {
                url: "http://media1.giphy.com/media/11eZCNibwDFx6w/200w_s.gif",
                width: "200",
                height: "135"
            },
</script>*/