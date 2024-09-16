import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar(){
    return(
        <nav className='nav--bar'>
           <h4 className='logo'>AutoBook</h4>
           <div className='nav-items-container'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/marketplace' className='nav-item'>About</Link>
            <Link to='/sellerdashboard' className='nav-item'>Shop</Link>
            <Link to='/sellerRegister' className='nav-item'>Guides</Link>
            <Link to='/community' className='nav-item'>Community</Link>
           </div>
           <div className='profile--holder'>
            <img src={require('../Images/profilephoto4.png')} className='profile--icon' alt='profile--pic'/>
           </div>
        </nav>
    )
}