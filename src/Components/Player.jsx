import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Body from "./Body";
import './SpotifyPlayer.css';
import Search from "./Search";
import { Outlet } from "react-router-dom";
function Player(){
  return(
    <div className="MainPlayer">
        <div className="SpotifyBody">
            <Sidebar/>
            <div className="Mainbody">
                <Navbar/>
                <div className="bodyContents">
                    <Outlet/>
                </div>
            </div>
        </div>
        <footer>
            <div className="SpotifyFooter">
                 <Footer/>
            </div>
        </footer>
    </div>
    );
}



export default Player;