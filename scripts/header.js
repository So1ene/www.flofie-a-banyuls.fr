function headerAndFooter() {
  const $header = document.getElementById('header');
  const $nav = document.getElementById('site-primary-navigation');
  const $hamburger = document.getElementById('site-mobile-menu');
  const $pageContent = document.querySelector('main');
  const $footer = document.getElementById('footer');

  // Mobile Menu
  function openMobileMenu() {
    if ($header) {
      $header.classList.add('mobile-active');
      $hamburger.setAttribute('aria-expanded', 'true');
    }
    if ($nav) {
      $nav.style.maxHeight = $nav.scrollHeight + 'px';
    }
  }
  function closeMobileMenu() {
    if ($header) {
      $header.classList.remove('mobile-active');
      $hamburger.setAttribute('aria-expanded', 'false');
    }
    if ($nav) {
      $nav.style.maxHeight = null;
    }
  }
  function toggleMobileMenu() {
    if ($header) {
      if ($header.classList.contains('mobile-active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
  }
  $hamburger.addEventListener('click', toggleMobileMenu);

  // Close menu if they click on background
  document.addEventListener('click', function(e){
    var target = e.target;
    if (target !== $header && !$header.contains(target)) {
      closeMobileMenu();
    }
  });

  // Close menu if they focus out (keyboard accessibility)    
  $header.addEventListener('focusout', (e) => {
    if (!$header.contains(e.relatedTarget)) {
      closeMobileMenu();
    }
  });

  // Close menu if the screen resizes to a large viewport
  function closeMobileMenuIfResizeLarge() {
    if (window.innerWidth > 700 && $header.classList.contains('mobile-active')) {
      closeMobileMenu();
    }
  }
  window.addEventListener('resize', closeMobileMenuIfResizeLarge);

  // Adjusts the navbar's inverted state depending on scroll position.
  function adjustHeaderInverted() {
    if ($header) {
      if ((window.scrollY < $header.offsetHeight - 50) || (window.innerWidth < 1000 && window.scrollY == 0)) {
        $header.classList.add('header--inverted');
      } else if ($header.classList.contains('header--inverted')) {
        $header.classList.remove('header--inverted');
      }
    }
  }

  // Adjust header on scroll
  if ($header && $header.classList.contains('header--inverted')) {
    document.addEventListener('scroll', adjustHeaderInverted);
    adjustHeaderInverted();
  }

  // Set min height of document so the footer stays at the bottom
  function setMinHeight() {
    if ($footer && $pageContent) {
      const calc = window.innerHeight - $footer.offsetHeight;
      if ($header && $header.offsetHeight >= calc) {
        $pageContent.style.minHeight = $header.offsetHeight + 'px';
      } else {
        $pageContent.style.minHeight = calc + 'px';
      }
    }
  }
  setMinHeight();
  window.addEventListener('resize', setMinHeight);
}

headerAndFooter();