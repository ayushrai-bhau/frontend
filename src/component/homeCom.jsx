import React, { useEffect, useState } from "react";
import Search from "../assets/search.png";
import DownArrow from "../assets/downArrow.png";
import IMAGE1 from "../assets/image-1.png";
import GROUP from "../assets/Group.png";
import Rs from "../assets/Rs.png";
import Flag from "../assets/flag.png";
import {DEFAULT_SKILLS} from "../utils/constant"
import {getAllJobDetails} from '../apis/jobAPi'
import { useNavigate } from "react-router-dom";


import styles from "./Home.module.css";
const homeCom = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("");
    const [token] = useState(localStorage.getItem("token"));

    const fetchAllJobs = async () => {
        const filterSkills = skills.join(",");
        const response = await getAllJobDetails({ skills: filterSkills, title });
        setJobs(response.data);
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/register");
    };

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
 

 
  

  return (
    <>
            <div className={styles.container}>
                {token ? <button onClick={handleLogout}>Logout</button> : ""}
                <div className={styles.containerTop}>
                    <input
                        className={styles.inputTop}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="search"
                        placeholder="Type any job title"
                    />
                </div>
                <div className={styles.containerBottom}>
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="remote"
                    >
                        <option value="">Skills</option>
                        {DEFAULT_SKILLS.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skills.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>
                                {skill}
                                <span
                                    onClick={() => removeSkill(skill)}
                                    className={styles.cross}
                                >
                                    X
                                </span>
                            </span>
                        );
                    })}
                    <button
                        onClick={() => {
                            setSkills([]);
                            setTitle("");
                        }}
                        className={styles.edit}
                    >
                        Clear
                    </button>
                    <button onClick={fetchAllJobs} className={styles.edit}>
                        Apply Filter
                    </button>
                    <button
                        onClick={() => navigate("/add-job")}
                        className={styles.edit}
                    >
                        Add Job
                    </button>
                </div>
            </div>
            {/* <div className={styles.bottom}> */}
            {jobs?.map((data) => {
                return (
                    <div key={data._id} className={styles.list}>
                        <div className={styles.listLeft}>
                            <div>
                                <img src={data.logoUrl} />
                            </div>
                            <div className={styles.infoLeft}>
                                <p className={styles.position}>
                                    {data.title}
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.greyText}>
                                        11-50
                                    </span>
                                    <span className={styles.greyText}>
                                        {data.salary}
                                    </span>
                                    <span className={styles.greyText}>
                                        {data.location}
                                    </span>
                                </p>
                                <p className={styles.extraInfo}>
                                    {/* <span className={styles.redText}>
                                        {data.remote}
                                    </span>
                                    <span className={styles.redText}>
                                        {data.jobType}
                                    </span> */}
                                    <button
                                        onClick={() =>
                                            navigate(`/job-details/${data._id}`)
                                        }
                                    >
                                        View Details
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                {data?.skills?.map((skill) => {
                                    return (
                                        <span
                                            className={styles.skill}
                                            key={skill}
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={styles.btnGroup}>
                                {/* <button
                                    onClick={() =>
                                        navigate("/addJob", {
                                            state: { id: data._id, edit: true },
                                        })
                                    }
                                    className={styles.edit}
                                >
                                    Edit job
                                </button> */}
                                <button
                                    onClick={() =>
                                            navigate(`/job-details/${data._id}`)
                                        }
                                    className={styles.view}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* </div> */}
        </>
    );
}

export default homeCom;
