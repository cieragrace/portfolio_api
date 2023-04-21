const express = require('express');
const app = express();
const cors = require('cors')

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Cieras Portfolio';

app.get('/', (request, response) => {
  response.send('Oh Hey CiCi');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.use(express.json());
app.use(express.static('public'))
app.use(express.static('images'))
app.use(cors())

app.locals.projects = [
  {
    name: "Garden Grow",
    type: "Group Project",
    cardImg: "",
    img: "/images/garden_grow_img",
    wireframeImg: "/images/garden_grow_plan",
    summary: "Collaborated with FE and BE teams to create this app from scratch. Using a miro board we built out an MVP the entire team was on board with. We spent the first week planning and talking through exactly what data we need to be be bringing in. We built out our own data in order to display all the information desired. As a Whole we self taught and implemented GraphQl to this project, which helped to only grab the necessary data in our queries. Through the project we used GitHub Actions for CI/CD and did constant peer reviews on our code, before merging to main. While we were able to complete our MVP before the deadline we did have some items we would like to work on in future sprints. Working with the Back End team was very enlightening and educational.",
    userStory: "A user can input their zipcode and get vegetable gardening info based on their hardiness zone. A user can save vegetables to their 'garden' in order to access that information more efficiently than scrolling each visit.",
    technologies: ["JavaScript", "CSS/HTML", "GraphQL", "VS Code", "Git Version Control/GitHub", "Webpack node package", 
    "React", "Router", "Chrome or Browser of choice", "Terminal/Command Line", "Cypress", "Node.js"],
    deployedLink: "https://garden-grow-fe.vercel.app/",
    feRepoLink: "https://github.com/Garden-Grow-Turing/garden-grow-fe",
    beRepoLink: "https://github.com/Garden-Grow-Turing/garden-grow-be", 
    futureSprint1: "A calendar, so saved plants give user reminders to water, harvest etc based on plants data in that hardiness zone",
    futureSprint2: "Add more vegetables as well as berries and other fruits",
    futureSprint3: "Add a note section so user can leave notes for next years gardening adventure"
  }
]

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;

  response.json({ projects });
});

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  const project = app.locals.projects.find(project => project.id === id);
  if (!project) {
    return response.sendStatus(404);
  }

  response.status(200).json(project);
});