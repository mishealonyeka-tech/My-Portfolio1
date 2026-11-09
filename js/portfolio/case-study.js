(function () {
  const root = document.querySelector('[data-case-study]');
  if (!root || !window.PortfolioData || !window.PortfolioUI) return;

  const { categories, projects } = window.PortfolioData;
  const projectId = new URLSearchParams(window.location.search).get('project');
  const project = projects.find((item) => item.id === projectId);
  const setMeta = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && value) node.content = value;
  };

  if (!project) {
    const message = window.PortfolioUI.element('section', 'case-study-not-found');
    message.append(
      window.PortfolioUI.element('p', 'portfolio-eyebrow', 'PROJECT NOT FOUND'),
      window.PortfolioUI.element('h1', '', 'This case study is not available.'),
      window.PortfolioUI.element('a', 'case-study-back', 'Return to the portfolio')
    );
    message.querySelector('a').href = 'index.html#services';
    root.append(message);
    return;
  }

  const category = categories[project.category];
  const categoryProjects = projects.filter((item) => item.category === project.category);
  const categoryIndex = categoryProjects.findIndex((item) => item.id === project.id);
  const description = project.description || `${category.title} project case study.`;
  document.title = `${project.title} — Misheal Onyedikachi Ugwuoke`;
  setMeta('meta[name="description"]', description);

  function text(tag, className, value) {
    return window.PortfolioUI.element(tag, className, value);
  }

  function mediaFrame(imagePath, label, index) {
    const mediaProject = { ...project, coverImage: imagePath || null, heroImage: null };
    const frame = window.PortfolioUI.imageFrame(mediaProject, 'case-study-image', label);
    const marker = frame.querySelector('.placeholder-index');
    if (marker) marker.textContent = String(index + 1).padStart(2, '0');
    frame.dataset.mediaIndex = String(index);
    const image = frame.querySelector('img');
    if (image) {
      image.dataset.lightboxSrc = imagePath;
      image.dataset.lightboxAlt = label;
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Enlarge image: ${label}`);
    }
    return frame;
  }

  function section(className, eyebrow, heading, content) {
    const block = text('section', className);
    const headingTag = className === 'case-study-cover-section' ? 'h1' : 'h2';
    block.append(text('p', 'portfolio-eyebrow', eyebrow), text(headingTag, '', heading));
    if (content) block.append(content);
    return block;
  }

  const cover = section('case-study-cover-section', '01 / PROJECT COVER', project.title);
  cover.append(mediaFrame(project.heroImage || project.coverImage, `${project.title} cover image`, 0));
  const coverMeta = text('div', 'case-study-cover-meta');
  coverMeta.append(text('p', '', project.categoryName), text('p', '', project.year || 'YEAR TO BE ADDED'));
  cover.append(coverMeta);
  root.append(cover);

  const information = section('case-study-information', '02 / PROJECT INFORMATION', 'Project details');
  const details = text('dl', 'case-study-facts');
  [
    ['Client', project.client || 'To be added'],
    ['Industry', project.industry || 'To be added'],
    ['Services', project.services.length ? project.services.join(', ') : 'To be added'],
    ['Project duration', project.duration || 'To be added'],
    ['Project year', project.year || 'To be added']
  ].forEach(([label, value]) => {
    const row = text('div', 'case-study-fact');
    row.append(text('dt', '', label), text('dd', '', value));
    details.append(row);
  });
  information.append(details);
  root.append(information);

  const overview = section('case-study-story', '03 / PROJECT OVERVIEW', 'The brief');
  overview.append(text('p', 'case-study-copy', project.overview || 'Project background, objectives, and creative challenge will be added when this case study is ready.'));
  root.append(overview);

  const direction = section('case-study-story', '04 / CREATIVE DIRECTION', 'The idea');
  direction.append(text('p', 'case-study-copy', project.creativeDirection || 'The creative concept and visual direction will be documented here.'));
  root.append(direction);

  const galleryImages = Array.isArray(project.galleryImages) ? project.galleryImages : [];
  const development = section('case-study-process', '05 / DESIGN DEVELOPMENT', 'From first thought to final form');
  const developmentGrid = text('div', 'case-study-process-grid');
  const processImages = galleryImages.slice(0, 3);
  if (!processImages.length) processImages.push(null, null, null);
  processImages.forEach((imagePath, index) => {
    developmentGrid.append(mediaFrame(imagePath, `${project.title} development image ${index + 1}`, index + 1));
  });
  development.append(developmentGrid);
  development.append(text('p', 'case-study-copy', project.development || 'Design development notes and supporting visuals will be added here.'));
  root.append(development);

  const presentation = section('case-study-presentation', '06 / FINAL PRESENTATION', 'The finished work');
  presentation.append(mediaFrame(project.heroImage || project.coverImage, `${project.title} final presentation`, 4));
  root.append(presentation);

  const projectGallery = section('case-study-gallery-section', '07 / PROJECT GALLERY', 'More from the project');
  const galleryGrid = text('div', 'case-study-gallery-grid');
  const extraImages = galleryImages.slice(3);
  if (extraImages.length) {
    extraImages.forEach((imagePath, index) => galleryGrid.append(mediaFrame(imagePath, `${project.title} gallery image ${index + 1}`, index + 5)));
  } else {
    galleryGrid.append(mediaFrame(null, `${project.title} additional project image`, 5));
  }
  projectGallery.append(galleryGrid);
  root.append(projectGallery);

  const navigation = text('nav', 'case-study-pagination');
  navigation.setAttribute('aria-label', 'Project navigation');
  navigation.append(text('p', 'portfolio-eyebrow', '08 / NEXT PROJECT'));
  const previous = categoryProjects[categoryIndex - 1];
  const next = categoryProjects[categoryIndex + 1];
  if (previous) {
    const link = text('a', '', `← ${previous.title}`);
    link.href = previous.caseStudyUrl;
    navigation.append(link);
  } else {
    navigation.append(text('span', 'pagination-placeholder', ''));
  }
  if (next) {
    const link = text('a', '', `${next.title} →`);
    link.href = next.caseStudyUrl;
    navigation.append(link);
  }
  root.append(navigation);

  const related = section('case-study-related', '09 / RELATED PROJECTS', 'Continue exploring');
  const relatedGrid = text('div', 'portfolio-project-grid related-project-grid');
  project.relatedProjects
    .map((id) => projects.find((item) => item.id === id))
    .filter(Boolean)
    .forEach((item) => relatedGrid.append(window.PortfolioUI.projectCard(item)));
  related.append(relatedGrid);
  root.append(related);

  const lightbox = text('div', 'portfolio-lightbox');
  lightbox.hidden = true;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Project image viewer');
  const lightboxImage = text('img', 'portfolio-lightbox-image');
  const closeButton = text('button', 'lightbox-close', 'Close');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close image viewer');
  const previousButton = text('button', 'lightbox-previous', 'Previous');
  const nextButton = text('button', 'lightbox-next', 'Next');
  previousButton.type = 'button';
  nextButton.type = 'button';
  lightbox.append(closeButton, previousButton, lightboxImage, nextButton);
  root.append(lightbox);

  const availableImages = Array.from(root.querySelectorAll('[data-lightbox-src]'));
  let activeImageIndex = 0;
  let returnFocus = null;

  function showImage(index) {
    activeImageIndex = (index + availableImages.length) % availableImages.length;
    const source = availableImages[activeImageIndex];
    lightboxImage.src = source.dataset.lightboxSrc;
    lightboxImage.alt = source.dataset.lightboxAlt;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (returnFocus) returnFocus.focus();
  }

  availableImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      returnFocus = image;
      showImage(index);
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    });
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        image.click();
      }
    });
  });
  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => showImage(activeImageIndex - 1));
  nextButton.addEventListener('click', () => showImage(activeImageIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(activeImageIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeImageIndex + 1);
  });
})();
