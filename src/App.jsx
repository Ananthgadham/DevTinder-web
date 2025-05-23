import { useState } from 'react';
import NavBar from './NavBar';
import Body from './Body';
import Login from './Login';
import { Provider } from 'react-redux';
import  appStore  from './utils/appStore';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Feed from './Feed';
import Connections from './Connections';
import Profile from './Profile';
import Request from './Request';
function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
        <Route path='/' element={<Body/>}>
        <Route path='/' element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/requests' element={<Request/>}/>
        <Route path='/connections' element={<Connections/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
