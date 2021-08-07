import axios from "axios";

export default function getMoreQuestions (skip, nquest) {
    axios.post("/api/perguntas/getPerguntas", {
        skip: skip,
        num_perguntas: nquest
    })
    .then(function (response) {
        return response.data.perguntas
    })
    .catch(function (error) {
    })
}