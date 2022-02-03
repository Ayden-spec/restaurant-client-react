import './promotion.css'
import Contacts from '../HomePage/Contacts/Contacts'
import Promotion_Object from './Promotion_Object'
import GoogleMapComponentWithMarker from '../../components/Map/GoogleMapComponentWithMarker'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { get_promotion } from '../../actions/user'

function Promotion() {

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const date = (c) => {
        let date_arr = c.split('T')[0].split('-').reverse();
        let m = parseInt(date_arr[1], 10) - 1
        return `до ${date_arr[0]} ${months[m]}`
    }

    const promotion_objects = useSelector(state => state.user.promotion)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_promotion())
    }, [])
    return (
        <div className="container_promotion">

            <div className='basket_back_title'>
                <div className="basket_count_title">
                    <div className="basket_title">АКЦИИ</div>
                </div>
            </div>

            <div className="promotion_line"/>

            <div className="container_promotion_objects">
                {
                    promotion_objects.map((element)=>(
                        <Promotion_Object title={element.name} text={element.description} image={element.image} date={date(element.end_date)}/>
                    ))
                }
            </div>

            <div className='Google_Map Google_Map_margin_top'>
                <Contacts/>
                <GoogleMapComponentWithMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>

        </div>
    )
}

export default Promotion