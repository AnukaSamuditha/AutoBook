const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { error, info } = require('console');


function GenerateOTP(){
    return crypto.randomInt(100000,999999).toString();
}

function sendVerificationCode(email){

    const transporter=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:"anukasamuditha@gmail.com",
            pass:"yznwdsggrscdrorr"
    
        }
    });

    const OTPCode=GenerateOTP();

    const mailOptions={
        from:"anukasamuditha@gmail.com",
        to:email,
        subject:"Your Verification Code",
        text:`Your OTP code is ${OTPCode}. It will be discarded after 5 minutes`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("Error sending email"+error.message);
        }else{
            console.log("Email sent."+info.response);
        }
    })

    return OTPCode;

}

module.exports={sendVerificationCode};