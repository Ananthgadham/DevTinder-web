import React,{ useEffect } from 'react'
import BaseUrl from './utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import UserCard from './UserCard';
import axios from 'axios';
  const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  const getfeed=async()=>{
  try{
    if(feed)
    {
      return;
    }
        const res=await axios.get(BaseUrl+"user/feed",{withCredentials:true});
        console.log(res.data);
        dispatch(addFeed(res.data));
  }
  catch(err){
    console.log(err);
  }
  }
  useEffect(()=>{
    getfeed();
  },[])

   if(!feed) return null;
   if(feed.length<=0) return <h1 className='flex justify-center my-10'>No User Found</h1>
  return feed && (
    <div className='m-10 flex'><UserCard user={feed[0]}/></div>
  )
}

export default Feed;