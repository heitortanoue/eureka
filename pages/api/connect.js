import express from 'express';
import {mongoose} from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(express.static("public"));

mongoose.connect('mongodb+srv://eurekaadm:BLHT_eureka@eurekacluster.qv7ob.mongodb.net/eureka', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});
console.log("CONECTADO")
mongoose.Promise = global.Promise;

module.exports = mongoose;


