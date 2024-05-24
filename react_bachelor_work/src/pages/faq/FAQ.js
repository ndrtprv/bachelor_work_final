import Accordion from 'react-bootstrap/Accordion';
import './FAQ.css';
import { Container } from 'react-bootstrap';

function FAQ(props) {
    return(
        <main>
            <Container className="mt-3">
                <h2>Часто задавані питання</h2>
            </Container>
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