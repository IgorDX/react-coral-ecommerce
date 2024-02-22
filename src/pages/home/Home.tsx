import React from 'react'
import "./home.scss"
import {Link} from "react-router-dom"

export const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <div className='home-holder'>
                <div className="home-content">
                    <h1>Collections</h1>
                    <p>you can explore ans shop many differnt collection
                    from various barands here.</p>
                    <Link to="/shop" className='home-btn'><img src="images/shop-now.svg" alt="Bag" /> Shop Now
                    </Link>
                </div>
                <div className="woman-img">
                <img src="images/woman.jpg" alt="Woman" />
                </div>
            </div>
                <div className='brands'>
                    <img src="images/brands/brand1.png" alt="brand" />
                    <img src="images/brands/brand2.png" alt="brand" />
                    <img src="images/brands/brand3.png" alt="brand" />
                    <img src="images/brands/brand4.png" alt="brand" />
                    <img src="images/brands/brand5.png" alt="brand" />
                </div>
        <div className='centered-styles'>
            <div className="explore-grid">
            <img className='model1' src="images/models/model1.png" alt="model" />
            <img className='model2' src="images/models/model2.png" alt="model" />
            <img className='model3' src="images/models/model3.png" alt="model" />
            <img className='model4' src="images/models/model4.png" alt="model" />
            <img className='model5' src="images/models/model5.png" alt="model" />
            </div>
        </div>
        </div>
    </div>
  )
}
