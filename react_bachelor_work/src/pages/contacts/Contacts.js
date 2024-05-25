import './Contacts.css';
import Feedback from '../../components/feedback/Feedback';
import OtherContacts from '../../components/other_contacts/OtherContacts';

function Contacts() {
    
    const classNameForm = "m-5 p-2";

    return (
        <main>
            <div className='d-flex justify-content-center contact-page'>
                <OtherContacts />
                <Feedback isSmall={true} classNameForm={classNameForm} />
            </div>
        </main>
    );
}

export default Contacts;