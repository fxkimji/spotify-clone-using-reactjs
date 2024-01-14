import React from "react";
import './Playlist.css';
import Playlists from "./Playlist";
import path from '../loginintoo.png';
import {MdHomeFilled, MdSearch} from 'react-icons/md';
import {IoLibrary} from 'react-icons/io5';
import {Link,Outlet} from 'react-router-dom';
function Sidebar(){
    return(
        <>
        <div className="Sidebar">
        <img src={path} alt="logo"/>
        <div id="One">
            <ul className="SideMenu">
                {/* <li id="side"><MdHomeFilled/><span id="O">Home</span></li>
                <li id="side"><MdSearch/><span id="O">Search</span></li>
                <li id="side"><IoLibrary/><span id="O">Library</span></li> */}
              
                <li><MdHomeFilled/>Home</li>
                <Link to="/Search">
                <li><MdSearch/>Search</li>
                </Link>
                <Link to="/">
                <li><IoLibrary/>Library</li>
                </Link>
            </ul>
            </div>
            <div id="Two">
                <Playlists/>
            </div>
            
        </div>
        
        </>
    );
}
export default Sidebar;