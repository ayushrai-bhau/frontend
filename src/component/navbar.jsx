import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const navbar = () => {
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Register");
};

  return (
    <div className="h-[13vh] text-white w-[100vw] bg-[#ED5353] rounded-b-[66px] flex justify-between p-11">
      <h1 className="text-3xl ">Jobfinder</h1>

      {token ? (
        <div className="flex w-[8%] " onClick={handleLogout}>
          <button className="border-2 w-[100%] h-[100% rounded-lg">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex w-[15%]  ">
          <button className="border-2 w-[100%] h-[100% rounded-lg"  onClick={()=>navigate('/login')}>
            Login
          </button>

          <button className="border-2 w-[100%] h-[100%] ml-7 rounded-lg" onClick={()=>navigate('/Register')}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default navbar;
