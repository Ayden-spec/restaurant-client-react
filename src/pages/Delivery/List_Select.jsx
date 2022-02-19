import Down from '../../assets/delivery/down.png'
import Up from '../../assets/delivery/up.png'

function List_Select(props) {
    return (
        <div onClick={()=>props.setValue(props.index === props.value ? -1 : props.index)} className="delivery_terms_list_block">
            <div className='delivery_terms_block_label_img'>
                <label className='delivery_terms_label'>{props.title}</label>
                <img src={props.value === props.index? Up : Down} className="delivery_terms_checkbox_img" />
            </div>
            <div className={props.value === props.index?"info__body_true":"info__body_false"}>{props.text}</div>
        </div>
    )
}
export default List_Select