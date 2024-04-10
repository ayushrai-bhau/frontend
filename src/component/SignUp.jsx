import React, {  useState } from "react";
import BackgroCom from "./backgroCom";
import { registerUser } from "../apis/authAPi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      alert("Fields can't be empty");
    }

    const response = await registerUser({...formData});
    if (response.name) {
      navigate("/");
    }
  };
 

  return (
    <>
      <BackgroCom />

      <div className="flex w-6/12 h-screen flex-col pl-32 pt-60  ">
        <h2 className="  font-bold text-4xl ">Create an account</h2>
        <p className="text-xl mb-16">Your personal job finder is here</p>

        <div className="flex flex-col  ">
          <input
            type={"text"}
            value={formData.name}
            onChange={handleFormChange}
            name="name"
            placeholder="Name"
            className="border-solid border-2  w-2/4 h-12 pl-6 mb-6 "
          />
          <input
            type={"email"}
            value={formData.email}
            onChange={handleFormChange}
            name="email"
            placeholder="Email"
            className="border-solid border-2  w-2/4 h-12 pl-6 mb-6 "
          />

          <input
            type={"password"}
            value={formData.password}
            onChange={handleFormChange}
            name="password"
            placeholder="Password"
            className="border-solid border-2  w-2/4 h-12 pl-6 mb-6 "
          />
          <div className=" mb-4">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />{" "}
           
            &nbsp; By creating an account, I agree to our terms of use and
            privacy policy
          </div>
          <div className=" mb-4">
            {" "}
            <button
              className="bg-[#ED5353] w-1/5 h-12 text-white "
              onClick={handleSubmit}
            >
             
              Create Account
            </button>
          </div>

          <div>
            Don’t have an account?{" "}
            <span
              className="font-bold border-b-2 border-black cursor-pointer"
              onClick={() => {
                navigate("/login")
              }}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
