import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registration } from "../../actions/user";
import Input from "../../components/Input"
import './registr.css'

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const isAuth = useSelector(state => state.user.isAuth)
    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [])
    return (
        <div className="registration_block">
            <div className='registration'>
                <div className='registration_title'>Регистрация</div>
                <div className="registration_input">
                    <Input value={name} setValue={setName} type="text" placeholder="Введите имя" />
                </div>
                <div className="registration_input">
                    <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
                </div>
                <div className="registration_input">
                    <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль" />
                </div>
                <div className="divButtonsRegistration">
                    <div onClick={() => registration(email, password, name, function () { navigate('/login') })} className="basket_basket_price_button ordering_menu_checkbox_button">Зарегестрироваться</div>
                    <div className="basket_basket_price_button ordering_menu_checkbox_button" onClick={() => navigate('/login')}>Войти</div>
                </div>
            </div>
        </div>
    )
}
export default Registration