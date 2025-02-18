import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice';
const Login = () => {
    const [email,setEmail]=useState("devi@gmail.com");
    const [password,setPassword]=useState("Sri@123");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlelogin= async()=>
           {
          
               try
               {
               const res=await axios.post("http://localhost:3000/login",{email,password},{withCredentials:true});
               console.log(res.data);
               dispatch(addUser(res.data));
               return navigate("/");
               }
               catch(err){
                console.log(err);
               }
           }
    

  return (
    <div className='flex justify-center mt-24'>
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Email</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={password} onChange={(e)=>setPassword(e.target.value)}/>

</div>

    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handlelogin}>Submit</button>
    </div>
  </div>
  </div>
</div>
  )
}
export default Login;