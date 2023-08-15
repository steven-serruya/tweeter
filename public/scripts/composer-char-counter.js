$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const inputLength = $(this).val().length;
    const charsRemaining = 140 - inputLength;
    console.log(charsRemaining);
    const counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(charsRemaining);
    if (charsRemaining < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');  // Resets to default color if character count goes back within limit
    }
  });
});