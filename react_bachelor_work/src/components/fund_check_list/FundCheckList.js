import React from 'react'
import { Accordion, Container, Pagination} from 'react-bootstrap';

function FundCheckList() {


    return (
        <Container className='mt-2 p-1' style={{borderStyle: 'solid', borderWidth: '0.2em', borderColor: 'gray'}}>
            <div className="mt-2">
                <h5>Отримані заявки</h5>
            </div>
            <Accordion>
                
            </Accordion>
            <Pagination style={{margin: '1em 1em 0 1em'}}>
                
            </Pagination>
        </Container>
    )
}

export default FundCheckList;