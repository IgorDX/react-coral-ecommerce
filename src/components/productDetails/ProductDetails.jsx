import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./productDetails.scss"
import { productData } from '../../data.ts'
import { ProductCard } from '../productCard/ProductCard.tsx';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ImageSlider } from '../imageSlider/ImageSlider.jsx';
import { Dropdown } from '../dropdown/Dropdown.jsx';
import  {Breadcrumbs} from '@mui/material';
import { Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useShoppingCart } from '../../context/ShoppingCartContext.js';

export const ProductDetails = () => {
    const breadcrumbs = [
        <Link to="/shop" key="1" color="inherit" >
          Shop
        </Link>,
        <Typography key="3" color="text.primary">
          Product
        </Typography>,
      ];
    
    const favoritedString = localStorage.getItem("favorited");
    const favorited = favoritedString ? JSON.parse(favoritedString) : [];
    const {increaseCartQuantity} = useShoppingCart()
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [selectedSize, setSelectedSize] = useState("Chose Size");
    useEffect(() => {
        const foundProduct = productData.find(product => product.id === Number(id));
        if (foundProduct) {
            setProduct(foundProduct);
        }
        setSelectedSize("Chose Size")
    }, [id]);

    const [accordionSelected, setAccordionSelected] = useState(null);

    const toggleAccordion = (i)=>{
        if(accordionSelected === i)
        return setAccordionSelected(null)

        setAccordionSelected(i);
    }
    const addToCart = ()=>{
        if(selectedSize === "Chose Size"){
            toast.info('Please select size!', {
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
                return;
        }
        const itemToCart = {selectedSize, id, quantity : 1, name: product.name, image: product.images[0], price : product.price}
        console.log(itemToCart)
        increaseCartQuantity(itemToCart)
        let storedCartItems = localStorage.getItem("cartItems");

        const previousCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        
        previousCartItems.push(itemToCart);
        
        localStorage.setItem("cartItems", JSON.stringify(previousCartItems));


        toast.success('Item added to cart!', {
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
    }
  return (
    <div className='container'>
              <div className="breadcrumbs">
                <Breadcrumbs
  separator={<NavigateNextIcon fontSize="small" />}
  aria-label="breadcrumb"
>
  {breadcrumbs}
</Breadcrumbs>
</div>
        <div className="product-details">
        <ImageSlider slides={product.images || []}></ImageSlider>
            <div className="right-side">
            <h1>{product.name}</h1>
            <p className='old-price'>{product.oldPrice} грн</p>
            <p className='price'>{product.price} грн</p>
            <Dropdown items={sizes} setSelected={setSelectedSize} selected={selectedSize}></Dropdown>
            <button onClick={addToCart}>Add to cart</button>
            <div className="description">
                <div className="accordion">
                    <div className="accordion-item" onClick={()=> toggleAccordion(0)}>
                        <div className="accordion-title">
                            <h3>Materials</h3>
                            <span>{accordionSelected === 0 ? "-" : "+"}</span>
                        </div>
                        <div className={accordionSelected === 0 ? "accordion-content show" : "accordion-content"}>
                        Основний матеріал	Шкіра/штучна шкіра
Матеріал підкладки	Текстиль
Підошва	Гума
                        </div>
                    </div>
                    <div className="accordion-item" onClick={()=> toggleAccordion(1)}>
                        <div className="accordion-title">
                           <h3>Details about product</h3>
                           <span>{accordionSelected === 1 ? "-" : "+"}</span>
                        </div>
                        <div className={accordionSelected === 1 ? "accordion-content show" : "accordion-content"}>
                        Усі зображення взяті з сайту https://megasport.ua/
                        </div>
                    </div>
                    <div className="accordion-item" onClick={()=> toggleAccordion(2)}>
                        <div className="accordion-title">
                           <h3>Details about brand</h3>
                           <span>{accordionSelected === 2 ? "-" : "+"}</span>
                        </div>
                        <div className={accordionSelected === 2 ? "accordion-content show" : "accordion-content"}>
                        Nike — легендарний американський бренд спортивного взуття, одягу та аксесуарів. Nike був заснований 1963 року Філом Найтом та Білом Бауерманом. Спочатку компанія займалася продажем технологічних японських кросівок Onitsuka Tiger, а 1972 року бренд представив власну інноваційну модель для бігу — The Cortez. Саме тоді американські спортсмени продемонстрували світу нові кросівки Nike на Олімпійських іграх. Згодом Nike Cortez стали культовим повсякденним взуттям серед молоді, зокрема завдяки появі у популярних фільмах та серіалах.
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <h2 className='other-products-title'>You may like:</h2>
        <div className="other-products">
            {productData.filter(el=> el.id !== id).map(el=>(
            <ProductCard key={el.id} isFavorited={favorited.includes(el.id)} {...el}></ProductCard>))}
        </div>
        <ToastContainer />
    </div>
  )
}
const sizes =[
    {
        size : "40"
    },
    {
        size : "41"
    }
]