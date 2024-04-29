import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDateDisplay } from '../utils/formatDate';

const EditGrillEntryModal = ({ showModal, handleCloseModal, handleChange, handleEditSubmit, editItem }) => {
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
                <Form.Label>Burgers:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='burgers.onLine'
                  value={editItem.burgers.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='burgers.frozen'
                  value={editItem.burgers.frozen}
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
                <Form.Label>Club Chicken:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='clubChicken.onLine'
                  value={editItem.clubChicken.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='clubChicken.frozen'
                  value={editItem.clubChicken.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>BC Chicken:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='beerCanChicken.onLine'
                  value={editItem.beerCanChicken.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='beerCanChicken.frozen'
                  value={editItem.beerCanChicken.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Veg Burgers:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegBurgers.onLine'
                  value={editItem.vegBurgers.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegBurgers.frozen'
                  value={editItem.vegBurgers.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Sourdough:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='sourdough'
                  value={editItem.sourdough}
                  onChange={handleChange}
                  placeholder='Quantity'
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Sesame Buns:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='sesameBuns'
                  value={editItem.sesameBuns}
                  onChange={handleChange}
                  placeholder='Quantity'
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Hoagie Buns:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='hoagieBuns'
                  value={editItem.hoagieBuns}
                  onChange={handleChange}
                  placeholder='Quantity'
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Turkey:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='turkey.onLine'
                  value={editItem.turkey.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='turkey.frozen'
                  value={editItem.turkey.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Halloumi:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='halloumi'
                  value={editItem.halloumi}
                  onChange={handleChange}
                  placeholder='Quantity'
                />
              </div>
              {/* Placeholder column to maintain alignment */}
              <div className="col"></div>
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

export default EditGrillEntryModal;
