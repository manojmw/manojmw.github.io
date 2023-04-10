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
        var count = 0;
        $('.publication').each(function(index) {
            if (index < publicationsToShow) {
                $(this).show();
                count++;
            } else {
                $(this).hide();
            }
        });
        $('#total-publications-display').text(count);

        if (publicationsToShow >= totalPublications || totalPublications <= 10) {
            $('#show-more-publications').hide();
        } else {
            $('#show-more-publications').show();
        }
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

    function searchPublications() {
        var searchTerm = $('#search-publication').val().toLowerCase();
        var selectedType = $('#type-select').val().toLowerCase();

        $('.publication').each(function() {
            var title = $(this).find('span').first().text().toLowerCase();
            var type = $(this).find('.pub-type.text().toLowerCase();
            var matchesSearchTerm = searchTerm === '' || title.includes(searchTerm);
            var matchesSelectedType = selectedType === '' || type.toLowerCase().includes(selectedType);

            if (matchesSearchTerm && matchesSelectedType) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $('#search-publication, #type-select').on('input', function() {
        searchPublications();
    });
});
