import  axios from "axios"

export const loginUser = async (email , password)=>{
    try{
      
        const reqUrl =`http://localhost:3000/api/v1/auth/login`;
        const response = await axios.post(reqUrl,{ email,password})
        
        return response.data
    }catch(error){
        console.log(error)

    }
}
export const registerUser = async ({email , password , name})=>{
    try{
        const reqUrl=`http://localhost:3000/api/v1/auth/register`
        const response = await axios.post(reqUrl,{email,password,name})
        return response.data

    }catch{
        console.log(error);
    }

}