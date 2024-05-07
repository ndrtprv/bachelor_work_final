import './Contacts.css';
import Feedback from './feedback/Feedback';
import OtherContacts from './other_contacts/OtherContacts';

function Contacts() {
    return (
        <main>
            <div className='d-flex flex-row justify-content-center'>
                <OtherContacts />
                <Feedback />
            </div>
        </main>
    );
}

export default Contacts;