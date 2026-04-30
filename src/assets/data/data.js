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

export const projects = [
  {
    title: 'Catan Data Tracker',
    image: 'projectCatanTracker.png',
    description1: 'A web application designed to track and analyze personal Catan game data and see interesting trends.',
    description2: 'You can input game statistics, player statistics, and dice statistics then see interesting stats such as player styles and correlation between game strategies and Victory Points. This is a MERN application that is deployed on my personal server and used by friends and family to track games.',
    technologies: ["React", "Express", "MongoDB", "Node"],
    links: [
      { label: 'Site', url: 'https://vithiru.ddns.net/' },
      { label: 'GitHub', url: 'https://github.com/Vithursan-Thiruvarooran/vithiru' }
    ],
  },
];

export const about_description1 = 
`
Hi, my name is Vithursan Thiruvarooran, and I enjoy solving complex problems—whether it’s a tough chess puzzle, an engaging board game, or tracking down an interesting bug. That curiosity led me to pursue a degree in Computer Science at the University of Toronto, where I specialized in Software Engineering. 
`;

export const about_description2 = 
`
Most recently, I’ve been working in Quality Engineering, where I design and implement scalable test automation solutions for UI, API, and performance testing. This includes building end-to-end frameworks with Playwright, developing API tests, running load tests, and integrating automation into CI/CD pipelines to improve reliability and efficiency.
`; 

export const about_description3 = 
`
Fun fact: I competed in the 2025 Canadian National Catan Championships and will be returning to compete in 2026.
`

export const linkedIn = "https://www.linkedin.com/in/vithursan-t-70b869133/";
export const gitHub = "https://github.com/Vithursan-Thiruvarooran/";