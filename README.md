# M0616 Nurses — Frontend

Frontend of the **Nurses** application, built with [Angular](https://angular.dev) 22 and TypeScript. It is the web interface of the nurse management API of the intermodular project (module M0616, DAW · Stucom).

## Description

The application lets nurses log in, register, view the list of registered nurses and search for them by name.

The project is split into two repositories:

| Repository | Content |
|---|---|
| [M0616-Nurses](https://github.com/Gerpaes/M0616-Nurses) | Backend: REST API in Symfony 7.4 with Doctrine, PHPUnit tests and continuous integration with GitHub Actions |
| [M0616-Nurses--Frontend](https://github.com/Gerpaes/M0616-Nurses--Frontend) | Frontend: this repository |

### Current status

In this iteration the frontend implements **only the visual part and the navigation** between screens. **It is not connected to the backend yet**: the data shown (nurses, search results, login validation) is sample data defined in each component.

## Screens and routes

| Route | Component | Description | Backend endpoint (next iteration) |
|---|---|---|---|
| `/` | `home` | Home screen. Without a session it shows the "Create account" button | — |
| `/login` | `login` | Nurse login validation | `POST /nurse/login` |
| `/register` | `register` | New nurse registration | `POST /nurse/new` |
| `/search` | `search` | List of all nurses and search by name (example with 3 results) | `GET /nurse/index` · `GET /nurse/name/{name}` |
| `**` | — | Any other route redirects to `/` | — |

### Navigation

- Home ↔ Login
- Home ↔ Register (from Home without a session, through the "Create account" button)
- Home ↔ Search
- From Register and Search you go back to Home with the "Back to home" button.
- On **every** screen, clicking the logo in the header goes back to `/`.

Routes are defined in `src/app/app.routes.ts`. The header with the logo is in `src/app/shared/header`.

## Requirements

- [Node.js](https://nodejs.org) in a version compatible with Angular 22 (see [supported versions](https://angular.dev/reference/versions)). It includes `npm`.
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- [Git](https://git-scm.com)
- [Visual Studio Code](https://code.visualstudio.com) (recommended) with the *Angular Language Service* extension.

TypeScript does not need a separate installation: it is installed with the project dependencies.

## Installation

```bash
git clone https://github.com/Gerpaes/M0616-Nurses--Frontend.git
cd M0616-Nurses--Frontend
npm install
```

## Running the app

```bash
ng serve
```

Open `http://localhost:4200/` in the browser. The app reloads automatically when you save changes.

To check that the project builds before opening a pull request:

```bash
ng build
```

The build output is generated in `dist/`.

## Project structure

```
src/
├── index.html            # Loads the Google Fonts
├── styles.css            # Global CSS variables and shared styles (btn-primary)
└── app/
    ├── app.routes.ts     # Application routes
    ├── shared/
    │   └── header/       # Header with the logo (goes back to /)
    ├── home/
    ├── login/
    ├── register/
    └── search/
```

Each screen is a component created with `ng generate component <name>` and has its own `.html` file.

## Screen requirements

Every screen must include at least:

- An image or icon.
- A `click` interaction that changes a value visible in the view.
- One use of `@if` or `@switch` and one use of `@for` (Angular control flow).
- The header logo that goes back to Home.

## Visual guide

### Fonts

Loaded in `src/index.html`:

- **Titles:** [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk), weight 800, `letter-spacing: -0.035em`. Cover 80/72 px, page title 64 px, card title 40 px, subtitles 24–30 px.
- **Text and UI:** [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans), weights 400, 500 and 600. Body 15–16 px, uppercase labels 13 px with `letter-spacing: 0.18em`.

### CSS variables

Defined in `src/styles.css`. **Always use the variables** instead of hardcoded values.

| Variable | Value | Variable | Value |
|---|---|---|---|
| `--petroleo` | `#0F3B47` | `--melocoton` | `#FFF0E3` |
| `--petroleo-medio` | `#1D5462` | `--melocoton-fuerte` | `#FFE6D1` |
| `--teal` | `#0B6E73` | `--blanco` | `#FFFFFF` |
| `--aqua` | `#5CC3CE` | `--niebla` | `#F3F8FA` |
| `--bruma` | `#D3EEF2` | `--linea` | `#E6EEF1` |
| `--aqua-suave` | `#E3F5F7` | `--gris-texto` | `#3E5C6B` |
| `--naranja` | `#F28C38` | `--rojo` | `#B83232` |

Other variables: `--font-titulos`, `--font-texto`, `--radio-tarjeta` (28px), `--radio-input` (16px) and `--sombra`.

### Primary button

Class `btn-primary` (colour `--aqua`), defined in `src/styles.css`. It is used by the **Login** and **Create account** buttons.

## Translations (ES/EN)

All UI texts live in `public/i18n/es.json` and `public/i18n/en.json`. **No visible text should be hardcoded in the HTML.**

### Rules

1. **Same keys in both files.** If you add a key to `es.json`, add it in the same place in `en.json`. Only the value changes.
2. **Each screen edits only its own block** (`HOME`, `LOGIN`, `REGISTER`, `SEARCH`). Do not touch someone else's block.
3. **Shared or repeated texts go in `COMMON`** (save, cancel, validation errors...). If your text already exists there, reuse it instead of duplicating it.
4. **Key naming:** UPPERCASE with underscores (`CONFIRM_PASSWORD`), no accents or spaces, and describe the element, not the text (`SUBMIT`, not `LOG_IN_BUTTON`).
5. **Order:** keep keys in the same order in both files so differences are easy to review.
6. **One nesting level only**: `SCREEN.KEY`. Do not nest deeper.
7. **Validate the JSON** before committing: no trailing commas and double quotes only.

### Usage in a component

```ts
imports: [TranslatePipe]
```

```html
<h1>{{ 'LOGIN.TITLE' | translate }}</h1>
<input [placeholder]="'LOGIN.EMAIL' | translate">
```

### Adding a new text

1. Add the key to `es.json` inside your block.
2. Add the same key to `en.json` with the English translation.
3. Use it in the HTML with the `translate` pipe.

## Team

| Member | Screen / task |
|---|---|
| Gerson Paredes | Project setup, routes, header and visual guide · Login |
| Natalia Amaya | Home |
| Isabel Sousa | Search · Translations file |
| Mauricio Patiño | Register |

## Workflow

1. Each task has its own **issue** on GitHub, assigned to a team member.
2. Work on your own branch created from `main`:

   ```bash
   git switch main
   git pull
   git switch -c feature/<screen>
   ```

3. Commits follow the format `#N Description`: issue number and description in English, in the imperative mood and starting with a capital letter. Example:

   ```
   #12 Add nurse list to search screen
   ```

4. Open a **pull request** to `main` with `Closes #N` in the description. Gerson reviews the code before merging.

### Avoiding conflicts

- Each person works **only in their screen's folder** (`home/`, `login/`, `register/`, `search/`).
- Changes to `src/styles.css`, `src/app/app.routes.ts` or `src/app/shared/` affect the whole team: agree on them first and make them in small commits.

## Useful commands

| Command | What it does |
|---|---|
| `ng serve` | Starts the development server at `http://localhost:4200/` |
| `ng build` | Builds the project into `dist/` |
| `ng generate component <name>` | Creates a new component (`.ts`, `.html`, `.css` and test) |
| `ng test` | Runs the unit tests with [Vitest](https://vitest.dev/) |