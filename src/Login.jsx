import React ,{useEffect, useRef, useState}from "react";
import path1 from'./Spotifylogo.png';
import path from './loginintoo.png';
import {FaGoogle} from 'react-icons/fa';
import './index.css';

function Login(){

  const client_id = "30d278385c884270a7ce379371e99c48";
  const redirect_uri = "http://localhost:3000/callback";
  const api_uri = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read"
  ];
  // window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
  //   " "
  // )}&response_type=token&show_dialog=true`;
  
      const [formData, setFormData] = useState({
        email:'',
        password : ''
      })

      const [formErros, setFormErrors]= useState({
        email:'',
        password:''
      })

      const handleInput=(e)=>{
        const{name, value} = e.target;
        setFormData({...formData,[name]:value});
      }

      const validateForm=()=>{
        let errors = {};

        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          errors.email = 'Invalid email format';
        }
    
        if (formData.password.length < 6) {
          errors.password = 'Password must be at least 6 characters long';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };

      const handleSubmit=(e)=>{
        e.preventDefault();

        if(validateForm()){
          window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
            " "
          )}&response_type=token&show_dialog=true`;
        }
        else{
          alert("Form has errors");
        }
      };

      // const getUrl = async () => {
      //   const client_id = "30d278385c884270a7ce379371e99c48";
      //   const redirect_uri = "http://localhost:3000/callback";
      //   const api_uri = "https://accounts.spotify.com/authorize";
      //   const scope = [
      //     "user-read-private",
      //     "user-read-email",
      //     "user-modify-playback-state",
      //     "user-read-playback-state",
      //     "user-read-currently-playing",
      //     "user-read-recently-played",
      //     "user-top-read"
      //   ];
      //   window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      //     " "
      //   )}&response_type=token&show_dialog=true`;
      // };

    const ref = useRef(null);
    const handleClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    };
    return(
    <>
    <div className="Welcome">
    <img className="logo" src={path1} alt="Logo"></img>
    <button className="button" onClick={handleClick}>Login with Spotify</button>
    </div>

    <form onSubmit={handleSubmit}>

    <div ref ={ref} className="Logininto">
    <img class="loginlogo" alt="logo" src={path} />
    <div class="login">

    <b>Log in to Spotify</b><br/>
    <button type="button" class="google"><FaGoogle/>&nbsp;&nbsp;&nbsp; Continue with Google</button>
    <h2>OR</h2>

    <label>Email or Username<br/>
    <input type="text" placeholder="Email or Username" name="email" onChange={handleInput} value={formData.email}/><br/>
    {formErros.email && <span className="error">{formErros.email}</span>}
    </label><br/>

    <label>Password<br/>
    <input type="password"  placeholder="Password" name="password"
            value={formData.password}
            onChange={handleInput}/><br/>
    {formErros.password && (
            <span className="error">{formErros.password}</span>
          )}
    <br/>
    <a className='loginA' href=" ">Forgot password</a><br/><br/>
    </label>
    <button className="button" type="submit">Login</button>
    </div>
    </div>        
    </form>
    </>
    )
}
export default Login;