import './ordering.css'
import Back from '../../assets/basket/back.png'
import Time from '../../assets/ordering/time.png'
import Checkbox from '../../assets/ordering/checkbox.png'
import StopListImg from '../../assets/ordering/stop_list.png'
import Plus from '../../assets/basket/plus.png'
import Minus from '../../assets/basket/minus.png'
import Input from '../../components/Input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Ordering() {
    const [Selector_1, SetSelector_1] = useState(1);
    const [Selector_2, SetSelector_2] = useState(1);
    const [Selector_3, SetSelector_3] = useState(1);

    const [Counter, SetCounter] = useState(1);

    const [Checkbox_1, SetCheckbox_1] = useState(1);
    const [Checkbox_2, SetCheckbox_2] = useState(0);


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

    const navigate = useNavigate();

    return (
        <div className="container_ordering">
            <div className='basket_back_title'>
                <div className="basket_button_back">
                    <img src={Back} alt="Back" className="basket_button_back_img" />
                    <p className="button_back" onClick={()=>navigate('/basket')}>в корзину</p>
                </div>
                <div className="basket_count_title">
                    <div className="basket_title">ОФОРМЛЕНИЕ ЗАКАЗА</div>
                </div>
            </div>

            <div className="ordering_stop_list_block">
                <div>
                    <p className="ordering_stop_list_title">Сегодня мы уже не доставляем.</p>
                    <p className="ordering_stop_list_text">Заказы принимаем до 20:50, доставляем с 8:30 до 21:30</p>
                </div>
                <img src={StopListImg} alt="StopListImg" className="ordering_stop_list_img" />
            </div>

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
                    <div className={Selector_1 === 1 ? "ordering_selector ordering_selector_backround_left_50" : "ordering_selector ordering_selector_backround_right_50"}>
                        <p onClick={() => SetSelector_1(1)} className="ordering_selector_button">Доставка</p>
                        <p onClick={() => SetSelector_1(2)} className="ordering_selector_button">Самовывоз</p>
                    </div>
                    {Selector_1 !== 2 &&
                        <div className="time_of_delivery_block">
                            <img src={Time} className="time_of_delivery_img" />
                            <p className="time_of_delivery_text">Примерное время доставки  1 час 30 минут</p>
                        </div>
                    }
                </div>
                {
                    Selector_1 === 1 ?
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
                    <div className={Selector_2 === 1 ? "ordering_selector ordering_selector_backround_left_33" : Selector_2 === 2 ? "ordering_selector ordering_selector_backround_middle_33" : "ordering_selector ordering_selector_backround_right_33"}>
                        <p onClick={() => SetSelector_2(1)} className="ordering_selector_button">Оплата онлайн</p>
                        <p onClick={() => SetSelector_2(2)} className="ordering_selector_button ordering_selector_button_middle_border">Курьеру картой</p>
                        <p onClick={() => SetSelector_2(3)} className="ordering_selector_button">Налич<wbr />ными</p>
                    </div>
                </div>
                {Selector_2 === 3 &&
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
                    <div className={Selector_3 === 1 ? "ordering_selector ordering_selector_backround_left_50 ordering_margin_right" : "ordering_selector ordering_selector_backround_right_50 ordering_margin_right"}>
                        <p onClick={() => SetSelector_3(1)} className="ordering_selector_button">В ближайшее время</p>
                        <p onClick={() => SetSelector_3(2)} className="ordering_selector_button">Ко времени</p>
                    </div>
                    {Selector_3 === 2 &&
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
                    <div onClick={() => SetCheckbox_1(1)} className={Checkbox_1 === 1 ? "ordering_border_check_1" : "ordering_border_check_2"}>
                        {Checkbox_1 === 1 &&
                            <div className="ordering_backround_check" />
                        }
                    </div>
                    <p className="ordering_check_text">Не перезванивать</p>
                </div>
                <div className="ordering_display_row_3">
                    <div onClick={() => SetCheckbox_1(2)} className={Checkbox_1 === 2 ? "ordering_border_check_1" : "ordering_border_check_2"}>
                        {Checkbox_1 === 2 &&
                            <div className="ordering_backround_check" />
                        }
                    </div>
                    <p className="ordering_check_text">Потребуется<wbr /> звонок оператора</p>
                </div>
            </div>

            <div className="ordering_block ordering_margin_bottom">
                <div className="ordering_display_row_5">
                    <div className="ordering_menu_checkbox">
                        {Checkbox_2 === 1 ?
                            <img onClick={() => SetCheckbox_2(2)} src={Checkbox} alt="checkbox" className="ordering_menu_checkbox_img_1" />
                            :
                            <div onClick={() => SetCheckbox_2(1)} className="ordering_menu_checkbox_img_2"></div>
                        }
                        <div className="ordering_menu_checkbox">
                            <p className="ordering_menu_checkbox_text_1">Я согласен с</p>
                            <p className="ordering_menu_checkbox_text">Я согласен на обработку моих перс. данных в соответствии с</p>
                            <p className="ordering_menu_checkbox_text_0">Условиями</p>
                        </div>
                    </div>
                    <div className="basket_basket_price_button ordering_menu_checkbox_button">Оформить заказ</div>
                </div>
            </div>

        </div >
    )
}

export default Ordering