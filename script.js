// Manoj M Wagle
// 9 Apr 2023

$(document).ready(function () {
    // Initialize website
    initializeWebsite();
    
    // Load all sections
    loadSections();
    
    // Setup navigation
    setupNavigation();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup back to top button
    setupBackToTop();
    
    // Setup performance optimizations
    setupPerformanceOptimizations();
});

function initializeWebsite() {
    // Show loading indicator
    $('#loading-indicator').removeClass('hidden');
    
    // Add smooth reveal animation to body
    $('body').css('opacity', '0');
    
    // Hide loading indicator after content is loaded
    $(window).on('load', function() {
        setTimeout(() => {
            $('#loading-indicator').addClass('hidden');
            $('body').animate({ opacity: 1 }, 500);
            
            // Trigger initial scroll animations
            checkScrollAnimations();
        }, 800);
    });
}

function loadSections() {
    const sections = [
        'about',
        'education', 
        'experience',
        'awards',
        'publications',
        'professionalcontributions',
        'presentations',
        'contact'
    ];
    
    let loadedSections = 0;
    const totalSections = sections.length;
    
    sections.forEach(section => {
        $(`#${section}-section`).load(`${section}.html`, function() {
            loadedSections++;
            
            // Initialize section-specific functionality
            initializeSectionFeatures(section);
            
            // Check if all sections are loaded
            if (loadedSections === totalSections) {
                onAllSectionsLoaded();
            }
        });
    });
}

function initializeSectionFeatures(section) {
    switch(section) {
        case 'awards':
            setTimeout(() => initializeAwards(), 100);
            break;
        case 'publications':
            setTimeout(() => initializePublications(), 100);
            break;
        case 'contact':
            setTimeout(() => initializeContact(), 100);
            break;
    }
}

function onAllSectionsLoaded() {
    // Setup intersection observer for animations
    setTimeout(() => setupIntersectionObserver(), 500);
    
    // Update navigation active states
    updateActiveNavigation();
    
    // Setup lazy loading for images
    setupLazyLoading();
}

function setupNavigation() {
    const hamburger = $('#hamburger');
    const mobileMenu = $('#mobile-menu');
    const navbar = $('.navbar');
    let lastScrollTop = 0;
    
    // Mobile menu toggle
    hamburger.on('click', function() {
        $(this).toggleClass('active');
        mobileMenu.toggleClass('active');
        $('body').toggleClass('menu-open');
    });
    
    // Close mobile menu when clicking on links
    $('.mobile-nav-link').on('click', function() {
        hamburger.removeClass('active');
        mobileMenu.removeClass('active');
        $('body').removeClass('menu-open');
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.hamburger, .mobile-menu').length) {
            hamburger.removeClass('active');
            mobileMenu.removeClass('active');
            $('body').removeClass('menu-open');
        }
    });
    
    // Navbar hide/show on scroll
    $(window).on('scroll', throttle(function() {
        const scrollTop = $(this).scrollTop();
        
        if (scrollTop > 100) {
            navbar.addClass('scrolled');
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.addClass('hidden');
            } else {
                // Scrolling up
                navbar.removeClass('hidden');
            }
        } else {
            navbar.removeClass('scrolled hidden');
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $($(this).attr('href'));
        if (target.length) {
            const offsetTop = target.offset().top - 80;
            
            $('html, body').animate({
                scrollTop: offsetTop
            }, 800, 'easeInOutCubic');
        }
    });
}

function updateActiveNavigation() {
    const sections = $('section[id]');
    const navLinks = $('.nav-menu a, .mobile-nav-link');
    
    $(window).on('scroll', throttle(function() {
        const scrollTop = $(window).scrollTop() + 100;
        
        sections.each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionBottom = sectionTop + section.outerHeight();
            const sectionId = section.attr('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                navLinks.removeClass('active');
                navLinks.filter(`[href="#${sectionId}"]`).addClass('active');
            }
        });
    }, 100));
}

function setupScrollAnimations() {
    // Add scroll animation classes to elements
    const animationElements = [
        '.timeline-item',
        '.item',
        '.award',
        '.publication',
        '#professionalcontributions li',
        '#presentations li',
        '.contact-item',
        '.fade-in'
    ];
    
    animationElements.forEach(selector => {
        $(selector).addClass('scroll-animate');
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = $(entry.target);
                
                // Add animation classes based on element type
                if (element.hasClass('timeline-item')) {
                    element.addClass('animate');
                } else if (element.hasClass('item')) {
                    element.addClass('animate');
                } else if (element.hasClass('award')) {
                    element.addClass('animate');
                } else if (element.hasClass('publication')) {
                    element.addClass('animate');
                } else if (element.closest('#professionalcontributions').length) {
                    element.addClass('animate');
                } else if (element.closest('#presentations').length) {
                    element.addClass('animate');
                } else if (element.hasClass('contact-item')) {
                    element.addClass('animate');
                } else if (element.hasClass('fade-in')) {
                    element.addClass('visible');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements when they exist
    $('.scroll-animate').each(function() {
        observer.observe(this);
    });
}

function checkScrollAnimations() {
    // Fallback for browsers that don't support Intersection Observer
    if (!window.IntersectionObserver) {
        $(window).on('scroll resize', throttle(function() {
            $('.scroll-animate').each(function() {
                const element = $(this);
                const elementTop = element.offset().top;
                const windowBottom = $(window).scrollTop() + $(window).height();
                
                if (elementTop < windowBottom - 100) {
                    if (element.hasClass('timeline-item') || element.hasClass('item')) {
                        element.addClass('animate');
                    } else if (element.hasClass('fade-in')) {
                        element.addClass('visible');
                    }
                }
            });
        }, 100));
    }
}

function setupBackToTop() {
    const backToTopButton = $('#back-to-top');
    
    // Show/hide back to top button
    $(window).on('scroll', throttle(function() {
        if ($(this).scrollTop() > 500) {
            backToTopButton.addClass('visible');
        } else {
            backToTopButton.removeClass('visible');
        }
    }, 100));
    
    // Back to top functionality
    backToTopButton.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutCubic');
    });
}

function initializeAwards() {
    let awardsToShow = 6;
    const totalAwards = $('.award').length;
    $('#total-awards').text(totalAwards);
    
    function updateAwardsDisplay() {
        $('.award').each(function(index) {
            if (index < awardsToShow) {
                $(this).show().addClass('scroll-animate');
            } else {
                $(this).hide();
            }
        });
        
        if (awardsToShow >= totalAwards) {
            $('#show-more').hide();
        } else {
            $('#show-more').show();
        }
        
        const displayedAwards = `1-${Math.min(awardsToShow, $('.award:visible').length)}`;
        $('#displayed-awards').text(displayedAwards);
    }
    
    updateAwardsDisplay();
    
    $('#show-more').on('click', function() {
        const currentCount = awardsToShow;
        awardsToShow += 6;
        updateAwardsDisplay();
        
        // Animate new awards
        $('.award').slice(currentCount, awardsToShow).each(function(index) {
            const award = $(this);
            setTimeout(() => {
                award.addClass('animate');
            }, index * 100);
        });
    });
    
    $('#view-all').on('click', function(e) {
        e.preventDefault();
        const currentCount = awardsToShow;
        awardsToShow = totalAwards;
        updateAwardsDisplay();
        
        // Animate all new awards
        $('.award').slice(currentCount).each(function(index) {
            const award = $(this);
            setTimeout(() => {
                award.addClass('animate');
            }, index * 50);
        });
    });
}

function initializePublications() {
    let publicationsToShow = 10;
    const totalPublications = $('.publication').length;
    $('#total-publications, #total-publications-display').text(totalPublications);
    
    function updatePublicationsDisplay() {
        let visibleCount = 0;
        $('.publication').each(function(index) {
            if (index < publicationsToShow) {
                $(this).show().addClass('scroll-animate');
                visibleCount++;
            } else {
                $(this).hide();
            }
        });
        
        $('#total-publications-display').text(visibleCount);
        
        if (publicationsToShow >= totalPublications) {
            $('#show-more-publications').hide();
        } else {
            $('#show-more-publications').show();
        }
    }
    
    updatePublicationsDisplay();
    
    $('#show-more-publications').on('click', function() {
        const currentCount = publicationsToShow;
        publicationsToShow += 10;
        updatePublicationsDisplay();
        
        // Animate new publications
        $('.publication').slice(currentCount, publicationsToShow).each(function(index) {
            const publication = $(this);
            setTimeout(() => {
                publication.addClass('animate');
            }, index * 100);
        });
    });
    
    $('#view-all-publications').on('click', function(e) {
        e.preventDefault();
        const currentCount = publicationsToShow;
        publicationsToShow = totalPublications;
        updatePublicationsDisplay();
        
        // Animate all new publications
        $('.publication').slice(currentCount).each(function(index) {
            const publication = $(this);
            setTimeout(() => {
                publication.addClass('animate');
            }, index * 50);
        });
    });
    
    // Search and filter functionality
    function searchAndFilterPublications() {
        const searchTerm = $('#search-publication').val().toLowerCase();
        const selectedType = $('#type-select').val().toLowerCase();
        let visibleCount = 0;
        
        $('.publication').each(function() {
            const publication = $(this);
            const title = publication.find('span').first().text().toLowerCase();
            const type = publication.find('.pub-type').text().toLowerCase();
            
            const matchesSearchTerm = searchTerm === '' || title.includes(searchTerm);
            const matchesSelectedType = selectedType === '' || type.includes(selectedType);
            
            if (matchesSearchTerm && matchesSelectedType) {
                publication.show();
                visibleCount++;
            } else {
                publication.hide();
            }
        });
        
        $('#total-publications-display').text(visibleCount);
    }
    
    $('#search-publication, #type-select').on('input change', debounce(searchAndFilterPublications, 300));
}

function initializeContact() {
    // Create email addresses (simple obfuscation)
    $('#uni-email').text(createEmail('mwag8019', 'uni.sydney.edu.au'));
    $('#cmri-email').text(createEmail('mwagle', 'cmri.org.au'));
    
    // Add click-to-copy functionality
    $('[id$="-email"]').on('click', function() {
        const email = $(this).text();
        copyToClipboard(email);
        showToast('Email copied to clipboard!');
    }).css('cursor', 'pointer');
}

function createEmail(user, domain) {
    return user + '@' + domain;
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

function showToast(message) {
    // Create toast notification
    const toast = $(`
        <div class="toast" style="
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--text-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--border-radius-lg);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        ">
            ${message}
        </div>
    `);
    
    $('body').append(toast);
    
    setTimeout(() => toast.css('opacity', '1'), 100);
    setTimeout(() => {
        toast.css('opacity', '0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function setupLazyLoading() {
    // Lazy load images
    $('img[data-src]').each(function() {
        const img = $(this);
        const src = img.attr('data-src');
        
        img.attr('src', src).removeAttr('data-src');
    });
}

function setupPerformanceOptimizations() {
    // Preload critical CSS
    const criticalCSS = $('<link rel="preload" href="style.css" as="style">');
    $('head').append(criticalCSS);
    
    // Add will-change properties to animated elements
    $('.timeline-item, .item, .award, .publication').css('will-change', 'transform, opacity');
    
    // Remove will-change after animations complete
    setTimeout(() => {
        $('.timeline-item, .item, .award, .publication').css('will-change', 'auto');
    }, 5000);
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add custom easing for smooth animations
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

// Handle resize events
$(window).on('resize', debounce(function() {
    // Recalculate animations on resize
    checkScrollAnimations();
    
    // Close mobile menu on larger screens
    if ($(window).width() > 768) {
        $('#hamburger').removeClass('active');
        $('#mobile-menu').removeClass('active');
        $('body').removeClass('menu-open');
    }
}, 250));

// Add keyboard navigation support
$(document).on('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        $('#hamburger').removeClass('active');
        $('#mobile-menu').removeClass('active');
        $('body').removeClass('menu-open');
    }
    
    // Navigate with arrow keys when menu is open
    if ($('#mobile-menu').hasClass('active')) {
        const menuLinks = $('.mobile-nav-link');
        const currentIndex = menuLinks.index(document.activeElement);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % menuLinks.length;
            menuLinks.eq(nextIndex).focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuLinks.length - 1;
            menuLinks.eq(prevIndex).focus();
        }
    }
});

// Add focus management for accessibility
$('.mobile-nav-link').on('focus', function() {
    $(this).addClass('focused');
}).on('blur', function() {
    $(this).removeClass('focused');
});

// Performance monitoring
if (typeof performance !== 'undefined') {
    $(window).on('load', function() {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 1000);
    });
}

// Add print styles support
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections for printing
    $('.award, .publication').show();
    $('#show-more, #show-more-publications').hide();
});

window.addEventListener('afterprint', function() {
    // Restore original state after printing
    initializeAwards();
    initializePublications();
});
