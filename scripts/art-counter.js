let artworkNumber = -1;

function updatePage() {
  $.getJSON('data.json', function(data) {
    let updateImage = `<img src="${data[artworkNumber].Img}" class="expandable">`;
    let updateName = `${data[artworkNumber].Title}`;
    let updateTombstone = `${data[artworkNumber].Tombstone}`;
    let updateText = `${data[artworkNumber].Text}`;


    $('#artwork-title, #art-itself, #bodycopy-active, #tombstone').fadeOut(200, function () {
      $('#artwork-name').html(updateName);
      $('#artwork-itself').css("border-color", "#2F00FF");
      $('#art-itself').html(updateImage);
      $('.bodycopy-active').html(updateText);
      $('#tombstone').html(updateTombstone);
      $('#tombstone').css("display", "block");
      $('#artwork-title, #art-itself').fadeIn(200);

      let commodifyTrigger = data[artworkNumber].Commodify;
      console.log(commodifyTrigger);
        $('#title-button').html("COMMODIFY")

      if (commodifyTrigger === `1`) {
        $('#clicktocommodify').css("display", "block");
      } else {
        $('#clicktocommodify').css("display", "none");
      }
    });
  });
}

function commodifyIt() {
  console.log('cheesecake factory');
  $.getJSON('data.json', function(data) {
    let commodifyImage = `<img src="${data[artworkNumber].Commodifyimg}" class="expandable">`;
    console.log(commodifyImage);
    $('#art-itself').html(commodifyImage);
    $('#art-itself').css("border-color", "red");
    $('#title-button').addClass('uncommodify');
    $('#title-button').css("background-color", "red"); // Optional: indicate commodified state
    $('#title-button').html('RETURN')
  });
}

$(document).ready(function () {
  $('#startbutton').click(function () {
    $('#art-div, #text-div').fadeOut(500, function () {
      $('#art-div, #text-div').addClass('hidden');
      $('#active-text-div, #active-art-div').removeClass('hidden').hide().fadeIn(500);
      artworkNumber = 0;
      updatePage();
    });
  });

  $('#curatorial').click(function () {
    $('#active-text-div, #active-art-div').fadeOut(1000, function () {
      $('#active-text-div, #active-art-div').addClass('hidden');
      $('#text-div, #art-div').removeClass('hidden').hide().fadeIn(1000);
    });
    artworkNumber = -1;
  });

  $(document).on("click", '.expanded', function() {
    $(this).toggleClass('expanded');
    $('#rightleft').toggleClass('hidden');
  });

  $(document).on("click", '.expandable', function() {
    $(this).parent().parent().toggleClass('expanded');
    $('#rightleft').toggleClass('hidden');
  });

  $(document).on("click", ".arrow-clickable-right", function() {
    $('#title-button').css("background-color", "#2F00FF");
    if (artworkNumber > 6) return;
    artworkNumber++;
    console.log(artworkNumber);
    updatePage();

    $('#right').css("filter", artworkNumber > 6 ? "brightness(50%)" : "none")
               .toggleClass('arrow-clickable-right', artworkNumber <= 6);

    $('#left').css("filter", artworkNumber < 1 ? "brightness(50%)" : "none")
              .toggleClass('arrow-clickable-left', artworkNumber >= 1);
  });

  $(document).on("click", ".arrow-clickable-left", function() {
     $('#title-button').css("background-color", "#2F00FF");
    if (artworkNumber < 1) return;
    artworkNumber--;
    console.log(artworkNumber);
    updatePage();

    $('#left').css("filter", artworkNumber <= 0 ? "brightness(50%)" : "none")
              .toggleClass('arrow-clickable-left', artworkNumber > 0);

    $('#right').css("filter", artworkNumber > 6 ? "brightness(50%)" : "none")
               .toggleClass('arrow-clickable-right', artworkNumber <= 6);
  });

  // Unified click handler for commodify/uncommodify toggle
  $(document).on("click", '#title-button', function () {
    if ($(this).hasClass('uncommodify')) {
      $(this).removeClass('uncommodify');
      $(this).css("background-color", "#2F00FF");
      updatePage();
    } else {
      commodifyIt();
    }
  });
});
