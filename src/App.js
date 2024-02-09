import './App.css';
import { Navbar } from './components/navbar/Navbar.tsx';
import { Footer } from './components/footer/Footer.tsx';
import {createBrowserRouter, RouterProvider, Route, Link, Outlet} from "react-router-dom"
import "./styles/global.scss"

import React from 'react';
import { Home } from './pages/home/Home.tsx';
import { Shop } from './pages/shop/Shop.tsx';
import { ProductDetails } from './components/productDetails/ProductDetails.tsx';

function App() {

  const Layout = ()=>{
    return (
      <div className='main'>
       <Navbar></Navbar>
       <Outlet></Outlet>
        <Footer></Footer>
      </div>  
    )
  } 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [{
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/shop",
        element: <Shop></Shop>
      },
      {
        path: "/:id",
        element: <ProductDetails></ProductDetails>
      }
    ]}
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
