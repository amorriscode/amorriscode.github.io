$(() => {
  // Animate On Scroll
  AOS.init();

  var nav = $("nav");
  var stars = $('.stars');
  var starOffset = stars.offset();

  $(window).scroll(function() {
    if($(this).scrollTop() > (starOffset.top - 100)) {
      $(nav).css('background-color', 'black');
      $(stars).css('position', 'fixed');
    } else {
      $(nav).css('background', 'none');
      $(stars).css('position', 'relative');
    }
  });
});