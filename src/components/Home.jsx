import React, { useState } from 'react'
import style from "../style/Home.module.css"
import { Link } from 'react-router-dom'
import { auth,db } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc,doc } from 'firebase/firestore';
import {toast} from "react-toastify"
const Home = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleRegister=async (e)=>{
      e.preventDefault();
      try{
       await createUserWithEmailAndPassword(auth,email,password);
       const user=auth.currentUser;
       localStorage.setItem('uid', user.uid);
       console.log(user);
       if(user){
       await  setDoc(doc(db,"Users",user.uid),{email:user.email});
       
       }
       console.log("user Register successfully");
       toast.success("User Registered successfully",{position:"top-center"});
      }
      catch(error){
        console.log(error.message);
        toast.success(error.message,{position:"bottom-center"});
      }
    }
  return (
    <div id={style.home}>
     
     <div id={style.form} onSubmit={handleRegister}>
    
     <h1>Join ExpenseTracker</h1>
     <br />
     <br />
     <input type="email" id={style.input1} placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
     <br />
     <br />
     <input type="password" id={style.input2} placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
     <br />
     <br />
     <button onClick={ handleRegister}><Link to="/Signin">Sign Up</Link></button>
     <br />
     <br />
     <h3>Already on ExpenceTracker?<Link to="/Signin">Sign in</Link></h3>
     </div>
       

   
    </div>
  )
}

export default Home
