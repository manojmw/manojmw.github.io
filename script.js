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
    $('#total-publications, #total-publications-display').text(totalPublications);

    function updatePublicationsDisplay() {
        var visiblePublications = 0;
        $('.publication').each(function(index) {
            if (index < publicationsToShow) {
                $(this).show();
                visiblePublications++;
            } else {
                $(this).hide();
            }
        });

        $('#total-publications-display').text(visiblePublications);

        if (publicationsToShow >= totalPublications) {
            $('#show-more-publications').hide();
        } else {
            $('#show-more-publications').show();
        }
    }

    function filterPublications() {
        var searchQuery = $('#search-publication').val().toLowerCase();
        var selectedType = $('#type-select').val();

        $('.publication').each(function() {
            var title = $(this).find('.pub-title').text().toLowerCase();
            var type = $(this).find('.pub-type').text();

            if ((searchQuery === '' || title.includes(searchQuery)) && (selectedType === '' || type === selectedType)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        totalPublications = $('.publication:visible').length;
        $('#total-publications-display').text(totalPublications);
        publicationsToShow = 10;
        updatePublicationsDisplay();
    }

    updatePublicationsDisplay();

    $('#show-more-publications').on('click', function() {
        publicationsToShow += 10;
        updatePublicationsDisplay();
    });

    $('#view-all-publications').on('click', function(e) {
        e.preventDefault();
        publicationsToShow = totalPublications;
        updatePublicationsDisplay();
    });

    $('#search-publication').on('input', filterPublications);
    $('#type-select').on('change', filterPublications);
});
