import React, { useState } from 'react'
import '../Styles/sellerRegisterForm.css';
import {motion} from 'framer-motion';
import Axios from 'axios';

export default function SellerRegisterForm(){

    const [registerData,setRegisterData]=useState({
        username:"",
        password:"",
        rePassword:"",
        email:"",
        verificationCode:""
        
    })

    const [fieldErrors,setFieldErrors]=useState({
        username:"",
        password:"",
        rePassword:"",
        email:"",
        verificationCode:""
    })

    const [OTPCode,setOTPCode]=useState("");

    function handleChange(event){
        const {name,value}=event.target;

        setRegisterData((prevData)=>{
            
            return {
                ...prevData,
                [name]:event.target.value
            }
        })
        
        if(name==='username'|| name==='email'){
            checkInputFields(name,value);
        }
        if(name==='password' && value.length >= 8 ){
            checkInputFields(name,value);
        }
        if(name=='rePassword' && value.length >=8 ){
            checkInputFields(name,value);
        }
    
    }
    function sendVerificationCode(emailAddress){

        Axios.post('http://localhost:3001/send-verification-email',{

            email:emailAddress

        }).then((res)=>{

            setOTPCode(res.otpCode);
            console.log("Email sent successfully",res.data);

        }).catch((err)=>{
            console.log("Error sending email",err.message);
        })

        

    }
    function handlePasswordField(event){
        const {name,value}=event.target;
        checkInputFields(name,value);
    }
    
    function handleOTPVerification(event){
        const { name, value} = event.target;

        if(name==='email'){
            sendVerificationCode(value);
        }
    }
    function handleOTPCode(event){
        const {value}=event.target;
        console.log(OTPCode);

        if(OTPCode!==value){
            setFieldErrors((prevData)=>{
                return {
                    ...prevData,
                    verificationCode:"OTP Code does not match!"
                }
                
            })
        }
    }
    
    function checkInputFields(fieldName,fieldValue){

        let error="";

        if(fieldName==='username'){

            const usernamePattern = /[^a-zA-Z0-9_]/;
            const firstLetterPattern = /^[a-zA-Z]/;

            if(fieldValue==''){
                error=''
            }

            else if(!firstLetterPattern.test(fieldValue)){

                error="*Username must start with a character!"
                
            }
            else if(usernamePattern.test(fieldValue)){
                error="*Cannot contain any special characters!"
                
            }
            
        }

        if(fieldName=='password'){
            const minPasswordLength=8;

            if(fieldValue==''){
                error=''
            }
            else if(fieldValue.length < minPasswordLength){

                error="*Minimum 8 characters required!";

            }
        }
        if(fieldName==='rePassword'){

            if(fieldValue==''){
                error=""
            }

            else if(fieldValue!=registerData.password){
                error="The password fields should match!";

            }
            else{
                error="";
            }
        }
        if(fieldName=='email'){
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(!emailPattern.test(fieldValue)){

                error="Invalid email address!"

            }
            else{
                error="";
            }

        }
        setFieldErrors((prevData)=>{
            return {
               ...prevData,
               [fieldName]:error
            }
           })


    }
    
    return(
        <div className='form--holder'>
            <div className='form--content--holder'>
                <h4 className='register--title'>Join Our Network</h4>
                <form className='seller--register--form' autoComplete='off'>

                    <label htmlFor='username' className='form--label'>User Name</label><br/>
                    <input type='text' name='username' className='input' placeholder='Provide a username' onChange={handleChange}/><br/>
                    {fieldErrors.username && <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="error-message"
                     >
                     {fieldErrors.username}
                    </motion.div>
                    }

                    <label htmlFor='password' className='form--label'>Password</label><br/>
                    <input type='password' name='password' className='input' placeholder='Enter a strong password' onChange={handleChange} onBlur={handlePasswordField}/><br/>
                    {fieldErrors.password && <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="error-message"
                     >
                     {fieldErrors.password}
                    </motion.div>
                    }

                    <label htmlFor='rePassword' className='form--label'>Re Enter Your Password</label><br/>
                    <input type='password' name='rePassword' className='input' placeholder='Enter Your Password Again' onChange={handleChange} onBlur={handlePasswordField}/><br/>
                    {fieldErrors.rePassword && <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="error-message"
                     >
                     {fieldErrors.rePassword}
                    </motion.div>
                    }

                    <label htmlFor='email' className='form--label'>Email Address</label><br/>
                    <input type='text' name='email' className='input' placeholder='Enter your email address' onChange={handleChange} onBlur={(event)=>{
                        handlePasswordField(event)
                        handleOTPVerification(event)
                    }}/><br/>
                    {fieldErrors.email && <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="error-message"
                     >
                     {fieldErrors.email}
                    </motion.div>
                    }

                    <label htmlFor='verificationCode' className='form--label'>Verification Code</label><br/>
                    <input type='text' name='verificationCode' className='input' placeholder='Enter verification code we sent you' onChange={handleChange} onBlur={handleOTPCode}/><br/>
                    {fieldErrors.verificationCode && <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="error-message"
                     >
                     {fieldErrors.verificationCode}
                    </motion.div>
                    }

                    <button id='register--submit--button'>Get Started</button>
                </form>
                <small className='sign--in--text'>Already have an account? <span id='span--register'>Login</span></small>

            </div>
            <div className='form--image--holder'>
                
            </div>

        </div>
    )
}