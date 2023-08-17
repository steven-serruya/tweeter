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

  // Utility function to escape user-provided text

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  $("#tweet-text").on('input', function() {
    $(".error-message").attr('hidden', true);
  });

  $(".writetweet, .down-arrow").click(function() {
    $(".new-tweet").slideToggle();
  });

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault(); // This ensures the form doesn't submit

    const tweetText = $('#tweet-text').val();

    if (!tweetText || tweetText.trim() === "") {
      showErrorMessage("Tweet cannot be empty!");
      return;
    }

    if (tweetText.length > 140) {
      showErrorMessage("Tweet is too long!");
      return;
    }
    $(".error-message").slideUp();


    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/tweets',
      data: formData,
      success: function(response) {
        loadTweets();
        $('#tweet-text').val('');
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
      $('#tweets-container').prepend($tweetElement);
    }
  };


  const createTweetElement = function(tweet) {
    const timeAgo = $.timeago(new Date(tweet.created_at)); // Use timeago here

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

    return $tweet;
  };





});

function showErrorMessage(message) {
  $(".error-message p").text(message);  // Inserting the error message
  $(".error-message").slideDown();      // Slide down the error div
}