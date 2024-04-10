import Login from "./page/login"
import Home from "./page/home";
import Register from "./page/Register"
import JobDetail from "./page/jobDetailpage";
import AddJob from "./page/addJob"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/job-details/:id" element={<JobDetail/>}/>
        <Route path="/add-job" element={<AddJob/>}/>
        
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
