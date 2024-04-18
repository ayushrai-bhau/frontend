import axios from "axios";
export const getJobDetailsById = async (jobId) => {

  try {
    const reqUrl = `${import.meta.env.VITE_HOST_LINK}/api/v1/job/detail/${jobId}`;
    const response = await axios.get(reqUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobDetails = async (filter) => {
  try {
    const reqUrl = `${import.meta.env.VITE_HOST_LINK}/api/v1/job/all-jobs?title=${filter?.title}&skills=${filter?.skills}`;
    const response = await axios.get(reqUrl);
    console.log(response.data);
    return response.data;
   
  } catch (error) {
    console.log(error);
  }
}

export const createJobDetails = async (payload) => {
  try {
    const reqUrl = `${import.meta.env.VITE_HOST_LINK}/api/v1/job/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   

    const response = await axios.post(reqUrl, payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJobDetails = async (jobId,updatedPayload) => {
    try {
      const reqUrl = `${import.meta.env.VITE_HOST_LINK}/api/v1/job/edit/${jobId}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
     
  
      const response = await axios.put(reqUrl, updatedPayload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };