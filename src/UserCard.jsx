import React from 'react';
import {removeUserFromFeed} from './utils/feedSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import BaseUrl from './utils/constants';
const UserCard = ({user}) => {
    const {_id,firstName,lastName}=user;

    const dispatch=useDispatch();
    
    const handleSendrequest=async (status,_id)=>{
      try{
      const res=await axios.post(BaseUrl+"request/send/"+status+"/"+_id,{},{withCredentials:true});
      dispatch(removeUserFromFeed(_id));
    }
  catch(err){
  }
    }

  return (
    <div>
        <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {firstName} {lastName}
    </h2>
    <p>{firstName}!!!wanna connect with me</p>
    <div className="card-actions justify-center m-4">
      <button className="btn btn-primary" onClick={()=>handleSendrequest("ignore",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendrequest("intrest",_id)}>Intrest</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;