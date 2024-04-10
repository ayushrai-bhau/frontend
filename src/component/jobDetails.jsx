import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getJobDetailsById } from "../apis/jobAPi";

const jobDetails = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false)
  useEffect(() => {
    isAllowToEdit();
    fetchData();
  }, []);
  const fetchData = async () => {
    if (!id) return;
    const response = await getJobDetailsById(id);
    
    setJobDetails(response.data);
  };
  const isAllowToEdit = ()=>{
    const token = localStorage.getItem("token")
    if(token){
      setIsEditable(true)
    }
  }

  return (
    <div>
      {jobDetails ? (
        <div>
          {jobDetails.companyName}
          <br />
          {jobDetails.description}
          <br />
          {jobDetails.location}
          <br />
          {jobDetails.locationType}

          <br />
          ${jobDetails.salary}
          <br />
          {jobDetails.title}
          <br />
          {jobDetails?.skills?.map((skill) => {
            return (
              <p key={skill}>
                {skill}
              </p>
            );
          })}

          <div>
            <button onClick={()=>{navigate('/add-job', {state:{
              id:jobDetails._id,
              jobDetails:jobDetails,
              edit:true,
              
            }})}} >edit</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default jobDetails;
