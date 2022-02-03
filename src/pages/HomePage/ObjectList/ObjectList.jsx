import './ObjectList.css'
import Comp from './Comp'
import { useSelector } from 'react-redux'


const ObjectList = (props) => {
    const products = useSelector(state => state.user.products)
    return (
        <div onMouseOver={() => props.mainpage && (props.setValue(props.value === props.index ? props.value : props.index))} key={props.key} className={`container_object_list id_object_${props.index}`} id={`object_block_${props.index}`}>
            <div className="object_list_title">{props.name.category_name.toUpperCase()}</div>
            <div className="object_list_map">
                {
                    (Array.isArray(products)?products:[]).filter(el => el.category_id == props.name.category_id).map((element, index) => (
                        <Comp index={index} element={element}/>
                    ))
                }
            </div>
        </div>
    )
}
export default ObjectList