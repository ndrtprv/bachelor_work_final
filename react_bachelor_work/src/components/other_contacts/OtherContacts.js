import { Container } from "react-bootstrap";

function OtherContacts() {
    return (
        <Container className="pl-3 pr-3 d-flex flex-column justify-content-center contact-data">
            <div>
                <h2>Контактні дані</h2>
            </div>
            <div>
                <p>Тут ви маєте можливість ознайомитися з нашими сторінками в соцмережах:</p>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <p><i className='fab fa-youtube'></i> <a href="https://www.youtube.com/channel/UCya7l0Wl8SqlLCl5Jh3J04A">Youtube-канал</a></p>
                <p><i className='fab fa-telegram'></i> <a href="https://t.me/ndrtprv">Telegram-канал</a></p>
                <p><i className='fa-solid fa-phone'></i> <a href="tel:+380668202729">+38 (066) 820-27-29</a></p>
            </div>
        </Container>
    );
}

export default OtherContacts;