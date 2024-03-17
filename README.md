# InGreed.io frontend

### Tech stack
React + Vite
Testing Framework: Jest
UI Framework: Chakra UI
Contenerization: Docker

### Installation
```sh
npm install
```
or use docker.

### Local development
```sh
npm run dev
```
and to run eslint
```sh
npm run lint
# or to auto fix issues
npm run lint-fix
```
  
You would probably need to run mock api for development, it serves files from src/mocks
```sh
npm run api
```

instead of running app locally you can use docker

### Docker Development
```sh
docker compose up -d
```
if you need to rebuild your container (ex. after adding some libraries to the project)
```sh
docker compose build
```

### Directory structure
```
.

├── public
│   └── // Static media files ex. images
├── src
│   ├── App.jsx
│   ├── components
│   │   └── // Components - reusable code used to build screens
│   ├── screens
│   │   └── // Screens - different views, routing happens between them.
│   ├── utils
│   │   └── // Utils - place for useful functions
│   ├── reducers
│   │   └── // Reducers - place for react state reducer files
│   └── theme
│       └── // Theme - Chakra UI components theming files
└── package.json
```
