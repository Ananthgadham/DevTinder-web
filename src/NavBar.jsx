import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
   const user=useSelector((store)=>store.user);
  return (
     <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">dev-tinder</a>
  </div>
  <div className="flex-none gap-2 mx-8">
   { user && <div className="dropdown dropdown-end flex px-5">
    <p>welcome {user.firstName}</p>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
       <div className="w-10 rounded-full ">
          <img src="data:image/jpeg;base64,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" />
        </div>
   

      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
}
  </div>
</div>

  )
}

export default NavBar