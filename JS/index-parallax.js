window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.home-background');
  let scrollPosition = window.pageYOffset;

  parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});
