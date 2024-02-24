import './App.css';
import { Navbar } from './components/navbar/Navbar.jsx';
import { Footer } from './components/footer/Footer.tsx';
import { createBrowserRouter, createHashRouter} from "react-router-dom"
import "./styles/global.scss"
import { Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home/Home.tsx';
import { Shop } from './pages/shop/Shop.tsx';
import { ProductDetails } from './components/productDetails/ProductDetails.jsx';
import { Cart } from './pages/cart/Cart.jsx';
import { ShoppingCartProvider } from './context/ShoppingCartContext.js';

function App() {
  const Layout = () => {
    return (
      <ShoppingCartProvider>
        <div className='main' id="main">
          <Navbar />
          <div className="outlet-container">
            <Outlet />
          </div>
          <Footer />
        </div>  
      </ShoppingCartProvider>
    );
  } 
  
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;

