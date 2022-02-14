import Back from '../../assets/basket/back.png'
import Plus from '../../assets/basket/plus.png'
import Minus from '../../assets/basket/minus.png'
import Delete from '../../assets/basket/delete.png'
import './basket.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { get_basket_user, get_recomendation, product_add_basket, product_delete_basket, product_minus_basket, product_plus_basket } from '../../actions/user'
import { useNavigate } from 'react-router-dom'


function Basket() {
    const [Basket, SetBasket] = useState([]);

    const recommendations_list = useSelector(state => state.user.recommendations)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_recomendation());
        dispatch(get_basket_user());
        storageChanged();
        document.addEventListener(`storageChanged_basket`, function () { storageChanged() }, false);
    }, [])


    const navigate = useNavigate();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const storageChanged = () => {
        SetBasket(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []);
    }

    const storage_basket_add = (e) => {
        localStorage.setItem('basket', JSON.stringify(e))
        document.dispatchEvent(new Event(`storageChanged_basket`));
    }

    const basket_add = (element) => {
        console.log(element)
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id) !== undefined) {
                return
            }
        }
        let arr = [];
        if (localStorage.getItem('basket')) {
            arr = JSON.parse(localStorage.getItem('basket'));
        }
        arr.push({ product_id: element.product_id, basket: 1, description: element.description, image: element.image, name: element.name, price: element.price })
        storage_basket_add(arr)
        document.dispatchEvent(new Event(`storageChanged_basket_nav`));
        if (isAuth) {
            dispatch(product_add_basket(element.product_id))
        }
    }

    const basket_plus = (element) => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id) !== undefined) {
                let arr = JSON.parse(localStorage.getItem('basket'));
                arr[JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id == element.product_id)] = { product_id: element.product_id, basket: JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id).basket + 1, description: element.description, image: element.image, name: element.name, price: element.price }
                storage_basket_add(arr)
                if (isAuth) {
                    dispatch(product_plus_basket(element.product_id))
                }
            }
        }
    }

    const basket_minus = (element) => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id) !== undefined) {
                let arr = JSON.parse(localStorage.getItem('basket'));
                if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id).basket === 1) {
                    arr.splice(JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id == element.product_id), 1)
                    storage_basket_add(arr)
                    document.dispatchEvent(new Event(`storageChanged_basket_nav`));
                    if (isAuth) {
                        dispatch(product_delete_basket(element.product_id))
                    }
                    return
                }
                arr[JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id == element.product_id)] = { product_id: element.product_id, basket: JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id).basket - 1, description: element.description, image: element.image, name: element.name, price: element.price }
                storage_basket_add(arr)
                if (isAuth) {
                    dispatch(product_minus_basket(element.product_id))
                }
            }
        }
    }

    const basket_delete = (element) => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id == element.product_id) !== undefined) {
                let arr = JSON.parse(localStorage.getItem('basket'));
                arr.splice(JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id == element.product_id), 1)
                storage_basket_add(arr)
                document.dispatchEvent(new Event(`storageChanged_basket_nav`));
                if (isAuth) {
                    dispatch(product_delete_basket(element.product_id))
                }
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="container_basket">
            <div className='basket_back_title'>
                <div className="basket_button_back" onClick={() => navigate('/')}>
                    <img src={Back} alt="Back" className="basket_button_back_img" />
                    <p className="button_back">к выбору блюда</p>
                </div>
                <div className="basket_count_title">
                    <div className="basket_title">КОРЗИНА</div>
                    <p className="basket_counter">(в корзине {localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')).length : 0} товара)</p>
                </div>
            </div>
            <div className="basket_map">
                {
                    Basket.map((element) => (
                        <div className="basket_list">
                            <div className="basket_img_description">
                                <img src={element.image} alt={element.name} className="basket_img" /*onClick={()=>handle(element.product_id)}*/ />
                                <div className="basket_title_description">
                                    <p className="basket_list_title">{element.name}</p>
                                    <p className="basket_list_description">{element.description}</p>
                                </div>
                            </div>
                            <div className='basket_count_flex_column'>
                                <p className="basket_list_title_2">{element.name}</p>
                                <div className="basket_count_flex">
                                    <div className="basket_count_product">
                                        <div className="basket_count_product_div_img">
                                            <img src={Minus} alt="Minus" className="basket_count_product_img" onClick={() => basket_minus(element)} />
                                        </div>
                                        <p className="count_product">{element.basket}</p>
                                        <div className="basket_count_product_div_img">
                                            <img src={Plus} alt="Plus" className="basket_count_product_img" onClick={() => basket_plus(element)} />
                                        </div>
                                    </div>
                                    <p className="basket_price">{element.price} ₽</p>
                                    <div className="basket_count_product_div_img">
                                        <img src={Delete} alt="Delete" className="basket_count_product_img" onClick={() => basket_delete(element)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="add_to_order_block">
                <div className="add_to_order_title">ДОБАВИТЬ К ЗАКАЗУ</div>
                <div className="add_to_order_menu">
                    {
                        recommendations_list.map((element, index) => (
                            <div className={index !== 0 ? "add_to_order_product add_to_order_product_border" : "add_to_order_product"}>
                                <img src={element.image} alt={element.name} className="add_to_order_img" />
                                <div className="add_to_order_product_title">{element.name}</div>
                                <div className="basket_count_product" onClick={() => basket_add(element)}>
                                    <p className="add_to_order_product_add">Добавить</p>
                                    <div className="basket_count_product_div_img">
                                        <img src={Plus} alt="Plus" className="basket_count_product_img" />
                                    </div>
                                </div>
                                <div className="add_to_order_product_price">{element.price} ₽</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="basket_basket_price_block">
                <div className="basket_basket_price_desc">
                    <div className="basket_basket_price">
                        <p className="basket_basket_price_text">Итого:&nbsp;</p>
                        <p className="basket_basket_price_value">{Basket.map((el) => el.basket * el.price).reduce((a, b) => a + b, 0)} ₽</p>
                    </div>
                    {2000 - Basket.map((el) => el.basket * el.price).reduce((a, b) => a + b, 0) > 0 ?
                        <div className="basket_basket_price">
                            <p className="basket_basket_delivery_text">До бесплатной доставки не хватет:&nbsp;</p>
                            <p className="basket_basket_delivery_value">{2000 - Basket.map((el) => el.basket * el.price).reduce((a, b) => a + b, 0)} ₽</p>
                        </div>
                        :
                        <div className="basket_basket_price">
                            <p className="basket_basket_delivery_text">Бесплатная доставка</p>
                        </div>
                    }
                    <p className="basket_basket_delivery_text">Минимальная сума заказа 1500 ₽</p>
                </div>
                <div className="basket_basket_price_button" onClick={() => { navigate('/ordering'); window.scrollBy(0, -100000) }}>Оформить заказ</div>
            </div>
        </div>
    )
}

export default Basket