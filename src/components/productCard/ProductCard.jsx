import React, { useEffect, useState } from 'react'
import "./productCard.scss"
import { Bounce, toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom';


export const ProductCard = (props) => {
  const [isFavorited, setIsFavorited] = useState(props.isFavorited);


  const addToFavorite = () => {
    setIsFavorited((prevIsFavorited) => {
      const favoritedString = localStorage.getItem('favorited');
      const favorited = favoritedString ? JSON.parse(favoritedString) : [];
      if (prevIsFavorited) {
        const updatedFavorited = favorited.filter((id) => id !== props.id);
        toast.info('Item removed from favorite!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        localStorage.setItem('favorited', JSON.stringify(updatedFavorited));
      } else {
        toast.success('Item added to favorite!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        const updatedFavorited = [...favorited, props.id];
        localStorage.setItem('favorited', JSON.stringify(updatedFavorited));
      }
      return !prevIsFavorited; 
    });
  };


  return (
    <div className='product-card'>
        <div className="like">
        <img onClick={addToFavorite} height={32} width={32} src={ isFavorited  ? "images/heart-like.svg" : "images/heart-unlike.svg"} alt="Like" />
        </div>
        <Link to={`/${props.id}`} >
        <img className='product-image' src={props.images[0]} alt="Product iamge" />
        <h3>{props.name}</h3>
        <div className='bottom-card'>
            <p>{props.category}</p>
            <p>${props.price}</p>
        </div>
        </Link>
    </div>
  )
}
