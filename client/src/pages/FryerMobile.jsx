import React, { useState, useEffect } from 'react';

import { formatDate, formatDateDisplay } from '../utils/formatDate';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';

import AddFryerEntryModal from '../components/FryerModal';

import '../styles/styles.css';
import '../styles/Input.css';

const FryerStation = () => {
  const [userData, setUserData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    date: formatDate(Date.now()),
    chickenThighs: { onLine: '', frozen: '' },
    chickenKarage: { onLine: '', frozen: '' },
    chickenWings: '',
    hotDogs: { onLine: '', frozen: '' },
    vegDogs: { onLine: '', frozen: '' }
  });

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/fryer');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, [currentMonth]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewItem(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setNewItem(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/fryer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInventory([...inventory, data]);
      setNewItem({
        date: formatDate(Date.now()),
        chickenThighs: { onLine: '', frozen: '' },
        chickenKarage: { onLine: '', frozen: '' },
        chickenWings: '',
        hotDogs: { onLine: '', frozen: '' },
        vegDogs: { onLine: '', frozen: '' }
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth - 1 + 12) % 12);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth + 1) % 12);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className='pt-2 background d-flex flex-column '>
      <div className='d-flex justify-content-center'>
        <h2 className='text-center card title-card bg-primary text-light'>Fryer</h2>
      </div>
      <div className="d-flex justify-content-between">
        <button className='btn btn-primary' onClick={handlePreviousMonth}>&#8592; Prev Month</button>
        <button className='btn btn-success' onClick={handleShowModal}>Add</button>
        <button className='btn btn-primary' onClick={handleNextMonth}>Next Month &#8594;</button>
      </div>
      <div className='mt-2'>
        <table className='table table-bordered table-hover border-dark'>
          <thead>
            <tr className='table-dark'>
              <th scope='col'>Date</th>
              <th scope='col'>Product</th>
              <th scope='col' >On Line</th>
              <th scope='col'>Frozen</th>
            </tr>
          </thead>
          <tbody>
            {inventory
              .filter(item => new Date(item.date).getMonth() === currentMonth)
              .slice().reverse().map(item => (
                <tr key={item._id}>
                  <td className='table-secondary border-dark border-bottom'>{formatDateDisplay(item.date)}</td>
                  <td>
                    <div>
                      <div className='border-bottom'>Chicken Thighs</div>
                      <div className='border-bottom'>Chicken Karage</div>
                      <div className='border-bottom'>Chicken Wings</div>
                      <div className='border-bottom'>Hot Dogs</div>
                      <div>Veggie Dogs</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className='border-bottom'>{item.chickenThighs.onLine}</div>
                      <div className='border-bottom'>{item.chickenKarage.onLine}</div>
                      <div className='border-bottom'>{item.chickenWings}</div>
                      <div className='border-bottom'>{item.hotDogs.onLine}</div>
                      <div>{item.vegDogs.onLine}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className='border-bottom'>{item.chickenThighs.frozen}</div>
                      <div className='border-bottom'>{item.chickenKarage.frozen}</div>
                      <div className='border-bottom'><br></br></div>
                      <div className='border-bottom'>{item.hotDogs.frozen}</div>
                      <div>{item.vegDogs.frozen}</div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddFryerEntryModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newItem={newItem}
      />
    </div>
  );
};

export default FryerStation;
