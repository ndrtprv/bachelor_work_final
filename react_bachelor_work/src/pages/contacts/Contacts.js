import './Contacts.css';
import Feedback from './feedback/Feedback';
import OtherContacts from './other_contacts/OtherContacts';

function Contacts() {
    return (
        <main>
            <div className='d-flex justify-content-center contact-page'>
                <OtherContacts />
                <Feedback />
            </div>
        </main>
    );
}

export default Contacts;