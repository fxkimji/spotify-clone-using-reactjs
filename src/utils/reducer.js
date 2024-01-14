import { reducerCases } from "./Contants.js";
export const initialState ={
    token:null,
    playlists:[],
    userInfo:null,
    SelectedPlaylistId:"37i9dQZF1DWXa2ShUct1Fm",
    SelectedPlaylist: null,
    currentlyPlaying : null,
    playerState:false,
    searchdata:[]
}

const reducer = (state, action)=>{
    switch(action.type){
        case reducerCases.SET_TOKEN:{
            return{
                ...state,
                token:action.token,
            }
        }

        case reducerCases.SET_USER:{
            return{
                ...state,
                userInfo:action.userInfo,
            }
        }

        case reducerCases.SET_PLAYLISTS: {
            return{
                ...state,
                playlists:action.playlists,
            };
        }

        case reducerCases.SET_PLAYLIST:{
            return{
                ...state,
                SelectedPlaylist:action.SelectedPlaylist
            }
        }
        case reducerCases.SET_PLAYING:{
            return{
                ...state,
                currentlyPlaying: action.currentlyPlaying
            }
        }
        case reducerCases.SET_PLAYER_STATE:{
            return{
                ...state,
                playerState:action.playerState
            }
        }
        case reducerCases.SET_PLAYLIST_ID:{
            return{
                ...state,
                SelectedPlaylistId:action.SelectedPlaylistId
            }
        }
        case reducerCases.SET_SEARCH_DATA:{
            return{
                ...state,
                searchdata:action.searchdata
            }
        }
        
        default:
            return state;
    }
};

export default reducer;
