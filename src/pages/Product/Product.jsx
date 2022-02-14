import './product.css'
import ProductImg from '../../assets/product/product.png'
import Basket from '../../assets/product/basket.png'
import Back from '../../assets/product/back.png'
import Back2 from '../../assets/product/back2.png'
import ObjectList from '../HomePage/ObjectList/ObjectList';
import Contacts from '../HomePage/Contacts/Contacts';
import GoogleMapComponentWithMarker from '../../components/Map/GoogleMapComponentWithMarker';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get_product_id, get_recomendation, product_add_basket } from '../../actions/user'

function Product() {
    const product = useSelector(state => state.user.products)
    const recommendations = useSelector(state => state.user.recommendations)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(get_product_id(id));
        dispatch(get_recomendation());
    }, [])


    const storage_basket_add = (e) => {
        localStorage.setItem('basket', JSON.stringify(e))
    }

    const basket_add = (element) => {
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
        dispatch(product_add_basket(element.product_id))
    }

    return (
        <div className="container_product">
            <div className="product_block">
                <div className="product_button_back" onClick={()=>navigate('/')}>
                    <img src={Back} alt="Back" className="button_back_img" />
                    <p className="button_back">Вернуться назад</p>
                </div>
                <div className="product_cart">
                    <img src={Back2} alt="Back" className="button_back_img_2" onClick={()=>navigate('/')}/>
                    <img src={ProductImg} alt="Product" className="product_cart_img" />
                    <div className="product_cart_description">
                        <div className='product_title_description'>
                            <p className="product_title">{product.name}</p>
                            <p className="product_description">{product.compound}</p>
                        </div>
                        <div className='product_price_desc_2'>
                            <div className="product_weight">Вес: {product.mass}г</div>
                            <div className="product_basket_price">
                                <div className="product_button_basket" onClick={()=>{basket_add(product); navigate('/basket'); window.scrollBy(0, -100000)}}>
                                    <p className="nav_basket">Корзина | &nbsp;</p>
                                    <img src={Basket} alt="Basket" className="product_baksket_img" />
                                </div>
                                <div className="product_price">{product.price} ₽</div>
                            </div>
                            <div className="product_compound">
                                <div className="product_compound_line" />
                                <div>
                                    <p className='product_compound_name'>Белки</p>
                                    <p className='product_compound_value'>{product.squirrels}</p>
                                </div>
                                <div>
                                    <p className='product_compound_name'>Жиры</p>
                                    <p className='product_compound_value'>{product.fats}</p>
                                </div>
                                <div>
                                    <p className='product_compound_name'>Углеводы</p>
                                    <p className='product_compound_value'>{product.carbohydrates}</p>
                                </div>
                                <div>
                                    <p className='product_compound_name'>Ккал</p>
                                    <p className='product_compound_value'>{product.kilocalories}</p>
                                </div>
                                <div>
                                    <p className='product_compound_name'>Вес</p>
                                    <p className='product_compound_value'>{product.mass} г</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product_line" />
            <ObjectList key='products' name={{ category_name: 'С ЭТИМ ТОВАРОМ ПОКУПАЮТ' }} array={recommendations} mainpage={false}/>
            <div className='Google_Map'>
                <Contacts />
                <GoogleMapComponentWithMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </div>
    );
}

export default Product;
