const nodemailer = require('nodemailer');
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const fs = require('fs')
const path = require("path");

const user = 'contato@eureka.app.br';
const pass = process.env.SENHA_ZOHO

//Nodemailer
const sendConfirmation = async (request, response) => {
    const {email_usuario, template, subject} = await request.body
    const htmlOutput = fs.readFileSync(path.resolve(__dirname, `../../../../../utils/emailTemplates/${template}.txt`), 
{encoding:'utf8'}).replace(/\r/g, "");
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",  
        port: 465,
        tls: {
            ciphers:'SSLv3'
         },
         from: user,
        secure: true,
        auth: {user: user, pass: pass}
    })

    const mailOptions = {
        from: user,
        to: email_usuario, //req.body,
        replyTo: user,
        subject: subject,
        html: htmlOutput,
        text:`Abra o html do email para ver seu conteúdo`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    
        console.log('Message sent: ' + info.response);
    });

    return response.status(200).json({result: "Email de enviado com sucesso!" })
}

export default sendConfirmation