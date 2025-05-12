$(document).ready(function () {
  const images = [
    'assets/cover-img.png',
    'assets/cover-img2.png',
    'assets/cover-img3.png',
    'assets/cover-img4.png'
  ];

  let index = 0;
  let normalInterval;
  let fastInterval;

  // Start with normal 3-second background rotation
  normalInterval = setInterval(function () {
    $('.clickable').css('background-image', `url('${images[index]}')`);
    index = (index + 1) % images.length;
  }, 3000);

  $('.clickable').click(function () {
    const $this = $(this); // store the clicked element

    $this.css("animation", "fadeAway 3s ease-out");

    // Stop the normal interval and start the fast one
    clearInterval(normalInterval);

    fastInterval = setInterval(function () {
      $('.clickable').css('background-image', `url('${images[index]}')`);
      index = (index + 1) % images.length;
    }, 500);

    // After 3 seconds, clean up
    setTimeout(function () {
      clearInterval(fastInterval);
      $this.removeClass('clickable');
      $('.big').removeClass('big');
      $('body').css("background-image", "none");
      // $('.hidden').removeClass('hidden');
      $('#title').addClass('show');
    }, 3000);
  });

   

 
});
