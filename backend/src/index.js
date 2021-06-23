const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors({}));
app.use(express.json()); //para poder usar o body

/** 
 * Métodos HTTP 
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação do back-end
 * PUT/PATCH: Alterar uma unformação no back-end
 * DELETE: Deletar uma informaç~cao no back-end
*/

/**
 * request -> preencher as variavéis
 * response -> é obter a reposta das variaveis
 */

/**
 * Tipo de parâmetros:
 * 
 * Query params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * Middleware:
 * 
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
 */

const projects = [];

function logRequests(request, response, next) {
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel); //ou log

    next();// próximo middleware | remove o return se colocar  console.time

    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
    const {id} = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({error: 'Invalid project ID.'});
    }

    return next();
}
 
app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    //const query = request.query;

    //console.log(query);

    // const {title, owner} = request.query;
    
    // console.log(title);
    // console.log(owner);

    const {title} = request.query;

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.json(results); //ou projects
});

app.post('/projects', (request, response) => {

    // const body = request.body;

    // console.log(body);

    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    // console.log(title);
    // console.log(owner);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {

    const { id } = request.params;
    const {title, owner} = request.body;

    // console.log(id);

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found.'})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {

    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error : 'Project not found.'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log(' 🖥 Back-end started')
})