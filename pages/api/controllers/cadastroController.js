import express from 'express';
const usuario = require('../../../server/models/usuario');

const router = express.Router();

router.post('/cadastro', async(req, res) => {//Roter para cadastrar usuário
    try {
        const { email, senha, nome, username, faculdade, dataNasc } = await req.body
        let user = {}
        user.email = email
        user.senha = senha
        user.nome = nome
        user.username = username
        user.faculdade = faculdade
        user.dataNasc = dataNasc
        let userModel = new usuario(user)
        await userModel.save()
        res.json(userModel)
        //const user = await usuario.create(req.body);
        return res.send({user});
    } catch (err) {
        return res.status(400).send({error : 'Falha em cadastrar o usuário'});
    }
});

module.exports = app => app.use('/cadastro', router);

//Como importar isso em outras pages require('./controllers/cadastroController')(app);