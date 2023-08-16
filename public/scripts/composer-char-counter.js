$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const inputLength = $(this).val().length;
    const charsRemaining = 140 - inputLength;
    console.log(charsRemaining);
    const counter = $("#counter");
    counter.text(charsRemaining);
    if (charsRemaining < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');
    }
  });
});