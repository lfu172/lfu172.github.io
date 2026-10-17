document.querySelectorAll('.model-motion').forEach(video => {
  video.muted = true;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyPreference = () => {
    video.autoplay = !preference.matches;
    if (preference.matches) video.pause();
    else video.play().catch(() => {});
  };
  preference.addEventListener('change', applyPreference);
  applyPreference();
});
