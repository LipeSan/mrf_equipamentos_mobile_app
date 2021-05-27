
import Moment from 'moment';

const formateDate = (date:any) => {
    if(!date){
        return '00/00/0000';
    }
    let dateFormate = Moment(date).format("DD/MM/YYYY");
    return dateFormate;
}

export default {formateDate};