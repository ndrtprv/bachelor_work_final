import Accordion from 'react-bootstrap/Accordion';
import './FAQ.css';

function FAQ(props) {
    return(
        <main>
            <Accordion>
                {props.quests.map((quest, index) =>
                    <Accordion.Item key={index} eventKey={'' + index}>
                        <Accordion.Header>{quest.question}</Accordion.Header>
                        <Accordion.Body>
                            {quest.answer}
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </main>
    );
}

export default FAQ;