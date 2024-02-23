import React from 'react'
import "./shop.scss"
import { ProductCard } from '../../components/productCard/ProductCard.jsx'
import { productData } from '../../data.ts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Shop = () => {

    const favoritedString = localStorage.getItem("favorited");
    const favorited = favoritedString ? JSON.parse(favoritedString) : [];
  return (
    <div className='shop-wrapper'>
        <div className="container">
          <div className="products">
          <h1>Products:</h1>
            <div className="product-cards">
                {productData.map(el=>(
            <ProductCard key={el.id} isFavorited={favorited.includes(el.id)} {...el}></ProductCard>))}
            </div>
            <ToastContainer />
        </div>
        </div>
    </div>
  )
}
