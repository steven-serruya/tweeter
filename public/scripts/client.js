// Wait for the document to be fully loaded

$(document).ready(function() {
  // Fetches tweets from the server

  function loadTweets() {
    $.ajax({
      type: "GET", // HTTP GET request
      url: 'http://localhost:8080/tweets', // URL to fetch data from
      dataType: 'json', // Data type expected from the server
      success: function(data) { // Callback function on successful fetch
        renderTweets(data); // Render the fetched tweets on the page
      },
      error: function() { // Callback function on fetch error
        alert("Error fetching tweets. Please try again later."); // Show an error alert
      }
    });
  }

  loadTweets(); // Initial call to load tweets

  // Utility function to escape user-provided text to prevent XSS attacks

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Listen for input changes in the tweet text area

  $("#tweet-text").on('input', function() {
    $(".error-message").attr('hidden', true);
  });

  // Toggle (show/hide) the new tweet form when the "Write a new tweet" label or down-arrow is clicked

  $(".writetweet, .down-arrow").click(function() {
    $(".new-tweet").slideToggle();
  });

  // Listen for form submission

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const tweetText = $('#tweet-text').val();
    // Check if tweet text is empty

    if (!tweetText || tweetText.trim() === "") {
      showErrorMessage("Tweet cannot be empty!");
      return;
    }
    // Check if tweet text exceeds the limit

    if (tweetText.length > 140) {
      showErrorMessage("Tweet is too long!");
      return;
    }
    $(".error-message").slideUp(); // Hide the error message, make it slide up


    const formData = $(this).serialize(); // Serialize form data for the POST request

    // Send the serialized data to the server

    $.ajax({
      type: "POST", // HTTP POST request
      url: 'http://localhost:8080/tweets', // URL to send data to
      data: formData, // Data to send to the server
      success: function(response) { // Callback function on successful POST
        loadTweets(); // Reload tweets
        $('#tweet-text').val(''); // Clear the tweet text area
      },
      error: function() { // Callback function on POST error
        alert("Error posting tweet. Please try again."); // Show an error alert
      }
    });
  });

  // Renders multiple tweets to the page

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();  // Empty the container


    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet); // Create tweet element for each tweet
      $('#tweets-container').prepend($tweetElement); // Add tweet to the top of the container
    }
  };

  // Create a tweet element using the provided tweet data

  const createTweetElement = function(tweet) {
    const timeAgo = $.timeago(new Date(tweet.created_at)); // Calculate how long ago the tweet was posted

    const $tweet = $(`
      <article class="maketweet">
        <header>
          <div>
            <img src="${escape(tweet.user.avatars)}" alt="${escape(tweet.user.name)}'s avatar">
            <span>${escape(tweet.user.name)}</span>
          </div>
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>${timeAgo}</span> 
          <div class="tweet-icons">
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </footer>
      </article>
    `);

    return $tweet; // Return the tweet element
  };





});
// Function to show an error message on the page

function showErrorMessage(message) {
  $(".error-message p").text(message);  // Inserting the error message
  $(".error-message").slideDown();      // Slide down the error div
}