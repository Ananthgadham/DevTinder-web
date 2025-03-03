import React from 'react'
import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Baseurl from './utils/constants';
import { addUser } from './utils/userSlice';
const EditProfile = ({user}) => {
    const [firstName,setFirstName]=useState(user.firstName);
    const[lastName,setLastName]=useState(user.lastName);
    const [error,setError]=useState("");
    const[toast,setToast]=useState(false);
    const dispatch=useDispatch();
    const saveprofile=async()=>{
       try{
       const res=await axios.post(Baseurl+"profile/update",{firstName,lastName},{withCredentials:true})
       console.log(res);
       dispatch(addUser(res.data.user));
       setToast(true);
       setTimeout(()=>{
        setToast(false);
       },2000)
       }
       catch(err){
        setError(err.response.data);
       }
    }
  return (
    <>
    <div className='flex justify-center mt-8'>
    <div>
         <div className='flex justify-center mx-8'>
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Edit profie</h2>
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">firstName</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
  <label className="label">
    <span className="label-text">lastName</span>
  </label>
  <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

</div>
      <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveprofile}>Update</button>
    </div>
  </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName}}/>
    </div>
    {toast&&(<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Updated successfully.</span>
  </div>
</div>)}
    </>
  )
}

export default EditProfile;