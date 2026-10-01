export const experiences = [
  { 
    tabName: 'UofT',
    job: 'University of Toronto IIT',
    title: 'Software Developer',
    duration: 'Jan 2018 - Aug 2018',
    description1: "Arts & Science IIT supports the Faculty’s teaching, learning, research, and administrative operations through its service desk, computing lab management, research computing system administration, data centre operations and application development.",
    description2: 
    `As an software developer I was mainly responsible for the CHASS Data Centre. 
    Notably, I designed changes to the data center that allowed it to continue support for its most popular data set, CANSIM, 
    which was provided to us daily by Statistics Canada and had undergone a schema change. 
    I worked on scripts to extract, transform, and load the newly modifed data sets and quickly deploy the changes to minimize service down time for our clients.
    `,
    technologies: ["PostgreSQL", "PL/pgSQL", "Perl", "Bash", "Java"],
  },
  {
    tabName: 'CIBC',
    job: 'CIBC',
    title: 'Software Developer',
    duration: 'Jan 2020 - Aug 2020',
    description1: "As a developer at CIBC I mainly worked on UI changes and bug fixes for their main sales application which is used internally across all branches.",
    description2: 
    `While working there I completed my PEGA System Architect Certification to get more involved in interesting development projects. 
    I also worked on an internal web application built with Angular and Express that is used by several developement teams to send daily code deployments. 
    `,
    technologies: ["Angular", "Java", "Node", "PEGA"],
  },
  {
    tabName: 'OrderGrid',
    job: 'OrderGrid',
    title: 'Junior Software Engineer',
    duration: 'Sep 2023 - Apr 2026',
    description1: "Designed and implemented scalable test automation and CI/CD solutions across UI, API, and performance testing, improving reliability and efficiency",
    description2: 
    `I developed a Playwright-based framework for end-to-end regression testing that significantly improved efficiency and reliability, reducing execution time by 50% and test flakiness by 90%. 
    I also built API test automation using Jest to ensure comprehensive application coverage, and created JMeter load testing scripts to evaluate system performance under high-traffic conditions. 
    In addition, I integrated automated testing into CI/CD pipelines using GitHub Actions and developed reporting dashboards with GitHub Pages to enhance visibility into test results and support continuous delivery. 
    `,
    technologies: ["Playwright", "Javascript", "Jest", "JMeter", "GitHub Actions CI/CD",],
  },
];

// Each project shows as a row with a media gallery. Media items:
//   { type: 'image' | 'phone' | 'video', src, poster?, caption }
// `src` is a file in src/assets/images, or a path in public/ starting with "/".
// `phone` frames a tall mobile screenshot (add `frame: 'phone'` to a portrait video for the same frame);
// `fit: 'contain'` shows an image whole instead of cropping it. Videos should have a `poster` image.
// Leave out `src` to show a "coming soon" placeholder.
export const projects = [
  {
    title: 'Scrabble Score Tracker',
    eyebrow: 'Two-player online game',
    description1: 'A Scrabble game you can play online with a friend, with the board and scores kept in sync live.',
    highlights: [
      'Game state synced between two players over WebSockets',
      'Scores premium squares, cross-words and the bingo bonus as you drag tiles',
      'Reads a physical 15×15 board from a photo with OpenCV and Tesseract',
    ],
    technologies: ["React", "TypeScript", "FastAPI", "Python", "MongoDB", "Redis", "Socket.IO", "OpenCV"],
    links: [
      { label: 'Play online', url: 'https://vithiru.ddns.net/scrabble/' },
      { label: 'GitHub', url: 'https://github.com/Vithursan-Thiruvarooran/scrabble-score-tracker' }
    ],
    media: [
      { type: 'video', frame: 'phone', src: 'scrabble-new-game.mp4', poster: 'scrabble-new-game.jpg', caption: 'Adding a friend, starting an online game and playing the first word' },
      { type: 'video', frame: 'phone', src: 'scrabble-replay.mp4', poster: 'scrabble-replay.jpg', caption: 'Stepping through a finished game, including a challenged word' },
      { type: 'phone', src: 'scrabble.jpg', caption: 'A game in progress, with your tile rack' },
      { type: 'phone', src: 'scrabble1.png', caption: 'Replaying a finished game move by move' },
      { type: 'phone', src: 'scrabble2.png', caption: 'Starting an online game with a friend' },
    ],
  },
  {
    title: 'Colonist Data Tracker',
    eyebrow: 'Data pipeline and dashboard',
    description1: 'A data pipeline and dashboard that pulls game data from colonist.io and turns it into stats and full game replays.',
    highlights: [
      'A Chrome extension captures replay data from finished colonist.io games',
      'A Python decoder pulls out dice rolls, trades, builds, robber moves and scores',
      'The dashboard shows stats across games, per-game breakdowns and turn-by-turn replays',
    ],
    technologies: ["React", "TypeScript", "FastAPI", "MongoDB", "Docker"],
    links: [
      { label: 'Visit site', url: 'https://vithiru.ddns.net/colonist/' },
      { label: 'GitHub', url: 'https://github.com/Vithursan-Thiruvarooran/colonist-tracker' }
    ],
    media: [
      { type: 'video', frame: 'phone', src: 'colonist-replay.mp4', poster: 'colonist-replay.jpg', caption: 'Opening a game and playing back its replay' },
      { type: 'image', src: 'colonist5.png', caption: 'A player\'s stats across 82 games' },
      { type: 'image', src: 'colonist2.png', caption: 'A game\'s board rebuilt from the replay data' },
      { type: 'image', src: 'colonist3.png', caption: 'Trading and robber breakdowns per player' },
      { type: 'image', src: 'colonist1.png', caption: 'Every captured game, most recent first' },
      { type: 'image', src: 'colonist4.png', fit: 'contain', caption: 'The Chrome extension that captures games' },
      { type: 'video', frame: 'phone', src: 'colonist-stats.mp4', poster: 'colonist-stats.jpg', caption: 'A tour of the stats pages' },
    ],
  },
];

export const about_description1 = 
`
Hi, I'm Vithursan. Whether it's a tough chess puzzle, a board game, or an interesting bug, I enjoy working at something until it gives. That curiosity led me to Computer Science at the University of Toronto, where I specialized in Software Engineering.
`;

export const about_description2 = 
`
Lately I've been working in quality engineering, designing test automation for UI, API and performance testing and running it in CI/CD pipelines.
`; 

export const about_caption = "Based in Toronto. Computer Science at the University of Toronto.";

// Rows under the bio. `link.to` is a section id to scroll to.
export const about_rows = [
  { label: 'At work', text: 'Test automation for UI, API and performance testing.' },
  { label: 'On the side', text: 'A two-player Scrabble game you can play online, and a stats tracker for Colonist.', link: { label: 'See projects', to: 'projects' } },
  { label: 'For fun', text: 'Board games, lots of them. 2026 Catan National Semifinalist.' },
];

export const linkedIn = "https://www.linkedin.com/in/vithursan-t-70b869133/";
export const gitHub = "https://github.com/Vithursan-Thiruvarooran/";