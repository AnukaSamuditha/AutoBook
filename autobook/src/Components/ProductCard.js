import React from 'react';
import { motion } from 'framer-motion';
import '../Styles/ProductCard.css'; 

export default function ProductCard() {
    return (
        <motion.div 
            className='card--container'
            initial={{ opacity: 1, scale: 1, zIndex: 1 }} 
            whileHover={{ 
                scale: 1.05,
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
            <motion.div 
                className='section--image--holder'
            >
                <img 
                    src={require('../Images/car--banner.jpg')} 
                    alt='product--image' 
                    className='product--image'
                />
            </motion.div>
            <motion.div 
                className='card--info--holder'
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
            >
                <div className='info--sub--sec'>
                    <h6 className='product--title'>Porche Engine</h6>
                    <img 
                        src={require('../Images/cart2.svg').default} 
                        alt='cart--image' 
                        className='cart--image'
                    />
                </div>
                <p className='product--description'>
                    This is a Porche engine which is compatible with Porche 911 countryside edition.
                </p>
                <div className='brand--and--country--holder'>
                    <div className='brand--tag'><small>Toyota</small></div>
                    <div className='country--tag'><small>Engine</small></div>
                    <div className='country--tag'><small>Japan</small></div>
                </div>
                <hr className='breaker' />
                <div className='price--section'>
                    <h5 className='price--tag'>Rs.5000</h5>
                    <motion.button 
                        className='buy--button'
                        whileHover={{ scale: 1.01, backgroundColor: '#333' }} 
                        transition={{ duration: 0.2 }} 
                    >
                        Buy
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
