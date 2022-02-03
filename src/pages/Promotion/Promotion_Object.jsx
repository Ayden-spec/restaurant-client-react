function Promotion_Object(props) {
    return (
        <div className="promotion_object_block">
            <img src={props.image} className="promotion_object_img" />
            <p className="promotion_object_title">{props.title}</p>
            <p className="promotion_object_text">{props.text}</p>
            <p className="promotion_object_date">{props.date}</p>
        </div>
    )
}
export default Promotion_Object