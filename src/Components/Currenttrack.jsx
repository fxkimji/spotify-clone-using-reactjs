import React,{useEffect} from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Contants";
import './Footer.css'
function Currenttrack() {
  const [{token, currentlyPlaying}, dispatch] = useStateProvider();
  // console.log(token);
  useEffect(()=>{
    console.log(token)
    const getcurrenttrack =  async()=>{
      try{
        const currenttrack = await axios.get(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers:{
              Authorization :"Bearer "+token,
              "Content-Type":"application/json"
            }
          }
        );
        console.log(currenttrack);
        if (currenttrack.data !== "") {
          const currentlyPlaying = {
            id: currenttrack.data.item.id,
            name: currenttrack.data.item.name,
            artists: currenttrack.data.item.artists.map((artist) => artist.name),
            image: currenttrack.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
        }
      }

      catch{
        console.log("wait for currentplaying")
      }
      // const currenttrack = await axios.get(
      //   'https://api.spotify.com/v1/me/player/currently-playing',
      //   {
      //     headers:{
      //       Authorization :"Bearer "+token,
      //       "Content-Type":"application/json"
      //     }
      //   }
      // );
      // console.log(currenttrack);
      // if (currenttrack.data !== "") {
      //   const currentlyPlaying = {
      //     id: currenttrack.data.item.id,
      //     name: currenttrack.data.item.name,
      //     artists: currenttrack.data.item.artists.map((artist) => artist.name),
      //     image: currenttrack.data.item.album.images[2].url,
      //   };
      //   dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      // } else {
      //   dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      // }
    };
    getcurrenttrack();
  },[token,dispatch]);

  return(
    <div className="MainStuffs">
      {currentlyPlaying && (
        <div className="track">
          <div className="image">
            <img class="imgcur" src={currentlyPlaying.image} alt="currentPlaying" />
          </div>
          <div className="Playerinfo">
            <h4 className="trackname">{currentlyPlaying.name}</h4>
            <h6 className="trackartists">
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default Currenttrack;