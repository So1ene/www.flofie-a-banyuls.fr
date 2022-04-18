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
    }, 500);
  });
})();


// Set webcam time
(function() { 
  $time = document.querySelector('.time');
  if ($time) {
    $time.innerHTML = new Date(new Date()).toLocaleString('fr-FR', {timeZone: 'Europe/Paris', hour: '2-digit', minute:'2-digit' });
  }
})();