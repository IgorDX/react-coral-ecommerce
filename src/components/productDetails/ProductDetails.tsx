import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "./productDetails.scss"
import { productData } from '../../data.ts'
import { ProductCard } from '../productCard/ProductCard.tsx';
import { ToastContainer } from 'react-toastify';
import { ImageSlider } from '../imageSlider/ImageSlider.jsx';
import { Dropdown } from '../dropdown/Dropdown.jsx';

export const ProductDetails = () => {
    const favoritedString = localStorage.getItem("favorited");
    const favorited = favoritedString ? JSON.parse(favoritedString) : [];
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("Chose Size");
    React.useEffect(()=>{

    }, [id])

    const [accordionSelected, setAccordionSelected] = useState(null);

    const toggleAccordion = (i)=>{
        if(accordionSelected === i)
        return setAccordionSelected(null)

        setAccordionSelected(i);
    }
  return (
    <div className='container'>
        <div className="product-details">
             <ImageSlider slides={images}></ImageSlider>
            <div className="right-side">
            <h1>Кросівки Jordan MAX AURA 5 160627</h1>
            <p className='old-price'>3 319</p>
            <p className='price'>4 799 грн</p>
            <Dropdown items={sizes} setSelected={setSelectedSize} selected={selectedSize}></Dropdown>
            <button>Add to cart</button>
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
                        Вид товару	Кросівки
Бренд	NIKE
Код виробника	CD6867-020
Колір	Зелений
Сезон	Осінь-Зима 2022
Країна	Індонезія
Застібка	Шнурки
Вид носка	Круглий
ID товару	CG295
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
            {productData.map(el=>(
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
const images = [
    {
       image : "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/655344f09cbbb-6389105.jpeg"
    },
    {
        image: "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/655344f0451b7-6389105.jpeg"
    },
    {
        image: "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/655344f140b9a-6389105.jpeg"
    }
]