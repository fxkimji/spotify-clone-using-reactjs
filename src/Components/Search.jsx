import axios from 'axios';
import React, { useState } from 'react'
import { useStateProvider } from '../utils/StateProvider';
import './Search.css'
import {FaSearch} from 'react-icons/fa'; 
import { reducerCases } from '../utils/Contants';

export default function Search() {
  const [{token, searchdata }, dispatch] = useStateProvider();
  const [searchInput, setSearchInput] = useState('');
  // const searchInput = 'BTS';
    const getSearchdata =  async()=>{
      // async function Search(){
        try{
          const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchInput}&type=track`,{
              headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
        console.log(response);
        const searchdata = {
          albumdetails : response.data.tracks.items.map(({album})=>({
            albumname : album.name,
            image : album.images[2].url,
            artists: album.artists.map((artist)=>artist.name),
        })),
      };

          console.log(searchdata)
          dispatch({ type: reducerCases.SET_SEARCH_DATA, searchdata});
        }
        catch{
          console.log("no search query provided")
        }
    };
    


  return (
    <div className='Cards'>
      <div className="searchbar">
      <FaSearch onClick={setSearchInput} style={{paddingLeft:'20px' }}  />
        <input className="NavInput" type="text" placeholder="Artists, songs, or podcasts" 
        onKeyPress={event=> {
          if(event.key==="Enter"){
            getSearchdata();
          }
        }}
        onChange={(e) => setSearchInput(e.target.value)}
        />
       
        </div>
        <div className='Display'>
          <div className='B' >
          {
            searchdata.albumdetails && (
              searchdata.albumdetails.map(
                (
                {
                  albumname,
                  image,
                  name
                },
                index
                )=>{
                  return(
                    <>
                    {/* <div className='box'>
                      <div className='imgs'>
                      <img src={image}/>
                      </div>
                    <div className='Abn'>
                    <h1>{albumname}</h1>
                    </div>
                    </div> */}
                    <div className="box">
                       <div className="imgs">
                                 <img src={image} className="image" />
                            </div>

                        <div className="mt-4 flex flex-col">
                        <p className="font-semibold text-lg text-white truncate">
                            {albumname}
                       </p>

                 </div>
               </div>
                    </>
                  );
                }
              )
            )
          }
        </div>
        </div>
    </div>
  )
}