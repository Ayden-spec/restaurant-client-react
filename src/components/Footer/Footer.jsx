import './footer.css'
import Logo from '../assets/footer/logo.png'
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    return (
        <div className="container_footer">
            <img src={Logo} alt="Logo" className="footer_logo_img" />
            <div className="footer_flex_column">
                <p className="footer_title">LOGOS</p>
                <p className="footer_text1">© ООО СК «АПШЕРОН»</p>
                <p className="footer_text1">Все права защищены. 2010-2022</p>
                <p className="footer_href">Пользовательское соглашение</p>
                <p className="footer_href">Политика конфиденциальности</p>
            </div>
            <div className="footer_button" onClick={()=>{navigate('/delivery'); window.scrollBy(0, -100000)}}>Условия доставки</div>
            <div className="footer_button" onClick={()=>navigate('/')}>Возврат товара</div>
            <div className="footer_button" onClick={()=>{navigate('/promotion'); window.scrollBy(0, -100000)}}>Акции</div>
        </div>
    );
}

export default Footer;
