import React,{useState} from 'react';
import { motion } from 'framer-motion';
import '../Styles/ProductCard.css'; 
import PaymentForm from './PaymentForm';

export default function ProductCard(props) {
    const[expand,setExpand]=useState(false)
    const[expandedCard,setExpandedCard]=useState("");
    const[paymentFormToggle,setPaymentFormToggle]=useState(false);

    function handleExpand(){
        setExpand((prevValue)=>!prevValue);
    }

    function handleExpandedCard(cardID){
        //setExpandedCard(expandedCard==cardID ? cardID : "");
        setExpandedCard(prevCardID => prevCardID === cardID ? "" : cardID);
    }
    function togglePaymentForm(){
        setPaymentFormToggle((prevValue)=>!prevValue);
    }
    
    return (
        <motion.div 
            className={`card--container ${expandedCard===props.cardID ? "expanded--card" : ""}`}
            initial={{ opacity: 1, scale: 1, zIndex: 1 }} 
            whileHover={{ 
                scale: 1.04,
                zIndex: 10, 
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)" 
            }} 
            transition={{ 
                duration: 1.2, 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
            }}
        >
            {paymentFormToggle && <PaymentForm
             productPrice={props.productPrice}
             togglePaymentForm={togglePaymentForm}
             isCODAvailable={props.isCODAvailable}
             isCreditCardAvailable={props.isCreditCardAvailable}
             isDebitCardAvailable={props.isDebitCardAvailable}
             isExpanded={expandedCard}
             cardID={props.cardID}
             shopID={props.shopID}
             productName={props.productName}
             productCategory={props.productCategory}
            />}
            <motion.div 
                className={`section--image--holder ${expandedCard===props.cardID ? "expanded--card" : ""}`}
            >
                <img 
                    src={`http://localhost:3001/Images/${props.productImage}`} 
                    alt='product--image' 
                    className='product--image'
                />
            </motion.div>
            <motion.div 
                className={`card--info--holder ${expandedCard===props.cardID ? "expanded--card" : ""}`}
               
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.4 }} 
            >{
                expandedCard===props.cardID && <div className='back--holder'>
                    <img src={require('../Images/back--button--left.svg').default} alt='back--button' onClick={()=>handleExpandedCard("")}/>
                </div>
            }
                <div className={`info--sub--sec ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                    <h6 className={`product--title ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                        {props.productName}</h6>
                    <img 
                        src={require('../Images/cart2.svg').default} 
                        alt='cart--image' 
                        className='cart--image'
                    />
                </div>
                <p className={`product--description ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                    {props.productDescription}
                </p>
                <div className='brand--and--country--holder'>
                    <div className={`brand--tag ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                        <small>{props.productBrand}</small></div>
                    <div className={`country--tag ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                        <small>{props.productCategory}</small></div>
                    <div className={`country--tag ${expandedCard===props.cardID ? "expanded--card" : ""}`}>
                        <small>{props.productCountry}</small></div>
                </div>
                <hr className='breaker' />
                <div className='price--section'>
                    
                    <h5 className='price--tag'>Rs.{props.productPrice} </h5>
                    <motion.button 
                        className={`buy--button ${expandedCard===props.cardID ? "expanded--card" : ""}`}
                        whileHover={{ scale: 1.01, backgroundColor: '#333' }} 
                        transition={{ duration: 0.2 }} 
                        onClick={expandedCard===props.cardID ? togglePaymentForm :()=>handleExpandedCard(props.cardID)}
                    >
                        Buy
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
