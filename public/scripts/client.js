$(document).ready(function() {

  function loadTweets() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:8080/tweets',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      },
      error: function() {
        alert("Error fetching tweets. Please try again later.");
      }
    });
  }

  loadTweets();

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault(); // This ensures the form doesn't submit

    const tweetText = $('#tweet-text').val();

    if (!tweetText || tweetText.trim() === "") {
      alert("Tweet cannot be empty!");
      return;  // Stops the function execution here
    }

    if (tweetText.length > 140) {
      alert("Tweet is too long!");
      return;  // Stops the function execution here
    }

    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/tweets',
      data: formData,
      success: function(response) {
        loadTweets();
      },
      error: function() {
        alert("Error posting tweet. Please try again.");
      }
    });
  });


  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').append($tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    const timeAgo = $.timeago(new Date(tweet.created_at)); // Use timeago here

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
            <span>${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <span>${timeAgo}</span> 
          <div class="tweet-icons">
            <span id="timeoftweet">${timeAgo}</span> 
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };



});
