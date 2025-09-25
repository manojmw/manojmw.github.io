// Manoj M Wagle
// 9 Apr 2023


$(document).ready(function () {
  
  initializeWebsite();

  
  loadSections();

  
  setupNavigation();

  
  setupBackToTop();

  
  setupPerformanceOptimizations();
});


function initializeWebsite() {
  
  $('#loading-indicator').removeClass('hidden');

  
  $('body').css('opacity', '0');

  
  $(window).on('load', function () {
    setTimeout(() => {
      $('#loading-indicator').addClass('hidden');
      $('body').animate({ opacity: 1 }, 500);
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
    $(`#${section}-section`).load(`${section}.html`, function (response, status) {
      if (status === 'success') {
        loadedSections++;

        
        initializeSectionFeatures(section);

        
        if (loadedSections === totalSections) {
          onAllSectionsLoaded();
        }
      } else {
        console.warn(`Failed to load ${section}.html`);
      }
    });
  });
}

function initializeSectionFeatures(section) {
  switch (section) {
    case 'awards':
      initializeAwards();
      break;
    case 'publications':
      initializePublications();
      break;
    case 'contact':
      initializeContact();
      break;
    default:
      
      break;
  }
}

function onAllSectionsLoaded() {
  
  setupScrollAnimations();

  
  setupIntersectionObserver();
  updateActiveNavigation();
  setupLazyLoading();
}

/* ------------------------------
   Navigation
------------------------------ */
function setupNavigation() {
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const navbar = $('.navbar');
  let lastScrollTop = 0;

  
  hamburger.on('click', function () {
    $(this).toggleClass('active');
    mobileMenu.toggleClass('active');
    $('body').toggleClass('menu-open');
  });

  
  $(document).on('click', '.mobile-nav-link', function () {
    hamburger.removeClass('active');
    mobileMenu.removeClass('active');
    $('body').removeClass('menu-open');
  });

  
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.hamburger, .mobile-menu').length) {
      hamburger.removeClass('active');
      mobileMenu.removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  
  $(window).on('scroll', throttle(function () {
    const scrollTop = $(this).scrollTop();
    if (scrollTop > 100) {
      navbar.addClass('scrolled');
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        
        navbar.addClass('hidden');
      } else {
        
        navbar.removeClass('hidden');
      }
    } else {
      navbar.removeClass('scrolled hidden');
    }
    lastScrollTop = scrollTop;
  }, 100));

  
  $(document).on('click', 'a[href^="#"]', function (e) {
    const href = $(this).attr('href');
    const isHash = href && href.startsWith('#');
    if (!isHash) return;

    e.preventDefault();
    const target = $(href);
    if (target.length) {
      const offsetTop = target.offset().top - 80;
      $('html, body').animate({ scrollTop: offsetTop }, 800, 'easeInOutCubic');
    }
  });
}

function updateActiveNavigation() {
  const sections = $('section[id]');
  const navLinks = $('.nav-menu a, .mobile-nav-link');

  $(window).on('scroll', throttle(function () {
    const scrollTop = $(window).scrollTop() + 100;

    sections.each(function () {
      const section = $(this);
      const sectionTop = Math.floor(section.offset().top);
      const sectionBottom = sectionTop + section.outerHeight();
      const sectionId = section.attr('id');

      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        navLinks.removeClass('active');
        navLinks.filter(`[href="#${sectionId}"]`).addClass('active');
      }
    });
  }, 100)).trigger('scroll');
}


function setupScrollAnimations() {
  
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
  if (!('IntersectionObserver' in window)) {
    
    checkScrollAnimations();
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const $el = $(entry.target);

        
        if ($el.hasClass('fade-in')) {
          $el.addClass('visible');
        } else {
          $el.addClass('animate');
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  
  $('.scroll-animate').each(function () {
    observer.observe(this);
  });
}

function checkScrollAnimations() {
  
  if (!window.IntersectionObserver) {
    $(window).on('scroll resize', throttle(function () {
      const winBottom = $(window).scrollTop() + $(window).height();
      $('.scroll-animate').each(function () {
        const $el = $(this);
        const elTop = $el.offset().top;
        if (elTop < winBottom - 100) {
          if ($el.hasClass('fade-in')) {
            $el.addClass('visible');
          } else {
            $el.addClass('animate');
          }
        }
      });
    }, 100)).trigger('scroll');
  }
}

/* ------------------------------
   Back to top
------------------------------ */
function setupBackToTop() {
  const backToTopButton = $('#back-to-top');

  
  $(window).on('scroll', throttle(function () {
    if ($(this).scrollTop() > 500) {
      backToTopButton.addClass('visible');
    } else {
      backToTopButton.removeClass('visible');
    }
  }, 100));

  
  backToTopButton.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutCubic');
  });
}

/* ------------------------------
   Awards 
------------------------------ */
function initializeAwards() {
  let awardsToShow = 6;
  const totalAwards = $('.award').length;

  $('#total-awards').text(totalAwards);

  function updateAwardsDisplay() {
    $('.award').each(function (index) {
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

  $('#show-more').on('click', function () {
    const currentCount = awardsToShow;
    awardsToShow += 6;
    updateAwardsDisplay();

    
    $('.award').slice(currentCount, awardsToShow).each(function (index) {
      const award = $(this);
      setTimeout(() => {
        award.addClass('animate');
      }, index * 100);
    });
  });

  $('#view-all').on('click', function (e) {
    e.preventDefault();
    const currentCount = awardsToShow;
    awardsToShow = totalAwards;
    updateAwardsDisplay();

    
    $('.award').slice(currentCount).each(function (index) {
      const award = $(this);
      setTimeout(() => {
        award.addClass('animate');
      }, index * 50);
    });
  });
}

/* ------------------------------
   Publications 
------------------------------ */
function initializePublications() {
  let publicationsToShow = 10;
  const totalPublications = $('.publication').length;

  $('#total-publications, #total-publications-display').text(totalPublications);

  function updatePublicationsDisplay() {
    let visibleCount = 0;
    $('.publication').each(function (index) {
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

  $('#show-more-publications').on('click', function () {
    const currentCount = publicationsToShow;
    publicationsToShow += 10;
    updatePublicationsDisplay();

    
    $('.publication').slice(currentCount, publicationsToShow).each(function (index) {
      const publication = $(this);
      setTimeout(() => {
        publication.addClass('animate');
      }, index * 100);
    });
  });

  $('#view-all-publications').on('click', function (e) {
    e.preventDefault();
    const currentCount = publicationsToShow;
    publicationsToShow = totalPublications;
    updatePublicationsDisplay();

    
    $('.publication').slice(currentCount).each(function (index) {
      const publication = $(this);
      setTimeout(() => {
        publication.addClass('animate');
      }, index * 50);
    });
  });

  
  function searchAndFilterPublications() {
    const searchTerm = ($('#search-publication').val() || '').toLowerCase();
    const selectedType = ($('#type-select').val() || '').toLowerCase();
    let visibleCount = 0;

    $('.publication').each(function () {
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

/* ------------------------------
   Contact 
------------------------------ */
function initializeContact() {
  
  $('#uni-email').text(createEmail('mwag8019', 'uni.sydney.edu.au'));
  $('#cmri-email').text(createEmail('mwagle', 'cmri.org.au'));

  
  $('[id$="-email"]')
    .on('click', function () {
      const email = $(this).text();
      copyToClipboard(email);
      showToast('Email copied to clipboard!');
    })
    .css('cursor', 'pointer');
}

function createEmail(user, domain) {
  return user + '@' + domain;
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    
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
  
  const toast = $(`
    <div class="toast" role="status" aria-live="polite">${message}</div>
  `).appendTo('body');

  setTimeout(() => toast.addClass('visible'), 50);
  setTimeout(() => toast.removeClass('visible'), 2200);
  setTimeout(() => toast.remove(), 2600);
}

/* ------------------------------
   Images and Performance
------------------------------ */
function setupLazyLoading() {
  const $lazyImgs = $('img[data-src]');
  if (!$lazyImgs.length) return;

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const $img = $(img);
          $img.attr('src', $img.data('src'));
          $img.removeAttr('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });

    $lazyImgs.each(function () {
      imgObserver.observe(this);
    });
  } else {
    
    $lazyImgs.each(function () {
      const $img = $(this);
      $img.attr('src', $img.data('src'));
      $img.removeAttr('data-src');
    });
  }
}

function setupPerformanceOptimizations() {
  
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () { /* no-op */ }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {
    
  }
}

/* ------------------------------
   Utilities
------------------------------ */
function throttle(fn, wait) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, wait - (now - last));
    }
  };
}

function debounce(fn, delay) {
  let t = null;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* jQuery easing fallback (easeInOutCubic) */
if (typeof $.easing !== 'object') $.easing = {};
if (typeof $.easing.easeInOutCubic !== 'function') {
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };
}
