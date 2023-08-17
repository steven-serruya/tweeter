// This function waits for the document (HTML content) to be fully loaded before executing.
$(document).ready(function() {

  // This listens for the "input" event (i.e., when the user types) on the textarea element within the ".new-tweet" class.
  $(".new-tweet textarea").on("input", function() {
    // It gets the length (number of characters) of the current value of the textarea.
    const inputLength = $(this).val().length;

    // Calculates the number of characters remaining by subtracting the input length from the total allowed (140 characters).
    const charsRemaining = 140 - inputLength;
    // Logs the number of characters remaining to the console. This can be useful for debugging purposes.
    console.log(charsRemaining);

    // Selects the element with the ID "counter".
    const counter = $("#counter");
    // Updates the text content of the counter element to show the number of characters remaining.
    counter.text(charsRemaining);

    // If the number of characters remaining is negative (i.e., the user has typed more than the allowed 140 characters)...
    if (charsRemaining < 0) {
      // ...then it changes the color of the counter text to red.
      counter.css('color', 'red');
    } else {
      // If the characters are within the limit, it resets the color of the counter text to its default value.
      counter.css('color', '');
    }
  });
});