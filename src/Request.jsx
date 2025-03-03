import React, { use } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import BaseUrl from './utils/constants';
import axios from 'axios';
import { addRequest } from './utils/requestSlice';
import { useEffect } from 'react';
  const Request = () => {
  const requests=useSelector((store)=>store.request);
  const dispatch=useDispatch();
  const getRequests=async()=>{
    try{
      const res=await axios.get(BaseUrl+"user/request/received",{withCredentials:true});
      dispatch(addRequest(res.data.data));
      console.log(res.data.data);
    }
    catch(err){
    }
  }
    
    const handleAccept=async(status,id)=>{
      console.log(status,id);
      try{
        const res=await axios.post(BaseUrl+"request/review/"+status+"/"+id,{},{withCredentials:true});
      }
      catch(err){
      }
    }
   useEffect(()=>{
      getRequests();
    },[])

    if (!requests) return null;
    if (requests.length === 0) return <div className="text-center my-10 font-bold">No Requests</div>;
  

      return (
        <div className="p-5">
          <h1 className="font-bold text-2xl mb-4">Requests</h1>
          {requests.map((request, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md shadow-sm">
              <div>
                <span className="font-medium">{request?.fromUserId?.firstName || "Unknown"} {request?.fromUserId?.lastName || "User"}</span>
              </div>
              <div>
                <button
                  onClick={() => handleAccept("accepted",request._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject("rejected",request._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      );
}

export default Request