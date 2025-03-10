import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseUrl from './utils/constants';
import axios from 'axios';
import { addRequest, removeRequest } from './utils/requestSlice';

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const res = await axios.get(BaseUrl + "user/request/received", { withCredentials: true });
      dispatch(addRequest(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (status, id) => {
    try {
      const res = await axios.post(BaseUrl + "request/review/" + status + "/" + id, {}, { withCredentials: true });
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0) return <div className="text-center my-10 font-bold">No Requests</div>;

  return (
    <div className="p-5 max-w-screen-md mx-auto">
      <h1 className="font-bold text-2xl mb-6 text-center">Requests</h1>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
          >
            <div className="mb-2 md:mb-0">
              <span className="text-lg font-semibold text-gray-800">
                {request?.fromUserId?.firstName || "Unknown"} {request?.fromUserId?.lastName || "User"}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept("accepted", request._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Accept
              </button>
              <button
                onClick={() => handleAccept("rejected", request._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;


// import React, { use } from 'react'
// import { useDispatch,useSelector } from 'react-redux';
// import BaseUrl from './utils/constants';
// import axios from 'axios';
// import { addRequest, removeRequest } from './utils/requestSlice';
// import { useEffect } from 'react';
//   const Request = () => {
//   const requests=useSelector((store)=>store.request);
//   const dispatch=useDispatch();
//   const getRequests=async()=>{
//     try{
//       const res=await axios.get(BaseUrl+"user/request/received",{withCredentials:true});
//       dispatch(addRequest(res.data.data));
//       console.log(res.data.data);
//     }
//     catch(err){
//     }
//   }
    
//     const handleAccept=async(status,id)=>{
//       console.log(status,id);
//       try{
//         const res=await axios.post(BaseUrl+"request/review/"+status+"/"+id,{},{withCredentials:true});
//         dispatch(removeRequest(id));
//       }
//       catch(err){
//       }
//     }
//    useEffect(()=>{
//       getRequests();
//     },[])

//     if (!requests) return null;
//     if (requests.length === 0) return <div className="text-center my-10 font-bold">No Requests</div>;
  

//       return (
//         <div className="p-5">
//           <h1 className="font-bold text-2xl mb-4">Requests</h1>
//           {requests.map((request, index) => (
//             <div key={index} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md shadow-sm">
//               <div>
//                 <span className="font-medium">{request?.fromUserId?.firstName || "Unknown"} {request?.fromUserId?.lastName || "User"}</span>
//               </div>
//               <div>
//                 <button
//                   onClick={() => handleAccept("accepted",request._id)}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleAccept("rejected",request._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
// }

// export default Request