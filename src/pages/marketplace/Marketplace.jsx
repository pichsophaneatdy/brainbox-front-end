import React, {useState, useEffect, useContext} from 'react';
import "./Marketplace.scss";
import { UserContext } from '../../App';
import workinprogress from "../../asset/icon/work-in-progress.png"
import axios from "axios";
import buy from "../../asset/icon/basket.png";
const Marketplace = () => {
    const User = useContext(UserContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {   
        axios.get(`${process.env.REACT_APP_BASE_URL}/product/${User?.degree}`)
            .then((response)=> {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }, [])
    return (
        <div className="marketplace">
            <div className="marketplace__hero">
                <h1 className="marketplace__title">Marketplace</h1>
                <button className="marketplace__btn">Sell a product</button>
            </div>
            {
                products.length > 0 && (
                    <div className="marketplace__content">
                        <p className="marketplace__text">Result {products.length} products</p>
                        <div className="marketplace__products">
                            {
                                products.map((product) => {
                                    return (<div className="marketplace__card">
                                                <div className="marketplace__img-wrapper">
                                                    <img src={product.image} alt={product.name} className="marketplace__img"/>
                                                </div>
                                                <div className="marketplace__detail">
                                                    <div className="marketplace__left">
                                                        <p className="marketplace__name">{product.name}</p>
                                                        <p className="marketplace__price">$ {product.price}</p>
                                                    </div>
                                                    <div className="marketplace__right">
                                                        <img src={buy} alt="buy" className="marketplace__icon"/>
                                                    </div>
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Marketplace