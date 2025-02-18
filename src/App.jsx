import { useState } from 'react';
import NavBar from './NavBar';
import Body from './Body';
import Login from './Login';
import { Provider } from 'react-redux';
import  appStore  from './utils/appStore';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Feed from './Feed';
function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
        <Route path='/' element={<Body/>}>
        <Route path='/' element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
