document.querySelectorAll('.mobile-menu-toggle').forEach((toggle) => {
  const menu = document.getElementById(toggle.getAttribute('aria-controls'));
  if (!menu) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('is-open', !isExpanded);
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
});

const quoteForm = document.querySelector('#quote-form');
const formMessage = document.querySelector('#form-message');

if (quoteForm && formMessage) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
      formMessage.textContent = 'Please complete the required fields so I can respond properly.';
      quoteForm.reportValidity();
      return;
    }

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const company = document.querySelector('#company').value.trim();
    const service = document.querySelector('#service').value;
    const budget = document.querySelector('#budget').value;
    const details = document.querySelector('#details').value.trim();

    const subject = encodeURIComponent('Project Quote Request');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nService: ${service}\nBudget: ${budget}\n\nProject details:\n${details}`
    );

    formMessage.style.color = '#2d6b2f';
    formMessage.textContent = `Thank you, ${name}. Your request is ready to send.`;
    window.location.href = `mailto:mishealonyedika@gmail.com?subject=${subject}&body=${body}`;
  });
}

const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
const projectCount = document.querySelector('#project-count');

if (filterButtons.length && projects.length && projectCount) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      let visible = 0;
      projects.forEach((project) => {
        const show = category === 'all' || project.dataset.category === category;
        project.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });
      projectCount.textContent = category === 'all' ? '06' : String(visible).padStart(2, '0');
    });
  });
}