import React, { useEffect } from "react";
import Baseurl from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";
import { FaUserAlt, FaEnvelope, FaCommentDots, FaTimes } from "react-icons/fa";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnection = async () => {
        try {
            const res = await axios.get(Baseurl + "user/connections", {
                withCredentials: true,
            });
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    if (!connections) return null;
    if (connections.length === 0) 
        return <div className="text-center my-10 font-bold text-gray-600 text-xl">No Connections</div>;

    return (
        <div className="max-w-5xl mx-auto mt-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Connections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {connections.map((connection, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            {/* Profile Image */}
                            <img
                                src={connection.profilePic || "https://via.placeholder.com/80?text=No+Image"}
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-3"
                            />

                            {/* User Info */}
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FaUserAlt className="mr-2 text-blue-500" />
                                {connection.firstName} {connection.lastName}
                            </h2>
                            <p className="text-gray-600 text-sm flex items-center">
                                <FaEnvelope className="mr-2 text-red-500" />
                                {connection.email}
                            </p>

                            {/* Buttons */}
                            <div className="mt-4 flex space-x-3">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition">
                                    <FaCommentDots className="mr-2" />
                                    Message
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600 transition">
                                    <FaTimes className="mr-2" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;


// import React, { useEffect } from 'react';
// import Baseurl from './utils/constants';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { addConnections } from './utils/connectionSlice';
// const Connections = () => {
//     const dispatch = useDispatch();
//     const connections = useSelector((store) => store.connection);
//     const fetchConnection = async () => {
//         try {
//             const res = await axios.get(Baseurl + "user/connections", {
//                 withCredentials: true,
//             });
//             console.log(res.data.data);
//             dispatch(addConnections(res.data.data));
//             } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         fetchConnection();
//     },[]);

//     console.log(connections);

//     if (!connections) return null;
//     if (connections.length === 0) 
//         return <div className="text-center my-10 font-bold">No Connections</div>;

//     return (
//       <div>  {/* ✅ Wrapped JSX in a parent div */}
//           <h1 className="font-bold text-2xl">Connections</h1>
//           {connections.map((connection, index) => (
//               <div key={index}>{connection.firstName+" "+connection.lastName}</div> 
//           ))}
//       </div>
//   );
  
// };

// export default Connections;     
