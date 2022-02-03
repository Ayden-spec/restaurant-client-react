import './input.css'
const Input = ( props ) => {
    return (
        <input className='input' placeholder={props.placeholder} type={props.type} value={props.value} onChange={(event)=>props.setValue(event.target.value)}/>
    )
}
export default Input