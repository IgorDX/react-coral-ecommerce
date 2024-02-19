import React, { useState } from 'react'
import "./cart.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productData } from '../../data.ts'
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import { useShoppingCart } from '../../context/ShoppingCartContext.js';


export const Cart = () => {
  const {decreaseCartQuantity, clearCart} = useShoppingCart()
  const clearAll = ()=>{
    clearCart();
    localStorage.removeItem("cartItems");
    setCartItems([])
  }
  const storedCartItems = localStorage.getItem("cartItems");

const cartItemsArray = storedCartItems ? JSON.parse(storedCartItems) : [];


  const [cartItems, setCartItems] = useState(cartItemsArray);
  const deleteFromCart = (id, selectedSize)=>{
    decreaseCartQuantity();
    const indexToDelete = cartItems.findIndex((el) => el.id === id && selectedSize === el.selectedSize);

    if (indexToDelete !== -1) {
      const updatedCartItems = [
        ...cartItems.slice(0, indexToDelete),
        ...cartItems.slice(indexToDelete + 1)
      ];
    
      setCartItems(updatedCartItems);
    
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  }  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);  
  return (
    <div className='cart'>
      <div className="container">
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className='product-cell'>Product</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center" ><Button variant="outlined" color="error" onClick={clearAll}>
        Clear all
      </Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {cartItems.map((cartItem,index) => (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center" className='product-cell'>
        <div>
        <img className='product-cart-image' src={productData[0].img} alt="" />
        </div>
      </TableCell>
      <TableCell align="center">{productData[0].name}</TableCell>
      <TableCell align="center">{cartItem.selectedSize}</TableCell>
      <TableCell align="center">{productData[0].price} $</TableCell>
      <TableCell align="center" className='product-cell'>
        <div className='red-cross-holder'>
          <img src="images/redCross.svg"  onClick={()=> deleteFromCart(cartItem.id, cartItem.selectedSize)} alt="" />
        </div>
      </TableCell>
    </TableRow>
  ))}
  { cartItems.length > 0 &&  <TableRow>
    <TableCell align="center" className='product-cell'>
    <Link to="/shop">
      <button className='cart-btn continue-shopping-btn'>Continue shopping</button>
      </Link>
    </TableCell>
    <TableCell>
    </TableCell>
    <TableCell></TableCell>
    <TableCell align="center">{totalPrice}$</TableCell>
    <TableCell align="center">
    <Button variant="outlined"  className='product-cell'>Procced payment</Button>
    </TableCell>
  </TableRow>}
</TableBody>

      </Table>
    </TableContainer>
    </div>
    </div>
  )
}
