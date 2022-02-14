import './homepage.css'
import Logo from '../../assets/homepage/logo.png'
import Logo_Mini from '../../assets/homepage/logo-mini.png'
import ObjectList from './ObjectList/ObjectList';
import Category from './Category/Category';
import GoogleMapComponentWithMarker from '../../components/Map/GoogleMapComponentWithMarker';
import Contacts from './Contacts/Contacts';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_basket_user, get_categories_products } from '../../actions/user';


const HomePage = () => {
    const [Homepage_Menu, Set_Homepage_Menu] = useState(0)
    const [size, setSize] = useState([0, 0]);

    const categories = useSelector(state => state.user.categories)
    const products = useSelector(state => state.user.products)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_categories_products());
        dispatch(get_basket_user());

        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    const width = size[0]
    return (
        <div className="container_homepage">
            <img src={width >= 550 ? Logo : Logo_Mini} alt="Title" className="title"/>
            <Category value={Homepage_Menu} setValue={Set_Homepage_Menu} array={categories} />
            {
                categories.map((element, index) => (
                    <ObjectList array={products} mainpage={true} value={Homepage_Menu} setValue={Set_Homepage_Menu} name={element} index={index} />
                ))
            }
            <div className='Google_Map'>
                <Contacts />
                <GoogleMapComponentWithMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                /*
                isInfoboxVisible={this.state.isInfoboxVisible} // Show/hide info window
                infoboxMessage={this.state.infoboxMessage} // Message shown in info window
                handleInfoboxClick={this.handleInfoboxClick} // Handle closing of the info window
                handleMarkerClick={this.handleMarkerClick} // Handle click on Marker component
                infoboxPosY={this.state.markerLang} // Y coordinate for positioning info window
                infoboxPosX={this.state.markerLat} // X coordinate for positioning info window
                */
                />
            </div>
        </div>
    )
}
export default HomePage