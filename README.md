# Jeffrin Singh R, Portfolio

Personal portfolio of **Jeffrin Singh R**, Applied AI Engineer and Full Stack Developer based in Bengaluru.
It showcases my experience, projects, and skills across Python, Document AI, OCR, computer vision, and web platforms.

**Live site:** [jeffrin-singh-r-portfolio.vercel.app](https://jeffrin-singh-r-portfolio.vercel.app/)

---

## Highlights

- **Glass UI:** frosted surfaces, floating navigation, and cursor-follow light on cards.
- **Intro loader:** a WebGL liquid-glass background, a shine-animated "Loading" label, and a progress bar, shown for 1.5 seconds on each visit.
- **Scroll motion:** headings reveal word by word, and sections animate in every time you scroll to them.
- **Hero visual:** a calm abstract animation (rotating rings and a soft colour blob), with a subtle parallax on scroll.
- **Responsive:** works on phones, tablets, and desktops, with a mobile menu.
- **Accessible:** keyboard focus styles, semantic landmarks, and reduced-motion support.
- **Single file:** the whole site is one `index.html` with no build step.

## Sections

| Section | What it shows |
|---|---|
| Hero | Role, short introduction, key metrics, and quick actions |
| About | Summary and core tools |
| Experience | Roles at Exalca, Invendoi AI Solutions, and Silvia Softwares, plus earlier academic work |
| Projects | Featured case study, project details dialog, and a list of other projects |
| Skills | Frontend, backend, databases, AI/ML, and DevOps tools |
| Contact | Email, GitHub, and LinkedIn |

## Tech stack

- **Markup and styling:** HTML5, CSS3 (custom properties, `backdrop-filter`, keyframe animations)
- **Scripting:** vanilla JavaScript (IntersectionObserver, Pointer events, `<dialog>`)
- **Graphics:** WebGL (GLSL fragment shader) for the loader's glass background
- **Fonts:** [Newsreader](https://fonts.google.com/specimen/Newsreader) and [Geist](https://fonts.google.com/specimen/Geist) via Google Fonts
- **Hosting:** Vercel

## Run locally

No install or build is needed.

**Option 1: open the file**

Double-click `index.html`, or open it from your browser's File menu.

**Option 2: local server (recommended)**

```bash
# from the project folder
npx serve .
# or
python -m http.server 8000
```

Then open the address it prints, for example `http://localhost:3000`.

## Project structure

```
.
├── index.html                  # The whole site: markup, styles, and scripts
├── Jeffrin_Singh_R_Resume.pdf  # Downloadable resume linked from the hero
├── agent-skills-main/          # Agent skill files kept alongside the project (not used by the site)
├── .gitignore
└── README.md
```

## Customising

All content lives in `index.html`:

- **Name, role and hero text:** the `<section id="hero">` block.
- **Experience:** the `<section id="experience">` block. Each role is a `.job` item.
- **Projects:** the `<section id="projects">` block. The featured project is the `.featured` card, and the rest are `.project-card` items. The project details dialog is `#projectModal`.
- **Skills:** the `.skill-card` items in `<section id="skills">`.
- **Colours and type:** the `:root` variables at the top of the `<style>` block (`--glass`, `--signal`, `--serif`, `--sans`, and others).
- **Loader timing:** the `1500` value in the intro script sets how long the loader stays on screen, in milliseconds.
- **Resume:** replace `Jeffrin_Singh_R_Resume.pdf` with an updated file of the same name.

## Deploy

The site is static, so any static host works. To deploy on Vercel:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Leave the framework preset as **Other** and deploy. No build command is needed.

## Contact

- Email: [jeffrinsingh854@gmail.com](mailto:jeffrinsingh854@gmail.com)
- GitHub: [github.com/Jeffrin-Singh](https://github.com/Jeffrin-Singh)
- LinkedIn: [linkedin.com/in/jeffrin-singh-r-6721792a3](https://www.linkedin.com/in/jeffrin-singh-r-6721792a3/)

---

© 2026 Jeffrin Singh R. All rights reserved.
