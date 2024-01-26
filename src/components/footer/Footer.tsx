import React from 'react'
import "./footer.scss"
import {Link} from "react-router-dom"
export const Footer = () => {
  return (
    <footer className='footer'>
        <div className="container">
            <div className="footer-content">

            <div className="logo-text">
                <div className='logo-wrapper'>
                    <img src="images/rhombus.svg" alt="Rhombus" />
                    <Link className='logo-link' to="">
                    <h2 className='logo-title'>coral</h2>
                    </Link>
                    <img src="images/rhombus.svg" alt="Rhombus" />
                </div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua
                </p>
                <div className='soc'>
                    <img src="images/soc/facebook.svg" alt="facebook" />
                    <img src="images/soc/twitter.svg" alt="twitter" />
                    <img src="images/soc/linkedin.svg" alt="linkedin" />
                    <img src="images/soc/instagram.svg" alt="instagram" />
                </div>
            </div>
            <div className="catalog">
                <h3>CATALOG</h3>
                <ul>
                    <li>
                    <Link className='footer-link' to="/">Necklaces</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">hoodies</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Jewelry Box</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">T-Shirt</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">jacket</Link>
                    </li>
                </ul>
            </div>

            <div className="about-us">
                <h3>ABOUT US</h3>
                <ul>
                    <li>
                        <Link className='footer-link' to="/">Our Producers</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Sitemap</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">FAQ</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">About Us</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Terms & Conditions</Link>
                    </li>
                </ul>
            </div>

            <div className="customer-services">
                <h3>CUSTOMER SERVICES</h3>
                <ul>
                    <li>
                    <Link className='footer-link' to="/">Contact Us</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Track Your Order</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Product Care & Repair</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Book an Appointment</Link>
                    </li>
                    <li>
                    <Link className='footer-link' to="/">Shipping & Returns</Link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
  )
}
