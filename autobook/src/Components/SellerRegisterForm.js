import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/sellerRegisterForm.css';
import {motion,AnimatePresence} from 'framer-motion';
import Axios from 'axios';

export default function SellerRegisterForm(props){

    const navigate=useNavigate();
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
    const [seller,setSeller]=useState(null);
    

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

            setOTPCode(res.data.otpCode);
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
        console.log(value);

        if(OTPCode!==value){
            setFieldErrors((prevData)=>{
                return {
                    ...prevData,
                    verificationCode:"OTP Code does not match!"
                }
                
            })
        }else{
            setFieldErrors((prevData)=>{
                return {
                    ...prevData,
                    verificationCode:""
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
    function fieldEmptyCheck(){
        const {username,password,rePassword,email,verificationCode}=registerData;
        var status=true;

        if(username===''){
            setFieldErrors((prevData)=>{
                return{
                    ...prevData,
                    username:"The username field cannot be empty!"
                }
            })
            status=false;
        }
        
        if(password===''){
            setFieldErrors((prevData)=>{
                return{
                    ...prevData,
                    password:"The password field cannot be empty!"
                }
            })
            status=false;
        }
        
        if(rePassword===''){
            setFieldErrors((prevData)=>{
                return{
                    ...prevData,
                    rePassword:"This field cannot be empty!"
                }
            })
            status=false;
        }
        
        if(email===''){
            setFieldErrors((prevData)=>{
                return{
                    ...prevData,
                    email:"The email field cannot be empty!"
                }
            })
            status=false;
        } 
        
        if(verificationCode===''){
            setFieldErrors((prevData)=>{
                return{
                    ...prevData,
                    verificationCode:"The verification code field cannot be empty!"
                }
            })
            status=false;
        }
        return status;
    }
 
    function handleSubmit(event){
        event.preventDefault();

        if(fieldEmptyCheck()){

            Axios.post('http://localhost:3001/create-seller-account',{
                sellerName:registerData.username,
                sellerPassword:registerData.password,
                sellerEmail:registerData.email,
                createdDate:new Date()
            }).then((res)=>{

                const sellerObject=res.data.data.seller;
                const sellerID=res.data.data.seller._id;
                console.log("Seller id is : ",sellerID)

                setSeller(sellerObject);
                localStorage.setItem("currentSeller",sellerID);
                console.log("Successfully created the seller account",res);
                navigate('/sellerdashboard');

            }).catch((err)=>{
                console.error("Error creating the seller account: ",err.message);
            })

            setRegisterData((prevData)=>{
                return{
                    username:"",
                    password:"",
                    rePassword:"",
                    email:"",
                    verificationCode:""
                }
            })
            
        }
    }
    
    return(
        <div className='form--holder'>
            <div className='form--content--holder'>
                <h4 className='register--title'>Join Our Network</h4>
                <form className='seller--register--form' autoComplete='off' onSubmit={handleSubmit}>

                    <label htmlFor='username' className='form--label'>User Name</label><br/>
                    <input type='text' name='username' className='input' placeholder='Provide a username' onChange={handleChange} value={registerData.username}/><br/>
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
                    <input type='password' name='password' className='input' placeholder='Enter a strong password' onChange={handleChange} onBlur={handlePasswordField} value={registerData.password}/><br/>
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
                    <input type='password' name='rePassword' className='input' placeholder='Enter Your Password Again' onChange={handleChange} onBlur={handlePasswordField} value={registerData.rePassword}/><br/>
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
                    }} value={registerData.email}/><br/>

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
                    <input type='text' name='verificationCode' className='input' placeholder='Enter verification code we sent you' onChange={handleChange} onBlur={handleOTPCode} value={registerData.verificationCode}/><br/>
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
                <AnimatePresence>
                    <motion.div
                    key="text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    className="animated-text">
                        
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    )
}