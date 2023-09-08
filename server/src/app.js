const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/connection');
const register = require('./models/registers');
const Register = require('./models/registers');

const app = express();
const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set('view engine', "hbs");  
app.set('views', templates_path);
hbs.registerPartials(partials_path);

app.get('/', (req,res) => {
    res.send('Welcome to my palace!');
}) 

app.get('/register', (req, res) => {
    res.render('index');
});

app.post('/register', async(req,res) => {
    try {
        const pswd = req.body.pswd;
        const conpswd = req.body.conpswd;
        if(pswd === conpswd) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                pswd: pswd,
                conpswd: conpswd
            })

            const register = await registerEmployee.save();
            res.status(201).render("success");
        } else {
            res.send('Password is not matching');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}...`));