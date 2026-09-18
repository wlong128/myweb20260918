document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('#backToTop');
  const navCollapse = document.querySelector('#mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const contactForm = document.querySelector('#contactForm');
  const formStatus = document.querySelector('#formStatus');

  const updatePageState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('show', window.scrollY > 500);

    let currentSection = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) currentSection = section.id;
    });

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  }

  navLinks.forEach((link) => link.addEventListener('click', () => {
    if (window.bootstrap) {
      const instance = bootstrap.Collapse.getInstance(navCollapse);
      if (instance) instance.hide();
    }
  }));

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = '感謝您的邀請！表單內容已確認，正式上線時將串接安全的郵件服務。';
    contactForm.reset();
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updatePageState, { passive: true });
  updatePageState();
});
