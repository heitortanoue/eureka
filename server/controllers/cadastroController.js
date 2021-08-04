import express from 'express';
const usuario = require('./models/usuario');

const router = express.Router();

router.post('/register', async(req, res) => {//Roter para cadastrar usuário
    try {
        const user = await usuario.create(req.body);
        return res.send({user});
    } catch (err) {
        return res.status(400).send({error : 'Falha em cadastrar o usuário'});
    }
});

module.exports = app => app.use('/cadastro', router);

//Como importar isso em outras pages require('./controllers/cadastroController')(app);