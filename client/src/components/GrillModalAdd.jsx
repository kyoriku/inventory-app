import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDateDisplay } from '../utils/formatDate';

const AddGrillEntryModal = ({ showModal, handleCloseModal, handleChange, handleSubmit, newItem }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} className='mt-5'>
      <Modal.Header closeButton>
        <Modal.Title className='ms-auto'>Add</Modal.Title>
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
                <Form.Label>Burgers:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='burgers.onLine'
                  value={newItem.burgers.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='burgers.frozen'
                  value={newItem.burgers.frozen}
                  onChange={handleChange}
                  placeholder='Frozen'
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-2'>
            <div className="row align-items-center">
              <div className="col">
                <Form.Label>Club Chicken:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='clubChicken.onLine'
                  value={newItem.clubChicken.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='clubChicken.frozen'
                  value={newItem.clubChicken.frozen}
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
                  value={newItem.beerCanChicken.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='beerCanChicken.frozen'
                  value={newItem.beerCanChicken.frozen}
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
                  value={newItem.vegBurgers.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='vegBurgers.frozen'
                  value={newItem.vegBurgers.frozen}
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
                  value={newItem.sourdough}
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
                <Form.Label>Sesame Buns:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='sesameBuns'
                  value={newItem.sesameBuns}
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
                <Form.Label>Hoagie Buns:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='hoagieBuns'
                  value={newItem.hoagieBuns}
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
                <Form.Label>Turkey:</Form.Label>
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='turkey.onLine'
                  value={newItem.turkey.onLine}
                  onChange={handleChange}
                  placeholder='On Line'
                />
              </div>
              <div className="col">
                <Form.Control
                  type='text'
                  name='turkey.frozen'
                  value={newItem.turkey.frozen}
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
                  value={newItem.halloumi}
                  onChange={handleChange}
                  placeholder='Total'
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
        <Button variant="success" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGrillEntryModal;
