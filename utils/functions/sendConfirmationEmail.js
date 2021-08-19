import axios from "axios"

const sendConfirmationEmail = async (email_usuario) => {
    const hash = await axios.post("/api/emails/createHash", {email : email_usuario})
    .then(response => response)
    if (hash.status == 200) {
        const res = await axios.post("/api/emails/sendConfirmation", {email_usuario: email_usuario, hash: hash.data.hash})
        .then (response => response)
        if (res.status == 200) {
            return ({hash: hash.data.hash, status: 200})
        }
    } else {
        return ({result: hash.data.result, status: 400})
    }
}

export {sendConfirmationEmail}