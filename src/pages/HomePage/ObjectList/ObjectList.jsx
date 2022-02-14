import './ObjectList.css'
import ProductCard from './ProductCard'


const ObjectList = (props) => {
    return (
        <div onMouseOver={() => props.mainpage && (props.setValue(props.value === props.index ? props.value : props.index))} key={props.index} className={`container_object_list id_object_${props.index}`} id={`object_block_${props.index}`}>
            <div className="object_list_title">{props.name.category_name.toUpperCase()}</div>
            <div className="object_list_map">
                {
                    (Array.isArray(props.array)?props.array:[]).filter(el => el.category_id == props.name.category_id).map((element, index) => (
                        <ProductCard index={index} element={element}/>
                    ))
                }
            </div>
        </div>
    )
}
export default ObjectList