import axios from 'axios';
import {API_URL} from '../../env.json';

const uslBase = API_URL;

const getAllEquipments = () => {
    return axios.get(`${uslBase}/equipments`,).then((data) => {
        return data.data;
      }).catch(error => {
          console.log("ERROR", error);
          return error.response; 
      });
}

const createEquipment = (object:any) => {
    return axios.post(`${uslBase}/equipments`, object).then((data) => {
        return data.data;
      }).catch(error => {
          console.log("ERROR", error);
          return error.response; 
      });
}

const getEquipmentById = (id:string) => {
    return axios.get(`${uslBase}/equipments/${id}`).then((data) => {
        return data.data;
      }).catch(error => {
          console.log("ERROR", error);
          return error.response; 
      });
}

const editEquipment = (id:string, object:any) => {
    return axios.patch(`${uslBase}/equipments/${id}`, object).then((data) => {
        return data.data;
      }).catch(error => {
          console.log("ERROR", error);
          return error.response; 
      });
}

const updatePhoto = (id:string,object:any) => {
    return axios.post(`${uslBase}/equipments/upload/${id}`,object).then((data) => {
        return data.data;
    }).catch(error => {
        console.log("ERROR", error);
        return error.response; 
    })
}

export default {getAllEquipments, createEquipment, getEquipmentById, editEquipment, updatePhoto}