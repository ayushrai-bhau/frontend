import React, { useEffect, useState } from "react";
import { DEFAULT_SKILLS } from "../utils/constant";
import { createJobDetails,updateJobDetails } from "../apis/jobAPi";
import { useLocation } from "react-router-dom";
const addjobcom = () => {
  const {state} = useLocation()
  const [updateData]= useState(state?.jobDetails)
  console.log(updateData);
  const [formData, setFormData] = useState({
    companyName: "" || updateData?.companyName ,
    logoUrl: ""|| updateData?.logoUrl,
    title: "" || updateData?.title,
    salary: "" || updateData?.salary,
    jobType: ""|| updateData?.jobType,
    remote: ""|| updateData?.remote,
    location: ""|| updateData?.location,
    locationType: ""|| updateData?.locationType,
    description: ""|| updateData?.description,
    about: ""|| updateData?.about,
    duration : ""|| updateData?.duration,
    skills: updateData?.skills||[],
    information: ""|| updateData?.information,
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const addSkills = (event) => {
    let skill = event.target.value;
    const actualSkills = formData.skills;
    const filterSkills = actualSkills.filter((ele) => ele == skill);
    if (!filterSkills.length) {
      const updatedSkills = [...formData.skills, skill];
      setFormData({ ...formData, skills: updatedSkills });
    }
  };
  const removeSkills = (skill) => {
    const actualSkills = formData.skills;
    const filterSkills = actualSkills.filter((ele) => ele !== skill);

    setFormData({ ...formData, skills: filterSkills });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.title ||
      !formData.salary ||
      !formData.jobType ||
      !formData.location ||
      !formData.description ||
      !formData.about ||
      !formData.skills ||
      !formData.information ||
      !formData.locationType ||
      !formData.duration
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if(state?.edit){
      updateJobDetails(state?.id , formData)
      return
    }
    await createJobDetails({ ...formData });
  };

  return (
    <div>
      <h1>Add job description</h1>
      <div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label htmlFor="logoUrl">Logo URL:</label>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="Enter logo URL"
          />
        </div>

        <div>
          <label htmlFor="title">Position:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job position"
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter job duration"
          />
        </div>

        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter job salary"
          />
        </div>

        <div>
          <label htmlFor="jobType">Job Type:</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        
        <div >
                    <label  htmlFor="locationType">
                        Location Type:
                    </label>
                    <select

                        name="locationType"
                        value={formData.locationType}
                        onChange={handleChange}
                    >
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

        
                <div >
                    <label  htmlFor="location">
                        Location:
                    </label>
                    <input
                        
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter job location"
                    />
                </div>
        
                <div >
                    <label  htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter job description"
                    />
                </div>

        <div >
                    <label  htmlFor="about">
                        About:
                    </label>
                    <textarea
                        
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Enter company description"
                    />
                </div>
                <div >
                    <label  htmlFor="skills">
                        Information:
                    </label>
                    <input

                        type="text"
                        name="information"
                        value={formData.information}
                        onChange={handleChange}
                        placeholder="information"
                    />
                </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <select name="skills" onChange={addSkills}>
            <option disabled selected>
              Choose your Skills
            </option>
            {DEFAULT_SKILLS.map((item) => (
              <option>{item}</option>
            ))}
          </select>
        </div>
        <div>
          {formData.skills.map((item) => (
            <span>
              {item} &nbsp;{" "}
              <button onClick={() => removeSkills(item)}>X</button>
            </span>
          ))}
        </div>

        
      </div>
      <button onClick={handleSubmit}>{state?.edit?"edit-job":"add-job"}</button>
      <button>Cancel</button>
    </div>
  );
};

export default addjobcom;
