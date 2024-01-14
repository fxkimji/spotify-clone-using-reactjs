import { useEffect } from 'react';
import Login from './Login.jsx';
import { useStateProvider} from './utils/StateProvider.jsx';
import { reducerCases } from './utils/Contants.js';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Body from './Components/Body.jsx';
import Player from './Components/Player.jsx';
import Home from './Components/Home.jsx';
import Search from './Components/Search.jsx';


function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    console.log(token)
    document.title = "Player";
  }, [dispatch, token]);


  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:token ? (<Player />):(<Login/>),
        children:[{
          path:'/',
          element:<Body/>
        },
        {
          path:'/Search',
        element:<Search/>
        }],
        errorElement:<Player/>
      }
    ]
  )
  return (
  <>
  <RouterProvider router={router}/>
  </>
  )
}
export default App;