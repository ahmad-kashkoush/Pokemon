
**The assignment is still being refined and is not yet in its final version. Updates will follow soon.**
# pokemon-trainer

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Implemented requirements

**Note**: Still in-progress

### Core

- [x] Trainers can see a list of Pokémon with some general information, such as ==name, number, picture and types.==
- [x] Trainers can search for Pokémon by ==name and number.==
- [x] Trainers can see the details of a Pokémon, with the general info ==(name, number, picture, types) but also things like abilities, move set and stats.==
- [x] Trainers can mark a Pokémon as favourite (or remove it from favourites).
- [x] Trainers have a ==separate list with only their favourite Pokémon.==
- [x] Trainers can see a bigger version of the picture of a Pokémon (from the details of one). Include zoom & pan. (for web: we’re looking for a lightbox component)

### Nice to Have

- [x] Some trainers are forgetful, and don’t remember the name or number of a pokemon. Searching by type (such as “fire”) should also be possible.

- [x] Trainers are always on the road in search of new Pokémon so they don’t always have the best connection. The customer would like to have loading and error indicators when data can not be found or it takes long too long.
- [x] Besides their favourites, trainers would also like to manage their team of Pokémon. A trainer’s team is limited to 6 Pokémon.
- [x] Trainers would like to see more than one picture for Pokémon if available on the detail screen (think carousel like UI).


## Demo

### App Demonstration



https://github.com/user-attachments/assets/aa7115f6-fc8f-4e4f-a78d-c407f8992bf5

