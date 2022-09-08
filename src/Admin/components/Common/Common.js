//import React, { Component } from 'react';
import moment from 'moment';
import { appConstants } from '../../_constants';

let funs = {};

funs.formatDate = (date1)=>{
  let iso_date = date1;

  // if(!date1.iso_date){
  //   iso_date = date1.iso_date;
  // }

  if(!iso_date){
    return moment().format(appConstants.dateFormat);
  }
  return moment(iso_date).format(appConstants.dateFormat);
}


export default funs;
