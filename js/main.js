window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('is-hidden');
    setTimeout(() => preloader.remove(), 700);
  }
});

(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');

  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      header.classList.toggle('open');
    });
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        header.classList.remove('open');
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bgLayers = [...document.querySelectorAll('.hero, .page-hero, .biz-visual, .contact-info-card')]
    .filter(el => el.classList.contains('has-photo'));
  const imgLayers = [...document.querySelectorAll('[data-parallax] > img')];

  if (!reduceMotion && (bgLayers.length || imgLayers.length)) {
    let ticking = false;
    const vh = () => window.innerHeight;

    const update = () => {
      bgLayers.forEach(el => {
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - vh() / 2) / vh();
        const pos = 50 + progress * 18;
        el.style.backgroundPosition = `center ${pos}%`;
      });
      imgLayers.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - vh() / 2) / vh();
        const offset = progress * 40;
        img.style.transform = `translateY(${offset}px) scale(1.15)`;
      });
      ticking = false;
    };

    const onParallaxScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
    window.addEventListener('resize', onParallaxScroll);
  }
})();
