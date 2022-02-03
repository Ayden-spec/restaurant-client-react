import { useState } from 'react'
import GoogleMapComponentWithMarker from '../../components/Map/GoogleMapComponentWithMarker'
import './delivery.css'
import List_Select from './List_Select'

function Delivery() {
    const [List_Select_ID, SetList_Select_ID] = useState(-1);

    let arr = [
        {
            title: 'У наших курьеров всегда должна быть сдача!',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
        {
            title: 'Вам что-то не довезли?',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
        {
            title: 'Не понравился продукт?',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
        {
            title: 'Если появились замечания',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
        {
            title: 'Оплата Visa, MasterCard и МИР',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
        {
            title: 'Реквизиты',
            text: 'Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо замечания или предложения, то обязательно сообщайте их нам'
        },
    ]
    return (
        <div className="container_delivery_terms">

            <div className='basket_back_title'>
                <div className="basket_count_title">
                    <div className="basket_title">УСЛОВИЯ ДОСТАВКИ</div>
                </div>
            </div>

            <div className="container_delivery_terms_line" />

            <div className="delivery_terms_list_text_map">
                <div className='delivery_terms_list'>
                    {
                        arr.map((element, index) => (
                            <List_Select
                                value={List_Select_ID}
                                text={element.text}
                                title={element.title}
                                index={index}
                                setValue={SetList_Select_ID}
                            />
                        ))
                    }
                </div>
                <div className='delivery_terms_map'>
                    <GoogleMapComponentWithMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>


            <div className="delivery_terms_schedule">
                <div>
                    <p className="delivery_terms_schedule_title">График работы доставки:</p>
                    <p className="delivery_terms_schedule_text">с 10:00-21:00</p>
                </div>
                <div>
                    <p className="delivery_terms_schedule_title">График работы кафе:</p>
                    <p className="delivery_terms_schedule_text">с 08:00-21:00</p>
                </div>
            </div>

            <p className="delivery_terms_description_title">Минимальный заказ:</p>
            <p className="delivery_terms_description_text">Бесплатная доставка пешим курьером при сумме заказа от 400 ₽ Доставка оператором такси от любой суммы заказа - по тарифам перевозчика.</p>

        </div>
    )
}

export default Delivery