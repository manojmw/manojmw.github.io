// Smooth scrolling
$('.nav-link').click(function() {
  $('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 500);
  return false;
});

// Show/hide navbar
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

// Form submission
$(document).ready(function() {
  $('#contact').submit(function(e) {
    e.preventDefault();
    $('.status').html('Sending...');
    $.ajax({
      url: 'contact.php',
      method: 'post',
      data: $(this).serialize(),
      success: function(response) {
        $('.status').html('Message sent!');
        $('#contact')[0].reset();
      },
      error: function() {
        $('.status').html('Failed to send message. Please try again later.');
      }
    });
  });
});

// Awards Section
$(document).ready(function() {
    var awardsToShow = 10;
    var totalAwards = $('.award').length;
    $('#total-awards').text(totalAwards);

    function updateAwardsDisplay() {
        $('.award').each(function(index) {
            if (index < awardsToShow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        if (awardsToShow >= totalAwards) {
            $('#show-more').hide();
        } else {
            $('#show-more').show();
        }
        var displayedAwards = `1-${Math.min(awardsToShow, totalAwards)}`;
        $('#displayed-awards').text(displayedAwards);
    }

    updateAwardsDisplay();

    $('#show-more').on('click', function() {
        awardsToShow += 10;
        updateAwardsDisplay();
    });

    $('#view-all').on('click', function(e) {
        e.preventDefault();
        awardsToShow = totalAwards;
        updateAwardsDisplay();
    });
});

// Publications Section
$(document).ready(function() {
    var publicationsToShow = 10;
    var totalPublications = $('.publication').length;
    $('#total-publications').text(totalPublications);

    function updatePublicationsDisplay() {
        $('.publication').each(function(index) {
            if (index < publicationsToShow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        if (publicationsToShow >= totalPublications) {
            $('#show-more-pubs').hide();
        } else {
            $('#show-more-pubs').show();
        }
    }

    updatePublicationsDisplay();

    $('#show-more-pubs').on('click', function() {
        publicationsToShow += 10;
        updatePublicationsDisplay();
    });

    $('#view-all-pubs').on('click', function(e) {
        e.preventDefault();
        publicationsToShow = totalPublications;
        updatePublicationsDisplay();
    });

    $('#search-publications').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();

        $('.publication').each(function() {
            var title = $(this).find('.pub-title').text().toLowerCase();
            if (title.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#search-publications').on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
});
