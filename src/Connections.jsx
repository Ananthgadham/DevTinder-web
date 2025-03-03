import React, { useEffect } from 'react';
import Baseurl from './utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from './utils/connectionSlice';
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
    },[]);

    console.log(connections);

    if (!connections) return null;
    if (connections.length === 0) 
        return <div className="text-center my-10 font-bold">No Connections</div>;

    return (
      <div>  {/* ✅ Wrapped JSX in a parent div */}
          <h1 className="font-bold text-2xl">Connections</h1>
          {connections.map((connection, index) => (
              <div key={index}>{connection.firstName+" "+connection.lastName}</div> 
          ))}
      </div>
  );
  
};

export default Connections;     
