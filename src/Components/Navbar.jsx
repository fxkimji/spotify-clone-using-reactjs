import React,{useEffect} from "react";
import { reducerCases } from "../utils/Contants";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import './Navbar.css';
import axios from 'axios';

export default function Navbar() {
  const [{token,userInfo},dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      try{
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          username: data.display_name,
          profile: data.images[1].url
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });  
      }
      catch{
        console.log('wait for me')
      }
      // const { data } = await axios.get("https://api.spotify.com/v1/me", {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //     "Content-Type": "application/json",
      //   },
      // });
      // const userInfo = {
      //   userId: data.id,
      //   username: data.display_name,
      //   profile: data.images[1].url
      // };
      // dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <div className="Navbar">
      <h2>Good Morning {userInfo?.username}!</h2>
      <div className="avatar">
        <img className="img" alt ="profile" src={userInfo?.profile}></img>
          <span id="name">{userInfo?.username}</span>
      </div>
    </div>
  );
}
