import './css/navbar.css'
import Position from '../assets/navbar/position.png'
import Magnifying_Glass from '../assets/navbar/magnifying_glass.png'
import Phone from '../assets/navbar/phone.png'
import Login from './img/login.svg'
import Logout from './img/logout.png'
import Basket from '../assets/homepage/object_list/basket.png'

import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducers'

const Navbar = () => {
    const [Basket_, SetBasket] = useState([]);
    const [size, setSize] = useState([0, 0]);

    const isAuth = useSelector(state => state.user.isAuth)

    useLayoutEffect(() => {
        document.addEventListener(`storageChanged_basket_nav`, function () { SetBasket(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []); }, false);
        SetBasket(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []);

        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const width = size[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className="container_nav">
            <div className="navbar">
                {
                    width <= 550 &&
                    <div className='nav_profile'>
                        {
                            isAuth ?
                                <img src={Logout} alt="Logout" className='nav_profile_svg' onClick={() => dispatch(logout())} />
                                :
                                <img src={Login} alt="Login" className='nav_profile_svg' onClick={() => { navigate('/login'); window.scrollBy(0, -100000) }} />
                        }
                    </div>
                }
                <div className="nav_logo" onClick={() => { navigate('/'); window.scrollBy(0, -100000) }}>LOGOS</div>
                {width > 550 &&
                    <div className="nav_input_block">
                        <div className="nav_input_position_input">
                            <img src={Position} alt="Position" className='nav_img' />
                            <input type="text" placeholder='Введите адрес доставки' className="nav_input" />
                        </div>
                        <img src={Magnifying_Glass} alt="Magnifying_Glass" className='nav_img Magnifying_Glass' />
                    </div>
                }
                {
                    width > 550 &&
                    <div className="nav_block_input_contacts">
                        <div className="nav_phone">
                            <div className="nav_phone_img_block">
                                <img src={Phone} alt="Phone" className="nav_phone_img" />
                            </div>
                            <div>
                                <p className="name">Контакты:</p>
                                <p className="number">+7(917)510-57-59</p>
                            </div>
                        </div>
                        <div className="nav_line" />
                        {
                            isAuth ?
                                <div className='nav_profile' onClick={() => { dispatch(logout()) }}>
                                    <img src={Logout} alt="Login" className='nav_profile_svg' />
                                    Выйти
                                </div>
                                :
                                <div className='nav_profile' onClick={() => { navigate('/login'); window.scrollBy(0, -100000) }}>
                                    <img src={Login} alt="Login" className='nav_profile_svg' />
                                    Войти
                                </div>
                        }
                    </div>
                }
                {
                    width > 550 ?
                        <div className="nav_basket_button" onClick={() => { navigate('/basket'); window.scrollBy(0, -100000) }}>
                            <p className="nav_basket">Корзина | &nbsp;</p>
                            <p className="count_basket">{Basket_.length}</p>
                        </div>
                        :
                        <div className="nav_basket_button_2" onClick={() => { navigate('/basket'); window.scrollBy(0, -100000) }}>
                            <img src={Basket} alt="Basket" className="nav_basket_img" />
                            <div className="nav_basket_line" />
                            <p className="nav_basket_2">корзина</p>
                        </div>
                }
            </div>
            {width <= 550 &&
                <div className="nav_input_block">
                    <div className="nav_input_position_input">
                        <img src={Position} alt="Position" className='nav_img' />
                        <input type="text" placeholder='Введите адрес доставки' className="nav_input" />
                    </div>
                    <img src={Magnifying_Glass} alt="Magnifying_Glass" className='nav_img Magnifying_Glass' />
                </div>
            }
        </div>
    )
}
export default Navbar