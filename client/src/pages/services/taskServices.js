import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

export const getAllTasks= async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/alltasks`);
    console.log('API Response:', response)
    return response.data;
  } catch (error) {
    console.log('error')
    return error;
  }
};

export const getTaskByID = async (jobnumber) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/task/tasks/${jobnumber}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async(jobData)=>{
  try{
    const response = await axios.post(
      `${BACKEND_URL}/api/task/tasks`,
      jobData,
      {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return response.data;
  }catch(error){
    return error
  }
}

export const upDateTask = async (jobnumber, jobData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/task/updatetask/${jobnumber}`,
      jobData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export default {
  getAllTasks,createTask,upDateTask,getTaskByID,
}




