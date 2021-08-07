import moment from 'moment';
import 'moment/locale/pt-br';

export default function timeFromPost (dataPost) {
    moment.locale('pt-br')
    return moment(dataPost).fromNow()
}