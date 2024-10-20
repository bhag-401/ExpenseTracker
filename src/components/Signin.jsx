import React from 'react'
import Style from "../style/Signin.module.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from './Firebase'
const Signin = () => {
  const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        await signInWithEmailAndPassword(auth,email,password);
        console.log("User logged in Successfully");
        toast.success("User logged in successfully",{position:"top-center"});
        alert("User logged successfully");
        
      } 
      catch(error){
        console.log(error.message);
        toast.success(error.message,{position:"bottom-center"});
        alert("invalid email or password");
      }
    }
  return (
    <div id={Style.signin}>
      <div id={Style.form} onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <br />
      <br />
      
      
      <input type="email" id={Style.input1} placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
     <br />
     <br />
     <input type="password" id={Style.input2} placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
      <br />
      <br />
      <button className='btn-primary' onClick={handleSubmit} ><Link to="/Profile" style={{textDecoration:'none',color:'grey'}}> Sign in</Link></button>
      <br />
      <br />
      <h3>New to ExpenseTracker?<Link to="/">Sign up </Link></h3>
      </div>
    </div>
  )
}

export default Signin
