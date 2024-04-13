import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDateDisplay } from '../utils/formatDate';

const EditFryerEntryModal = ({ showModal, handleCloseModal, handleChange, handleEditSubmit, editItem }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} className='mt-5'>
      <Modal.Header closeButton>
        <Modal.Title className='ms-auto'>Edit</Modal.Title>
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
                  value={formatDateDisplay(editItem.date)}
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
                  value={editItem.chickenThighs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenThighs.frozen'
                  value={editItem.chickenThighs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          {/* Other form groups */}
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Karage:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenKarage.onLine'
                  value={editItem.chickenKarage.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='chickenKarage.frozen'
                  value={editItem.chickenKarage.frozen}
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
                  value={editItem.chickenWings}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
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
                  value={editItem.hotDogs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='hotDogs.frozen'
                  value={editItem.hotDogs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Veg Dogs:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegDogs.onLine'
                  value={editItem.vegDogs.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegDogs.frozen'
                  value={editItem.vegDogs.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button variant="danger" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="success" onClick={() => handleEditSubmit(editItem)}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFryerEntryModal;
