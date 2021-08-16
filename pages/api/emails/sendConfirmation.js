const nodemailer = require('nodemailer');
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const user = 'eureka.contato@outlook.com';
const pass = process.env.SENHA_OUTLOOK

//Nodemailer
export default async (request, response) => {
    const {email_usuario} = request.body
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",  
        port: 587,
        tls: {
            ciphers:'SSLv3'
         },
        secureConnection: false,
        auth: {user: user, pass: pass}
    })
        
    const mailOptions = {
        from: user,
        to: email_usuario, //req.body,
        replyTo: user,
        subject:'Recuperação de senha da sua conta do Eureka',
        html:`<div style="display: flex; flex-direction: column; align-items: center" >
        <img src="">
        <h2 style="font-family: candara; text-align: center">Recupe sua senha</h2>
        <p style="font-family: candara; ">Você solicitou a recuperação de sua senha de acesso ao Eureka</p>
        <p style="font-family: candara;">Clique no botão a seguir, ou <a href="https://eurekabr.vercel.app/"> nesse link</a>, para cadastrar a nova senha</p>
        <a href="https://eurekabr.vercel.app/">
        <button style="font-family: Nunito; font-weight: 800; border-radius: 0.75rem; border-width: 2px;cursor: pointer; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 2rem; padding-right: 2rem;transition-property: all;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; color:white; background-color: #4361ee; border-color: #4361ee ">Recuperar senha</button></a>
    </div>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    
        console.log('Message sent: ' + info.response);
    });

    return response.status(200).json({result: "Email de recuperação de senha enviado com sucesso!" })


}