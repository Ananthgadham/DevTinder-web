import React, { useEffect } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from './utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice';
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=> {
    try
    {
    const res=await axios.get(BaseUrl+"profile/view",{
      withCredentials:true,
    });
    dispatch(addUser(res.data))
    }
    catch(err)
    { 
      if(err.status==401)
    {
         navigate("/login");  
    }
      console.log(err.message)
    }
  }
  useEffect(()=>{
       fetchUser()
  },[])
  return (
    <div>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </div>
  );
}

export default Body;