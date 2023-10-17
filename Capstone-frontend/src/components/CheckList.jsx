import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Checklist = ({ selectedServices }) => {
    const services = ['Service Selection', 'Calendar Date Picker', 'Your Information'];

    return (
        <div>

            <div className="white-bg-container">
                <ListGroup>
                    {services.map((service) => (
                        <ListGroup.Item key={service}>
                            {selectedServices.includes(service)
                                ? <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                                : <FontAwesomeIcon icon={faCircle} />
                            }
                            {' '}{service}
                        </ListGroup.Item>
                    ))}
                </ListGroup>


                <div className="trouble-booking mt-4">
                    <p>Having trouble booking? Contact us anytime at:</p>
                    <a href="mailto:placeholderemail@example.com" className="booking-email">placeholderemail@example.com</a>
                </div>
            </div>
        </div>
    );
};

export default Checklist;
