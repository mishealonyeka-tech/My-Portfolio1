# Portfolio data

`projects.js` is the content source for all six disciplines, service galleries, project cards, and case studies. Each category starts with seven editable entries: one `featured` entry and six additional projects. Add entries to the `projects` array generation or replace the generated placeholder records with project objects; keep each `id` unique because case-study URLs use it.

For each real project, edit its record fields: `title`, `description`, `year`, `client`, `industry`, `services`, `duration`, `overview`, `creativeDirection`, and `development`. `coverImage` and `heroImage` accept relative paths from the page, and `galleryImages` is an array of relative image paths. Pages are inside `index.html/`, so a file at `images/projects/branding/nigus-renewable-energy/cover.webp` is referenced as `../images/projects/branding/nigus-renewable-energy/cover.webp` in the project record. Prefer WebP; JPG and PNG also work.

A practical asset layout is `images/projects/<category>/<project-id>/cover.webp`, `hero.webp`, and `presentation-01.webp` onward. Update all image paths in the project's data record. Missing or unavailable images render the built-in preview placeholder; a loaded image replaces the placeholder automatically. No client names, dates, or project claims are filled in unless you add them.

The case-study page is one reusable HTML template at `index.html/case-study.html`; each project opens it with `?project=<id>`. Previous/next links follow the project's category order, and related projects are selected from the same category by default. Edit `relatedProjects` if a cross-category set is preferred.
