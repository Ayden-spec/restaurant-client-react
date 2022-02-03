import './contacts.css'
import Email from '../../../assets/homepage/contacts/mail.png'
import Position from '../../../assets/homepage/contacts/position.png'

import Facebook from '../../../assets/homepage/contacts/facebook.png'
import VK from '../../../assets/homepage/contacts/vk.png'
import YouTube from '../../../assets/homepage/contacts/youtube.png'
import Instagram from '../../../assets/homepage/contacts/inst.png'

function Contacts() {
    return (
        <div className="container_contacts">
            <div className="contacts_title">КОНТАКТЫ</div>
            <div className="contacts_line" />
            <div className="contacts_flex_row">
                <img src={Position} alt="Position" className="contacts_img" />
                <div>
                    <p className='mail_position'>Наш адрес:</p>
                    <p className='contacts_text'>МО, городской округ Красногорск, село Ильинкое, Экспериментальная улица, 10</p>
                </div>
            </div>
            <div className="contacts_flex_row">
                <img src={Email} alt="Email" className="contacts_img" />
                <div>
                    <p className='mail_position'>Наша почта:</p>
                    <p className='contacts_text'>auto.wash@gmail.com</p>
                </div>
            </div>
            <div className="contacts_line" />
            <div className="contacts_flex_row_2">
                <div className="contacts_button">Забронировать стол</div>
                <div>
                    <p className='contscts_number'>+7 (917) 510-57-59</p>
                    <p className='mail_position'>Звоните или оставляйте заявку</p>
                </div>
            </div>
            <div className="contacts_flex_row_3">
                <p className='contacts_social'>Мы в соц сетях:</p>
                <img src={Facebook} alt="Facebook" className="contacts_social_img" />
                <img src={VK} alt="VK" className="contacts_social_img" />
                <img src={YouTube} alt="YouTube" className="contacts_social_img" />
                <img src={Instagram} alt="Instagram" className="contacts_social_img" />
            </div>
        </div>
    );
}

export default Contacts;
