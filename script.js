// Manoj M Wagle
// 9 Apr 2023

$(document).ready(function () {

    // Load sections

    // About Section
    $("#about-section").load("about.html");


    // Education Section
    $("#education-section").load("education.html");


    // Experience Section
    $("#experience-section").load("experience.html");


    // Awards Section
    $("#awards-section").load("awards.html", function () {
        var awardsToShow = 6;
        var totalAwards = $('.award').length;
        $('#total-awards').text(totalAwards);

        function updateAwardsDisplay() {
            $('.award').each(function (index) {
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

            var displayedAwards = `1-${Math.min(awardsToShow, $('.award').length)}`;
            $('#displayed-awards').text(displayedAwards);
        }
        updateAwardsDisplay();

        $('#show-more').on('click', function () {
            awardsToShow += 6;
            updateAwardsDisplay();
        });

        $('#view-all').on('click', function (e) {
            e.preventDefault();
            awardsToShow = $('.award').length;
            updateAwardsDisplay();
        });
    });


    // Publications Section
    $("#publications-section").load("publications.html", function () {
        var publicationsToShow = 10;
        var totalPublications = $('.publication').length;
        $('#total-publications').text(totalPublications);

        function updatePublicationsDisplay() {
            var count = 0;
            $('.publication').each(function (index) {
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

        $('#show-more-publications').on('click', function () {
            publicationsToShow += 10;
            updatePublicationsDisplay();
        });

        $('#view-all-publications').on('click', function (e) {
            e.preventDefault();
            publicationsToShow = totalPublications;
            updatePublicationsDisplay();
        });

        function searchPublications() {
            var searchTerm = $('#search-publication').val().toLowerCase();
            var selectedType = $('#type-select').val().toLowerCase();
            $('.publication').each(function () {
                var title = $(this).find('span').first().text().toLowerCase();
                var type = $(this).find('.pub-type').text().toLowerCase();
                var matchesSearchTerm = searchTerm === '' || title.includes(searchTerm);
                var matchesSelectedType = selectedType === '' || type === selectedType;
                if (matchesSearchTerm && matchesSelectedType) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }

        $('#search-publication, #type-select').on('input', function () {
            searchPublications();
        });
    });

    // Professional Contributions Section
    $("#professionalcontributions-section").load("professionalcontributions.html");

    // Presentations Section
    $("#presentations-section").load("presentations.html");


    // Contact Section
    $("#contact-section").load("contact.html", function () {
        $('#uni-email').text(createEmail('mwag8019', 'uni.sydney.edu.au'));
        $('#cmri-email').text(createEmail('mwagle', 'cmri.org.au'));
    });

    function createEmail(user, domain) {
        return user + '@' + domain;
    }


    // Last updated tracking code
    const trackedFiles = [
        'about.html',
        'education.html',
        'experience.html',
        'awards.html',
        'publications.html',
        'presentations.html',
        'contact.html',
    ];

    let latestUpdate = new Date(0);

    function fetchLastModified(file) {
        return $.ajax({
            type: 'HEAD',
            url: file,
            success: function (data, textStatus, xhr) {
                const lastModified = new Date(xhr.getResponseHeader('Last-Modified'));
                if (lastModified > latestUpdate) {
                    latestUpdate = lastModified;
                }
            },
        });
    }

    function updateLastUpdated() {
        const requests = trackedFiles.map(fetchLastModified);
        $.when(...requests).done(function () {
            const lastUpdatedDate = latestUpdate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            document.getElementById('last-updated').textContent = lastUpdatedDate;
        });
    }

    updateLastUpdated();


    // Smooth scrolling
    $('.nav-link').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });


    // Show/hide navbar
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
    };
});
