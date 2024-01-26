import React from 'react'
import "./navbar.scss"
import {Link} from "react-router-dom"
export const Navbar = () => {
  return (
    <header className='header container'>
        <div className="header-content">
        <img src="images/loop.svg" alt="Loop" />
        <div className='logo-wrapper'>
            <img src="images/rhombus.svg" alt="Rhombus" />
            <Link className='logo-link' to="">
            <h2 className='logo-title'>coral</h2>
            </Link>
            <img src="images/rhombus.svg" alt="Rhombus" />
        </div>
        <div className='user'>
        <div className='account'>
                <img src="images/person.svg" alt="Person"/> 
                <span>Account</span>
            </div>
            <div className='shoping'>
            <Link to="/shop" className='shoping-link'>
                <img src="images/bag.svg" alt="Shoping"/>
                Shoping</Link>
            </div>
        </div>
        </div>
        <div className='nav-content'>
            <nav className='nav'>
                <ul className='nav-menu'>
                    <li>
                     <Link to="/" className='nav-link'>Jewelry & Accessories</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Clothing & Shoes</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Home & Living</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Wedding & Party</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Toys & Entertainment</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Art & Collectibles</Link>
                    </li>
                    <li>
                    <Link to="/" className='nav-link'>Craft Supplies & Tools</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
