import moment from 'moment';
import { appConstants } from 'Front/_constants/app.constants.js';
//baseurl
export const baseUrl = (url) =>{

        return appConstants.paAppURL+url;

}
// get bmi of patient

export const getBMI = (height, weight) =>{

    let height_in_m = height/100;
    if(height_in_m>0 && weight>0){
        let bmi = weight/(height_in_m*height_in_m);
        return bmi.toFixed(2);
    }else{
        return;
    }    
}

// get ibw of patient
export const getIBW = (height, weight, gender) =>{ 
        
    let height_in_m = height/100;
    let idealWeight = (gender === 'Female') ? 21 : 23;
    if(height_in_m > 0 && weight > 0){

        let ibw = idealWeight*(height_in_m*height_in_m);

        return ibw.toFixed(2);
    }
    return;
}

// get maintain weight of patient
export const getMaintainWeight = (height, weight, gender) =>{
    let ibw = getIBW(height, weight, gender);
    let c1 = (ibw*30);
    return c1.toFixed(2);
}

// get loose weight of patient
export const getLooseWeight = (height, weight, gender) =>{
    let c1 = getMaintainWeight(height, weight, gender);
    let c2 = parseInt(c1,10)-500;
    return c2.toFixed(2);
}

// get gain weight of patient
export const getGainWeight = (height, weight, gender) =>{
    let c1 = getMaintainWeight(height, weight, gender);
    let c3 = parseInt(c1,10) + 500;
    return c3.toFixed(2);
}

// get calorie of patient
export const getCalorie = (height, weight, gender) =>{
    
    let bmi = getBMI(height, weight);
    let calorie = 0;
    if((bmi >= 19 && bmi <= 27)){
        calorie = getMaintainWeight(height, weight, gender);
    }else if(bmi > 27){
        calorie = getLooseWeight(height, weight, gender);
    }else if(bmi < 19){
        calorie = getGainWeight(height, weight, gender);
    }
    return calorie;
}

// get calorie type
export const getCalorieType = (height, weight, gender) =>{
    let bmi = getBMI(height, weight, gender);
    
    
    let res = {};

    if((bmi >= 19 && bmi <= 27)){
        res.type = "Maintain Weight";
        res.calorie = getMaintainWeight(height, weight, gender);
    }else if(bmi > 27){
        res.type = "Loose Weight";
        res.calorie = getLooseWeight(height, weight, gender);
    }else if(bmi < 19){
        res.type = "Gain Weight";
        res.calorie = getGainWeight(height, weight, gender);
    }

    return res;
}

// get age of patient by dob
export const getAgeByDob = (dob) =>{
    if(dob !== ''){   

        var new_dob = moment(dob, 'YYYY-MM-DD').subtract(1, 'days')           
        var now = moment(new Date()); //todays date
        var end = moment(new_dob); // another date
        var duration = moment.duration(now.diff(end));
        var years = duration.years();
        var months = duration.months();
        return years+(months>0?'.'+months:'');
       
    }else{
        return ''
    }
}



