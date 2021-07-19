import moment from "moment";

export default class UtilsService{
    public static convertStringToDate(format : string, date: string|Date) : string|Date
    {
        if(date instanceof Date){
            return moment(date).format(format);
        }else{
            const momentdate =  moment(date, format);
            return momentdate.toDate();
        }
        
    }
}