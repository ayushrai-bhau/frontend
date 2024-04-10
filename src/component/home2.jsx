import React, { useEffect, useState } from "react";
import Search from "../assets/search.png";
import Navbar from "./navbar";
import IMAGE1 from "../assets/image-1.png";
import GROUP from "../assets/Group.png";
import Rs from "../assets/Rs.png";
import Flag from "../assets/flag.png";
import { DEFAULT_SKILLS } from "../utils/constant";
import { getAllJobDetails } from "../apis/jobAPi";
import { useNavigate } from "react-router-dom";

const home2 = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const handleSkill = (event) => {
    const newArr = skills.filter((skill) => skill === event.target.value);
    if (!newArr.length) {
      setSkills([...skills, event.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };
  const fetchAllJobs = async () => {
    const filterSkills = skills.join(",");
    const response = await getAllJobDetails({ skills: filterSkills, title });
    setJobs(response.data);
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className=" h-[30vh] flex justify-center items-center ">
        <div className=" h-[80%] w-[60%] shadow-3xl flex items-center flex-col pt-6 ">
          <div className="w-[85%] h-[15%]  flex items-center border-2 pl-4 rounded-lg ">
            <img src={Search} className="h-5  mr-4" />
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              name="search"
              placeholder="Type any job title"
              className="w-[100%] h-[100%] outline-none"
            />
          </div>
          <div className="w-[85%] h-[50%] flex items-center gap-8 ">
            <div className="border-2 w-[18%]  h-[30%] flex justify-center rounded-lg">
              {" "}
              <select
                onChange={handleSkill}
                name="remote"
                className="outline-none cursor-pointer"
              >
                <option value="" disabled="disabled" selected>
                  Skills
                </option>
                {DEFAULT_SKILLS.map((skill) => (
                  <option key={skill} value={skill} className="cursor-pointer ">
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[55%] h-[100%] flex items-center ">
              {skills.map((skill) => {
                return (
                  <span
                    key={skill}
                    className="mr-4 bg-[#FFEEEE]   w-[16%] h-[22%]  flex items-center justify-center  "
                  >
                    {skill}
                    <span
                      onClick={() => removeSkill(skill)}
                      className="bg-red-700 w-[50%] h-[100%] flex items-center justify-center ml-4  cursor-pointer "
                    >
                      X
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="w-[50%] h-full flex flex-col  items-center  mt-12">
              <div className="h-full flex  justify-end items-center  w-[100%]">
                <button
                  onClick={fetchAllJobs}
                  className="bg-red-600 w-[40%] h-[32%] mr-6 rounded-xl text-white"
                >
                  Apply Filter
                </button>
                <button
                  onClick={() => {
                    setSkills([]);
                    setTitle("");
                  }}
                  // className={styles.edit}
                >
                  Clear
                </button>
              </div>

             { token? <button
                className="bg-red-600 w-[30%] h-[32%] text-white rounded-xl ml-[50%]"
                onClick={() => navigate("/add-job")}
              >
                add
              </button>:""}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 h-[57%] flex flex-col items-center gap-4 ">
        <div className="w-[60%] h-full overflow-scroll overflow-x-hidden">
          {jobs?.map((data) => (
            <div className="border-2 w-[100%]  h-[25%] flex   rounded-lg mb-8">
              <div className=" w-[15%] flex justify-center items-start pt-4 ">
                <img src={data.logoUrl} className="h-[60%] w-[40%]" />
              </div>
              <div className=" w-[40%] mr-28 text-[#9C9C9C] pt-4 ">
                <h1 className="pl-6 text-black font-bold text-[19px]">
                  {data.title}
                </h1>
                <div className="flex  text-[18px] mb-1 ">
                  <span className="flex  justify-center items-center ml-5 gap-1 ">
                    <img src={GROUP} />
                    11-50
                  </span>
                  <span className="flex  justify-center items-center  ml-6 gap-1">
                    <img src={Rs} /> {data.salary}
                  </span>
                  <span className="flex  justify-center items-center ml-8  gap-1 ">
                    <img src={Flag} /> {data.location}
                  </span>
                </div>
                <div className="ml-4  text-[17px]">
                  <span>Office</span> <span className="ml-8">Full time</span>
                </div>
              </div>
              <div className=" w-[40%] flex flex-col items-end p-6 ">
                <div>
                  {data?.skills?.map((skill) => {
                    return (
                      <span
                        className=" bg-[#FFEEEE]  text-black p-[0.6rem] rounded-[6px] mr-4 font-semibold text-[19px]  "
                        key={skill}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>

                <button
                  onClick={() => navigate(`/job-details/${data._id}`)}
                  className="bg-red-600 w-[30%] h-[32%] text-white rounded-xl mt-10"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default home2;
