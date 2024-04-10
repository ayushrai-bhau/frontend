import React, { useState } from "react";

import BackgroCom from "./backgroCom";

import { loginUser } from "../apis/authAPi";
import { useNavigate } from "react-router-dom";

const loginCom = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Fields can't be empty");
    }

    const response = await loginUser(formData.email, formData.password);
    console.log(response);
    if (response?.name) {
      localStorage.setItem("token",response?.token)
      navigate("/");
    }
  };

  return (
    <>
      <BackgroCom />

      <div className="flex w-6/12 h-screen flex-col pl-32 pt-60  ">
        <h2 className="  font-bold text-4xl ">Already have an account?</h2>
        <p className="text-xl mb-16">Your personal job finder is here</p>

        <div className="flex flex-col  ">
          <input
            value={formData.email}
            onChange={handleFormChange}
            type="email"
            name="email"
            placeholder="Email"
            className="border-solid border-2  w-2/4 h-12 pl-6 mb-6 "
          />

          <input
            value={formData.password}
            onChange={handleFormChange}
            type="password"
            name="password"
            placeholder="password"
            className="border-solid border-2  w-2/4 h-12 pl-6 mb-6 "
          />
          <div className=" mb-4">
            {" "}
            <button
              className="bg-[#ED5353] w-1/5 h-12 text-white "
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>

          <div>
            Don’t have an account?{" "}
            <span className="font-bold border-b-2 border-black cursor-pointer " onClick={()=>navigate("/register")}>
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginCom;
