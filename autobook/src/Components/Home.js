import React from 'react';
import NavBar from './NavBar';
import ProductCard from './ProductCard';
import '../Styles/ProductCard.css';

export default function Home(){
    return (
        <div>
           <NavBar/>
           <ProductCard/>
        </div>
    )
}