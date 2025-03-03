import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice';
import BaseUrl from './utils/constants';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [error,setError]=useState("")
    const [isLogin,setIsLogin]=useState(true);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlelogin= async()=>
           {
          
               try
               {
               const res=await axios.post(BaseUrl+"login",{email,password},{withCredentials:true});
               console.log(res.data);
               dispatch(addUser(res.data));
               return navigate("/");
               }
               catch(err){
                console.log(err.response.data);
                setError(err.response.data.error);
               }
           }
    
     const handlesignup=async()=>{
      try{
        const res=await axios.post(BaseUrl+"signup",{email,password,firstName,lastName},{withCredentials:true});
        console.log(res.data);
        dispatch(addUser(res.data.saveduser));
        return navigate("/profile");
      }
      catch(err){
        console.log(err.response.data);
      }
     }


  return (
    <div className='flex justify-center'>
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLogin?"Login":"Signup"}</h2>
    <div className="form-control w-full max-w-xs">
     {!isLogin && <>
    <label className="label">
    <span className="label-text">firstName</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
  <label className="label">
    <span className="label-text">lastName</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
  </>}
  <label className="label">
    <span className="label-text">Email</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={password} onChange={(e)=>setPassword(e.target.value)}/>

</div>
      <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLogin?handlelogin:handlesignup}>{isLogin?"Login":"Signup"}</button>
    </div>
    <p className='cursor-pointer m-auto' onClick={()=>setIsLogin((value)=>!value)}>{isLogin?"New User? Signup":"Existing user? Login"}</p>
  </div>
  </div>
</div>
  )
}
export default Login;