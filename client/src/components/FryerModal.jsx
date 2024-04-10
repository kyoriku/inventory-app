import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDateDisplay } from '../utils/formatDate';

const AddFryerEntryModal = ({ showModal, handleCloseModal, handleChange, handleSubmit, newItem }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} className='mt-5'>
      <Modal.Header closeButton>
        <Modal.Title>Add New Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Date:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='date'
                  value={formatDateDisplay(newItem.date)}
                  onChange={handleChange}
                  disabled
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Thighs:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenThighs.onLine'
                  value={newItem.chickenThighs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenThighs.frozen'
                  value={newItem.chickenThighs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Karage:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenKarage.onLine'
                  value={newItem.chickenKarage.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenKarage.frozen'
                  value={newItem.chickenKarage.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Wings:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenWings'
                  value={newItem.chickenWings}
                  onChange={handleChange}
                  placeholder='Total'
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Hot Dogs:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='hotDogs.onLine'
                  value={newItem.hotDogs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='hotDogs.frozen'
                  value={newItem.hotDogs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Veggie Dogs:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegDogs.onLine'
                  value={newItem.vegDogs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegDogs.frozen'
                  value={newItem.vegDogs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFryerEntryModal;
