import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';

export const register = async (data)=>{
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/auth/register`, data
        );
        return response.data;
    }
    catch(error){
        return error
    }
}
export const login = async (data)=>{
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/auth/login`, data
        );
        console.log("11111", response.data);
        return response;
    }
    catch(error){
        return error
    }
}