(function () {
  const categories = {
    marketing: {
      name: 'MARKETING & CAMPAIGN',
      title: 'Marketing & Campaign',
      route: 'marketing-campaign.html',
      description: 'Campaign concepts and visual communication built to bring clear ideas to life across digital and print.'
    },
    branding: {
      name: 'BRAND IDENTITY DESIGN',
      title: 'Brand Identity Design',
      route: 'brand-identity.html',
      description: 'Distinctive identity systems designed to express purpose, build recognition, and create consistency.'
    },
    print: {
      name: 'PRINT DESIGN',
      title: 'Print Design',
      route: 'print-design.html',
      description: 'Thoughtful printed communication, shaped with care from layout and typography to final presentation.'
    },
    packaging: {
      name: 'PACKAGING DESIGN',
      title: 'Packaging Design',
      route: 'packaging-design.html',
      description: 'Product packaging concepts that balance shelf presence, clear information, and a considered visual identity.'
    },
    uiux: {
      name: 'UI/UX DESIGN',
      title: 'UI/UX Design',
      route: 'ui-ux-design.html',
      description: 'Clear, considered digital experiences shaped around useful structure and intuitive interaction.'
    },
    websites: {
      name: 'WEBSITE DESIGN & DEVELOPMENT',
      title: 'Website Design & Development',
      route: 'website-design.html',
      description: 'Responsive websites that bring visual craft, clear navigation, and practical functionality together.'
    }
  };

  const projects = [];
  Object.entries(categories).forEach(([categoryId, category]) => {
    for (let number = 1; number <= 7; number += 1) {
      const id = `${categoryId}-project-${String(number).padStart(2, '0')}`;
      projects.push({
        id,
        title: `Project Preview ${String(number).padStart(2, '0')}`,
        category: categoryId,
        categoryName: category.name,
        description: 'Project details and creative story will be added when this placeholder is replaced.',
        overview: null,
        creativeDirection: null,
        development: null,
        year: null,
        client: null,
        industry: null,
        services: [],
        duration: null,
        featured: number === 1,
        coverImage: null,
        heroImage: null,
        galleryImages: [],
        caseStudyUrl: `case-study.html?project=${id}`,
        relatedProjects: []
      });
    }
  });

  projects.forEach((project) => {
    project.relatedProjects = projects
      .filter((candidate) => candidate.category === project.category && candidate.id !== project.id)
      .slice(0, 3)
      .map((candidate) => candidate.id);
  });

  window.PortfolioData = { categories, projects };
})();
