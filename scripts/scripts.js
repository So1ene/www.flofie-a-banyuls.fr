// Remove animations on resize
(function() { 
  let timer = 0;
  window.addEventListener('resize', function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      document.body.classList.add('stop-transitions');
    }
    timer = setTimeout(() => {
      document.body.classList.remove('stop-transitions');
      timer = null;
    }, 100);
  });
})();
