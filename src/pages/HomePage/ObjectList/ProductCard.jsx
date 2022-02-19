import Basket_Img from '../../../assets/homepage/object_list/basket.png'
import Plus from '../../../assets/homepage/object_list/plus.png'
import Minus from '../../../assets/homepage/object_list/minus.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { product_add_basket, product_delete_basket, product_minus_basket, product_plus_basket } from '../../../actions/user';

function ProductCard({ element, index }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [Basket, SetBasket] = useState(null);

    const isAuth = useSelector(state => state.user.isAuth)

    useEffect(() => {
        document.addEventListener(`storageChanged_basket_${element.product_id}`, function () { storageChanged() }, false);
        storageChanged()
    }, [])


    const storageChanged = () => {
        SetBasket(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id) !== undefined ? JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id).basket : null : null);
    }

    const storage_basket_add = (e) => {
        localStorage.setItem('basket', JSON.stringify(e))
        document.dispatchEvent(new Event(`storageChanged_basket_${element.product_id}`));
    }

    const basket_add = () => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id) !== undefined) {
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

    const basket_plus = () => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id) !== undefined) {
                let arr = JSON.parse(localStorage.getItem('basket'));
                arr[JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id === element.product_id)] = { product_id: element.product_id, basket: JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id).basket + 1, description: element.description, image: element.image, name: element.name, price: element.price }
                storage_basket_add(arr)
                if (isAuth) {
                    dispatch(product_plus_basket(element.product_id))
                }
            }
        }
    }

    const basket_minus = () => {
        if (localStorage.getItem('basket')) {
            if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id) !== undefined) {
                let arr = JSON.parse(localStorage.getItem('basket'));
                if (JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id).basket === 1) {
                    arr.splice(JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id === element.product_id), 1)
                    storage_basket_add(arr)
                    document.dispatchEvent(new Event(`storageChanged_basket_nav`));
                    if (isAuth) {
                        dispatch(product_delete_basket(element.product_id))
                    }
                    return
                }
                arr[JSON.parse(localStorage.getItem('basket')).findIndex(el => el.product_id === element.product_id)] = { product_id: element.product_id, basket: JSON.parse(localStorage.getItem('basket')).find(el => el.product_id === element.product_id).basket - 1, description: element.description, image: element.image, name: element.name, price: element.price }
                storage_basket_add(arr)
                if (isAuth) {
                    dispatch(product_minus_basket(element.product_id))
                }
            }
        }
    }



    return (
        <div className={index === 0 ? "object object_null" : "object"}>
            {Basket && <div className="basket_count"><p className='object_price'>{Basket}</p></div>}
            <img src={element.image} alt={element.name} className="object_img" onClick={() => { navigate(`/product/${element.product_id}`); window.scrollBy(0, -100000) }} />
            <div className="object_title_mass">
                <div className="object_title">{element.name}</div>
                <div className="object_mass">Вес: {element.mass}г</div>
            </div>
            <div className="object_description">{element.description}</div>
            <div className="object_price_basket">
                {
                    Basket &&
                    <div className="nav_basket_button" onClick={() => basket_minus()}>
                        <img src={Minus} alt="Minus" className="object_basket" />
                    </div>
                }
                <div className="object_price">{element.price}₽</div>
                {
                    !Basket ?
                        <div className="nav_basket_button" onClick={() => basket_add()}>
                            <p className="object_basket_text">В корзину</p>
                            <img src={Basket_Img} alt="Basket" className="object_basket" />
                        </div>
                        :
                        <div className="nav_basket_button" onClick={() => basket_plus()}>
                            <img src={Plus} alt="Plus" className="object_basket" />
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductCard