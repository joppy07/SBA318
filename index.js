const express = require('express');
const app = express();
const Joi = require('joi');
const port = 8000;

//Middleware
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
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

//Update
app.put('/api/courses', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found');

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body, schema);

if (result.error){
    res.status(400).send(result.error);
}
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
}



//Delete
app.delete('/api/courses', (req, res) => {

    //Params for Delete and return error if course not found
    const course = courses.find(c => c.id === parseInt(req.params.id)) //access the id parameter
    if (!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    course.splice(index, 1);
    
    res.send(course);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found');
        res.send(course);
});

process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));