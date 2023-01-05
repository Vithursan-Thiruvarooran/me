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
Hi, my name is Vithursan Thiruvarooran and I love solving interesting puzzles. Whether it's an online Chess puzzle or investigating an interesting bug I enjoy the challenge. 
`;

export const about_description2 = 
`
Naturally, I studied Computer Science at the Unerversity of Toronto specializing in the Software Engineering stream and graduated in Nov 2022. While studying I’ve completed two great co-ops. 
The first co-op I did was as an application developer with the University of Toronto’s IIT department where I maintained and upgraded the CHASS Data Center.
My second co-op was also as an application developer with CIBC working on their main sales application. 
`; 