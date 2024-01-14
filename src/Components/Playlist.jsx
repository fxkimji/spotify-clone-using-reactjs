import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Contants";
import { useStateProvider } from "../utils/StateProvider";
import './Playlist.css';

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      try{
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      }
      catch{
        console.log("wait for playlists")
      }
      // const response = await axios.get(
      //   "https://api.spotify.com/v1/me/playlists",
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(response)
      // const { items } = response.data;
      // const playlists = items.map(({ name, id }) => {
      //   return { name, id };
      // });
      // dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  //code for changing current playlist
  const changeCurrentPlaylist = (SelectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, SelectedPlaylistId });
  };

  return (
    <>
    <div className="Playlist">
    <span id="YourPlaylist">Your Playlists</span>
      <ul>
      {playlists.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
      </div>
     </>
    );
}
