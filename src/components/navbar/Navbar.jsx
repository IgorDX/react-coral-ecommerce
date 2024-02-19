import "./navbar.scss"
import {Link} from "react-router-dom"
import { useShoppingCart } from '../../context/ShoppingCartContext'
export const Navbar = () => {
    const storedCartItems = localStorage.getItem("cartItems");

    const {cartQuantity} = useShoppingCart()

  return (
    <header className='header container'>
        <div className="header-content">
            <div className='loop'>
        <img src="images/loop.svg" alt="Loop" />
        </div>
        <div className='logo-wrapper'>
            <img src="images/rhombus.svg" alt="Rhombus" />
            <Link className='logo-link' to="">
            <h2 className='logo-title'>coral</h2>
            </Link>
            <img src="images/rhombus.svg" alt="Rhombus" />
        </div>
        <div className='nav-options'>
        <div className='nav-cart'>
            <Link to="/cart" className='shopping-cart-link'>
                <img src="images/cart.svg" alt="Person"/> 
                {cartQuantity > 0 &&                 <div className='cart-items-holder'>
                <span className='cart-items-number'>{ cartQuantity}</span>
                </div>}

                <span>Cart</span>
                </Link>

            </div>
            <div className='nav-shopping'>
            <Link to="/shop" className='shopping-cart-link'>
                <img src="images/bag.svg" alt="Shoping"/>
                Shopping</Link>
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
