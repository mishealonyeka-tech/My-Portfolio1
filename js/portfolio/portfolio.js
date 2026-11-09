(function () {
  const { categories, projects } = window.PortfolioData;

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== '') node.textContent = text;
    return node;
  }

  function imageFrame(project, className, label) {
    const frame = element('div', `portfolio-image-frame ${className || ''}`.trim());
    const placeholder = element('span', 'project-placeholder');
    placeholder.append(
      element('span', 'placeholder-index', String(project.id.slice(-2))),
      element('strong', '', 'PROJECT PREVIEW'),
      element('small', '', 'IMAGES COMING SOON')
    );
    frame.append(placeholder);

    const imagePath = project.heroImage || project.coverImage;
    if (imagePath) {
      const image = element('img', 'portfolio-image');
      image.alt = label || `${project.title} project preview`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('load', () => frame.classList.add('has-image'), { once: true });
      image.addEventListener('error', () => image.remove(), { once: true });
      image.src = imagePath;
      if (image.complete && image.naturalWidth > 0) frame.classList.add('has-image');
      frame.append(image);
    }
    return frame;
  }

  function projectCard(project) {
    const link = element('a', 'portfolio-project-card');
    link.href = project.caseStudyUrl;
    link.setAttribute('aria-label', `View ${project.title} case study`);
    link.append(imageFrame(project, 'portfolio-project-thumb'));

    const details = element('div', 'portfolio-project-details');
    details.append(
      element('p', 'portfolio-project-category', project.categoryName),
      element('h3', '', project.title)
    );
    const footer = element('span', 'portfolio-project-cta');
    footer.append(element('span', '', 'VIEW PROJECT'), element('span', 'portfolio-arrow', '↗'));
    details.append(footer);
    link.append(details);
    return link;
  }

  function renderServicePage() {
    const main = document.querySelector('[data-service-page]');
    if (!main) return;
    const categoryId = main.dataset.servicePage;
    const category = categories[categoryId];
    if (!category) return;

    const featured = projects.find((project) => project.category === categoryId && project.featured);
    const featuredHost = main.querySelector('[data-featured-project]');
    const gallery = main.querySelector('[data-project-grid]');
    if (!featuredHost || !gallery || !featured) return;

    const featuredLink = element('a', 'portfolio-featured-project');
    featuredLink.href = featured.caseStudyUrl;
    featuredLink.setAttribute('aria-label', `View ${featured.title} case study`);
    featuredLink.append(imageFrame(featured, 'portfolio-featured-image'));

    const details = element('div', 'portfolio-featured-details');
    details.append(
      element('p', 'portfolio-project-category', 'FEATURED PROJECT'),
      element('h2', '', featured.title),
      element('p', 'portfolio-featured-description', featured.description)
    );
    const meta = element('p', 'portfolio-featured-meta', `${category.name}  /  YEAR TO BE ADDED`);
    const action = element('span', 'portfolio-featured-action');
    action.append(element('span', '', 'VIEW FULL CASE STUDY'), element('span', 'portfolio-arrow', '↗'));
    details.append(meta, action);
    featuredLink.append(details);
    featuredHost.replaceChildren(featuredLink);

    projects
      .filter((project) => project.category === categoryId && !project.featured)
      .forEach((project) => gallery.append(projectCard(project)));
  }

  function renderHomePreviews() {
    document.querySelectorAll('[data-service-preview]').forEach((preview) => {
      const project = projects.find((item) => item.category === preview.dataset.servicePreview && item.featured);
      if (!project) return;
      const imagePath = project.coverImage || project.heroImage;
      if (!imagePath) return;
      const image = element('img', 'portfolio-image');
      image.alt = `${categories[project.category].title} project preview`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('load', () => preview.classList.add('has-image'), { once: true });
      image.addEventListener('error', () => image.remove(), { once: true });
      image.src = imagePath;
      preview.append(image);
    });
  }

  function renderGallery() {
    const gallery = document.querySelector('[data-portfolio-gallery]');
    if (!gallery) return;
    const filters = document.querySelector('[data-portfolio-filters]');
    if (filters) {
      const allButton = element('button', 'filter active', 'All work');
      allButton.type = 'button';
      allButton.dataset.filter = 'all';
      allButton.setAttribute('role', 'tab');
      allButton.setAttribute('aria-selected', 'true');
      allButton.append(element('sup', '', String(projects.length).padStart(2, '0')));
      filters.append(allButton);

      Object.entries(categories).forEach(([categoryId, category]) => {
        const button = element('button', 'filter', category.name);
        button.type = 'button';
        button.dataset.filter = categoryId;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', 'false');
        button.append(element('sup', '', '07'));
        filters.append(button);
      });
    }

    projects.forEach((project, index) => {
      const item = element('article', 'project');
      item.dataset.category = project.category;
      const link = element('a', 'project-image');
      link.href = project.caseStudyUrl;
      link.setAttribute('aria-label', `View ${project.title} case study`);
      link.append(imageFrame(project, '', `${project.title} project cover`));
      const indicator = element('span', 'view-project');
      indicator.append(element('span', '', 'VIEW PROJECT'), element('b', '', '↗'));
      link.append(indicator);

      const meta = element('div', 'project-meta');
      const copy = element('div');
      copy.append(element('p', 'project-type', project.categoryName), element('h3', '', project.title));
      meta.append(copy, element('p', 'project-number', `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`));
      item.append(link, meta);
      gallery.append(item);
    });

    const count = document.querySelector('#project-count');
    if (count) count.textContent = String(projects.length).padStart(2, '0');
  }

  window.PortfolioUI = { element, imageFrame, projectCard };
  renderServicePage();
  renderHomePreviews();
  renderGallery();
})();
