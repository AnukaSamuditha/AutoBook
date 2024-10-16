import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar(){
    return(
        <nav className='nav--bar'>
           <h4 className='logo'>AutoBook</h4>
           <div className='nav-items-container'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/' className='nav-item'>About</Link>
            <Link to='/marketplace' className='nav-item'>Shop</Link>
            <Link to='/' className='nav-item'>Guides</Link>
            <Link to='/' className='nav-item'>Community</Link>
           </div>
           <div className='profile--holder'>
            <Link to='/sellerdashboard'><img src={require('../Images/profilephoto4.png')} className='profile--icon' alt='profile--pic'/></Link>
           </div>
        </nav>
    )
}