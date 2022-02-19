import './ordering.css'
import Back from '../../assets/basket/back.png'
import Time from '../../assets/ordering/time.png'
import Checkbox from '../../assets/ordering/checkbox.png'
import StopListImg from '../../assets/ordering/stop_list.png'
import Plus from '../../assets/basket/plus.png'
import Minus from '../../assets/basket/minus.png'
import Input from '../../components/Input'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { add_order, get_user_info, update_user_info } from '../../actions/user'

function Ordering() {
    const [Selector_1, SetSelector_1] = useState('delivery'); // 'delivery', 'pickup'
    const [Selector_2, SetSelector_2] = useState('online'); // 'online', 'courier', 'cash'
    const [Selector_3, SetSelector_3] = useState('soon'); // 'soon', 'time'

    const [Counter, SetCounter] = useState(1);

    const [Checkbox_1, SetCheckbox_1] = useState(0);
    const [Checkbox_2, SetCheckbox_2] = useState(false);


    const [Name, Set_Name] = useState('');
    const [Number, Set_Number] = useState('');


    const [Street, Set_Street] = useState('');
    const [House_Number, Set_House_Number] = useState('');
    const [Apartment, Set_Apartment] = useState('');
    const [Entrance, Set_Entrance] = useState('');
    const [Floor, Set_Floor] = useState('');
    const [Comment, Set_Comment] = useState('');

    const [Cash, Set_Cash] = useState('');

    const [Time_state, Set_Time_state] = useState('');

    const [Banner, Set_Banner] = useState(830)

    const [Error, Set_Error] = useState('')

    const [Basket, SetBasket] = useState([]);

    const navigate = useNavigate();

    /* ////////////////////////////////////////////////////////// */

    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('basket')) {
            SetBasket(JSON.parse(localStorage.getItem('basket')));
        }
        dispatch(get_user_info(function (data) {
            Set_Name(typeof (data.name) === "string" ? data.name : '');
            Set_Number(typeof (data.number) === "string" ? data.number : '');
            Set_Street(typeof (data.street) === "string" ? data.street : '');
            Set_House_Number(typeof (data.house_number) === "string" ? data.house_number : '');
            Set_Apartment(typeof (data.apartment_number) === "string" ? data.apartment_number : '')
            Set_Entrance(typeof (data.entrance) === "string" ? data.entrance : '');
            Set_Floor(typeof (data.floor) === "string" ? data.floor : '');
        }))
        Set_Banner(get_time())
    }, [])
    /* ////////////////////////////////////////////////////// */

    const issue = () => {
        if (Basket.length === 0) {
            Set_Error('Корзина пуста!')
            window.scrollBy({
                top: -100000,
                behavior: "smooth"
            })
            return
        }
        if (Name === '') {
            Set_Error('Заполните поле: "имя"!')
            window.scrollBy({
                top: -100000,
                behavior: "smooth"
            })
            return
        }
        if (Number === '') {
            Set_Error('Заполните поле: "телефон"!')
            window.scrollBy({
                top: -100000,
                behavior: "smooth"
            })
            return
        }
        if (Selector_1 === 'delivery') {
            if (Street === '' || House_Number === '' || Apartment === '' || Entrance === '' || Floor === '') {
                Set_Error('Заполните все поля в блоке "доставка"!')
                window.scrollBy({
                    top: -100000,
                    behavior: "smooth"
                })
                return
            }
        }
        if (Selector_2 === 'cash') {
            if (Cash === '') {
                Set_Cash(0)
            }
        }
        if (Selector_3 === 'time' && Time_state === '') {
            SetSelector_3('soon')
        }
        if (!Checkbox_2) {
            Set_Error('Подтвердите, что согласены на обработку перс. данных в соответствии с условиями!')
            window.scrollBy({
                top: -100000,
                behavior: "smooth"
            })
            return
        }
        if (isAuth) {
            dispatch(update_user_info(Name, Number, Street, House_Number, Apartment, Entrance, Floor))
        }
        dispatch(add_order(Number, Name, Selector_1, Street, House_Number, Apartment, Entrance, Floor, Comment, Selector_2, Cash, Selector_3, Counter, Time_state, Checkbox_1,Time_state, Basket))
        Set_Error('')
    }

    setInterval(() => {
        Set_Banner(get_time())
    }, 30000);

    const get_time = () => {
        let date = new Date();
        return parseInt(`${date.getHours()}` + date.getMinutes())
    }
    return (
        <div className="container_ordering">
            <div className='basket_back_title'>
                <div className="basket_button_back">
                    <img src={Back} alt="Back" className="basket_button_back_img" />
                    <p className="button_back" onClick={() => navigate('/basket')}>в корзину</p>
                </div>
                <div className="basket_count_title">
                    <div className="basket_title">ОФОРМЛЕНИЕ ЗАКАЗА</div>
                </div>
            </div>

            {
                !(Banner >= 830 && Banner <= 2050) &&
                < div className="ordering_stop_list_block">
                    <div>
                        <p className="ordering_stop_list_title">Сегодня мы уже не доставляем.</p>
                        <p className="ordering_stop_list_text">Заказы принимаем до 20:50, доставляем с 8:30 до 21:30</p>
                    </div>
                    <img src={StopListImg} alt="StopListImg" className="ordering_stop_list_img" />
                </div>
            }

            {
                Error !== '' &&
                <div className="ordering_stop_list_block_error">
                    <div>
                        <p className="ordering_stop_list_title">{Error}</p>
                    </div>
                </div>
            }

            <div className="ordering_block">
                <p className="ordering_block_title">1. Контактная информация</p>
                <div className="ordering_display_row_0 pad_right">
                    <div className="ordering_display_row_input_50 ordering_margin_right">
                        <Input value={Name} setValue={Set_Name} type="text" placeholder='Имя*' />
                    </div>
                    <div className="ordering_display_row_input_50">
                        <Input value={Number} setValue={Set_Number} type="text" placeholder='Телефон*' />
                    </div>
                </div>
            </div>

            <div className="ordering_block">
                <p className="ordering_block_title">2. Доставка</p>
                <div className="ordering_display_row_1">
                    <div className={Selector_1 === 'delivery' ? "ordering_selector ordering_selector_backround_left_50" : "ordering_selector ordering_selector_backround_right_50"}>
                        <p onClick={() => SetSelector_1('delivery')} className="ordering_selector_button">Доставка</p>
                        <p onClick={() => SetSelector_1('pickup')} className="ordering_selector_button">Самовывоз</p>
                    </div>
                    {Selector_1 !== 'pickup' &&
                        <div className="time_of_delivery_block">
                            <img src={Time} className="time_of_delivery_img" />
                            <p className="time_of_delivery_text">Примерное время доставки  1 час 30 минут</p>
                        </div>
                    }
                </div>
                {
                    Selector_1 === 'delivery' ?
                        <div>
                            <p className="delivery_address_title">Адрес доставки</p>
                            <div className="ordering_display_row_input_70">
                                <div className="ordering_display_row_0">
                                    <div className="ordering_display_row_input_60 ordering_margin_right">
                                        <Input value={Street} setValue={Set_Street} type="text" placeholder='Укажите улицу*' />
                                    </div>
                                    <div className="ordering_display_row_input_40">
                                        <Input value={House_Number} setValue={Set_House_Number} type="text" placeholder='Номер дома*' />
                                    </div>
                                </div>
                                <div className="ordering_display_row_0">
                                    <div className="ordering_display_row_input_50 ordering_margin_right">
                                        <Input value={Apartment} setValue={Set_Apartment} type="text" placeholder='№ квартиры/офиса' />
                                    </div>
                                    <div className="ordering_display_row_input_50 ordering_margin_right">
                                        <Input value={Entrance} setValue={Set_Entrance} type="text" placeholder='Подъезд' />
                                    </div>
                                    <div className="ordering_display_row_input_50">
                                        <Input value={Floor} setValue={Set_Floor} type="text" placeholder='Этаж' />
                                    </div>
                                </div>
                                <div className="ordering_display_row_0">
                                    <div className="ordering_display_row_input_100">
                                        <Input value={Comment} setValue={Set_Comment} type="text" placeholder='Комментарий' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <p className="delivery_address_title">Адрес: МО, городской округ Красногорск, село Ильинкое, Экспериментальная улица, 10</p>
                    /*
                    <div>
                        <select className='ordering_select_restaurant'>
                            <option disabled selected>Выберите ресторан</option>
                            <option value="Чебурашка">Чебурашка</option>
                            <option value="Крокодил Гена">Крокодил Гена</option>
                            <option value="Шапокляк">Шапокляк</option>
                            <option value="Крыса Лариса">Крыса Лариса</option>
                        </select>
                    </div>
                    */
                }
            </div>

            <div className="ordering_block">
                <p className="ordering_block_title">3. Оплатить</p>
                <div className="ordering_display_row_1">
                    <div className={Selector_2 === 'online' ? "ordering_selector ordering_selector_backround_left_33" : Selector_2 === 'courier' ? "ordering_selector ordering_selector_backround_middle_33" : "ordering_selector ordering_selector_backround_right_33"}>
                        <p onClick={() => SetSelector_2('online')} className="ordering_selector_button">Оплата онлайн</p>
                        <p onClick={() => SetSelector_2('courier')} className="ordering_selector_button ordering_selector_button_middle_border">Курьеру картой</p>
                        <p onClick={() => SetSelector_2('cash')} className="ordering_selector_button">Налич<wbr />ными</p>
                    </div>
                </div>
                {Selector_2 === 'cash' &&
                    <div className="ordering_display_row_0 ordering_margin_top">
                        <div className="ordering_display_row_input_20">
                            <Input value={Cash} setValue={Set_Cash} type="text" placeholder='Сдача с' />
                        </div>
                    </div>
                }
            </div>


            <div className="ordering_block">
                <p className="ordering_block_title">4. Когда доставить</p>
                <div className="ordering_display_row_1">
                    <div className={Selector_3 === 'soon' ? "ordering_selector ordering_selector_backround_left_50 ordering_margin_right" : "ordering_selector ordering_selector_backround_right_50 ordering_margin_right"}>
                        <p onClick={() => SetSelector_3('soon')} className="ordering_selector_button">В ближайшее время</p>
                        <p onClick={() => SetSelector_3('time')} className="ordering_selector_button">Ко времени</p>
                    </div>
                    {Selector_3 === 'time' &&
                        <div className="ordering_display_row_input_20">
                            <Input value={Time_state} setValue={Set_Time_state} type="time" placeholder='Укажите время' />
                        </div>
                    }
                </div>
                <div className="input ordering_display_row_4 ordering_display_row_input_20 ordering_margin_top">
                    <p className="basket_count_product_text">Кол-во персон</p>
                    <div className="basket_count_product">
                        <img onClick={() => Counter === 1 ? '' : SetCounter(Counter - 1)} src={Minus} alt="Minus" className="basket_count_product_img" />
                        <p className="count_product">{Counter}</p>
                        <img onClick={() => Counter === 10 ? '' : SetCounter(Counter + 1)} src={Plus} alt="Plus" className="basket_count_product_img" />
                    </div>
                </div>
                <p className="delivery_address_title">Хотите мы позвоним?</p>
                <div className="ordering_display_row_3">
                    <div onClick={() => SetCheckbox_1(0)} className={Checkbox_1 === 0 ? "ordering_border_check_1" : "ordering_border_check_2"}>
                        {Checkbox_1 === 0 &&
                            <div className="ordering_backround_check" />
                        }
                    </div>
                    <p className="ordering_check_text">Не перезванивать</p>
                </div>
                <div className="ordering_display_row_3">
                    <div onClick={() => SetCheckbox_1(1)} className={Checkbox_1 === 1 ? "ordering_border_check_1" : "ordering_border_check_2"}>
                        {Checkbox_1 === 1 &&
                            <div className="ordering_backround_check" />
                        }
                    </div>
                    <p className="ordering_check_text">Потребуется<wbr /> звонок оператора</p>
                </div>
            </div>

            <div className="ordering_block ordering_margin_bottom">
                <div className="ordering_display_row_5">
                    <div className="ordering_menu_checkbox">
                        {Checkbox_2 ?
                            <img onClick={() => SetCheckbox_2(!Checkbox_2)} src={Checkbox} alt="checkbox" className="ordering_menu_checkbox_img_1" />
                            :
                            <div onClick={() => SetCheckbox_2(!Checkbox_2)} className="ordering_menu_checkbox_img_2"></div>
                        }
                        <div className="ordering_menu_checkbox">
                            <p className="ordering_menu_checkbox_text_1">Я согласен с</p>
                            <p className="ordering_menu_checkbox_text">Я согласен на обработку моих перс. данных в соответствии с</p>
                            <p className="ordering_menu_checkbox_text_0">Условиями</p>
                        </div>
                    </div>
                    <div className="basket_basket_price_button ordering_menu_checkbox_button" onClick={() => issue()}>Оформить заказ</div>
                </div>
            </div>

        </div >
    )
}

export default Ordering