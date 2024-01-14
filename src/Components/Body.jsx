import React, {useEffect} from "react";
import {AiFillClockCircle} from "react-icons/ai";
import axios from "axios";
import { reducerCases } from "../utils/Contants.js";
import './Body.css';
import { useStateProvider } from "../utils/StateProvider.jsx";
function Body(){
    const [{ token, SelectedPlaylistId,SelectedPlaylist }, dispatch] = useStateProvider();
    useEffect(() => {
      const getInitialPlaylist = async () => {
        try{
          const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${SelectedPlaylistId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response)
          const SelectedPlaylist = {
            id: response.data.id,
            name :response.data.name ,
            description: response.data.description.startsWith("<a")?"":response.data.description,
            image :response.data.images[0].url,
            tracks: response.data.tracks.items.map(({track})=>({
                id : track.id,
                name: track.name,
                artists: track.artists.map((artist)=>artist.name),
                image: track.album.images[2].url,
                duration: track.duration_ms,
                album: track.album.name,
                context_uri: track.album.uri,
                track_number: track.track_number,
            })),
          }
         dispatch({type:reducerCases.SET_PLAYLIST,SelectedPlaylist})
        }
        catch{
          console.log('wait')
        }
        // const response = await axios.get(
        //     `https://api.spotify.com/v1/playlists/${SelectedPlaylistId}`,
        //     {
        //       headers: {
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );
        //   console.log(response)
        //   const SelectedPlaylist={
        //     id: response.data.id,
        //     name :response.data.name ,
        //     description: response.data.description.startsWith("<a")?"":response.data.description,
        //     image :response.data.images[0].url,
        //     tracks: response.data.tracks.items.map(({track})=>({
        //         id : track.id,
        //         name: track.name,
        //         artists: track.artists.map((artist)=>artist.name),
        //         image: track.album.images[2].url,
        //         duration: track.duration_ms,
        //         album: track.album.name,
        //         context_uri: track.album.uri,
        //         track_number: track.track_number,
        //     })),
        //   }
        //  dispatch({type:reducerCases.SET_PLAYLIST,SelectedPlaylist})
        };
        getInitialPlaylist();
      }, [token, dispatch, SelectedPlaylistId]);
    
      const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      };

      
      const playTrack = async(id,name,artists,image,context_uri,track_number)=>{
        const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",{
        context_uri,
        offset:{
          position : track_number-1,
        },
        position_ms:0,
      },{
        headers :{
          Authorization : "Bearer "+token,
          "Content-Type" :"application/json"
        }
      }
    );
    if(response.status == 204){
      const currentlyPlaying = {
        id,
        name,
        artists,
        image
      };
      dispatch({type : reducerCases.SET_PLAYING, currentlyPlaying});
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerStae:true});
    }
    else{
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerStae:true});
    }
  }

    return(
        <>
        <div className="PlayPlaylist">
        {SelectedPlaylist && (
          <>
            <div className="playlist">
              <div>
                <img className="Playlistimg" src={SelectedPlaylist.image} alt="selected playlist" />
              </div>
              <div className="details">
                <span className="type">PLAYLIST</span>
                <h1 className="title">{SelectedPlaylist.name}</h1>
                <p className="description">{SelectedPlaylist.description}</p>
              </div>
             </div>
            <div className="list">
              <div className="header-row">
                <div className="Hcol">
                  <span>#</span>
                </div>
                <div className="Hcol">
                  <span>TITLE</span>
                </div>
                <div className="Hcol">
                  <span>ALBUM</span>
                </div>
                <div className="Hcol">
                  <span>
                    <AiFillClockCircle />
                  </span>
                </div>
             </div>
              <div className="tracks">
                {SelectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    },
                    index
                  ) => {
                    return (
                      <div className="rowB" key={id} onClick={()=>playTrack(id,name,artists,image,context_uri,track_number)} >
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                          <div className="Trackimage">
                            <img className="trackimage" src={image} alt="track" />
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinutesAndSeconds(duration)}</span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
        </div>
      </>
    )
}
export default Body;