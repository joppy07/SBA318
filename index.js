const express = require('express');
const app = express();
const Joi = require('joi');
const port = 8000;

//Middleware
app.use(express.json());

const courses = [
    {id: 1, name: 'course1', decs: 'desc1'},
    {id: 2, name: 'course2', decs: 'desc2'},
    {id: 3, name: 'course3', decs: 'desc3'},
];

app.get('/', (req, res) => {
    res.send('SBA 318');
});

app.get('/api/courses', (req, res) => {
    res.send([courses]);
});

//Post Request
app.post('/api/courses', (req, res) => {

    //Input validation
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    
    if (result.error){
        res.status(400).send(result.error);
    }
    
        const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('Course not found');
        res.send(course);
});

process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));