import { useState } from "react"
import { login } from "../../actions/user";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch =useDispatch();

    const navigate = useNavigate();

    const isAuth = useSelector(state => state.user.isAuth)
    useEffect(() => {
        if(isAuth){
            navigate('/')
        }
    }, [])
    return (
        <div className="registration_block">
            <div className='registration'>
                <div className='registration_title'>Авторизация</div>
                <div className="registration_input">
                    <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
                </div>
                <div className="registration_input">
                    <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль" />
                </div>
                <div className="divButtonsRegistration">
                    <div onClick={() => dispatch(login(email, password, function(){navigate('/')}))} className="basket_basket_price_button ordering_menu_checkbox_button">Войти</div>
                    <div className="basket_basket_price_button ordering_menu_checkbox_button" onClick={()=>navigate('/registration')}>Регистрация</div>
                </div>
            </div>
        </div>
    )
}
export default Login