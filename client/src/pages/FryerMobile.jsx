import React, { useState, useEffect } from 'react';

import { getMe, getFryerData, saveFryerData } from '../utils/API';
import Auth from '../utils/auth';
import { formatDate, formatDateDisplay } from '../utils/formatDate';

import LoadingSpinner from '../components/LoadingSpinner';
import AddFryerEntryModal from '../components/FryerModal';

import '../styles/styles.css';
import '../styles/Input.css';

const FryerStation = () => {
  const [userData, setUserData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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

  const getToken = () => Auth.loggedIn() ? Auth.getToken() : null;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = getToken();

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
        const response = await getFryerData();

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
    const token = getToken();

    if (!token) {
      return false;
    }

    try {
      const response = await saveFryerData(newItem);

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

  const filteredInventory = inventory.filter(item => {
    const itemMonth = new Date(item.date).getMonth();
    const itemDate = item.date.toLowerCase();
    const itemYear = new Date(item.date).getFullYear();
    return itemYear === currentYear && itemMonth === currentMonth && itemDate;
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = (prevMonth - 1 + 12) % 12;
      const newYear = newMonth === 11 ? currentYear - 1 : currentYear;
      setCurrentYear(newYear);
      return newMonth;
    });
    setSearchQuery('');
    setIsEditMode(false);
  };

  const handleNextMonth = () => {
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

    const currentDate = new Date();

    if (nextYear > currentDate.getFullYear() || (nextYear === currentDate.getFullYear() && nextMonth > currentDate.getMonth())) {
      return;
    }

    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    setSearchQuery('');
    setIsEditMode(false);
  };

  const isNextMonthDisabled = () => {
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

    const currentDate = new Date();

    return nextYear > currentDate.getFullYear() || (nextYear === currentDate.getFullYear() && nextMonth > currentDate.getMonth());
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  if (!userDataLength) {
    return <LoadingSpinner />;
  }

  return (
    <div className='pt-2 background d-flex flex-column '>
      <div className='d-flex justify-content-center'>
        <h2 className='text-center card title-card bg-primary text-light'>Fryer</h2>
      </div>
      <div className='mx-2'>

        <div className="d-flex justify-content-between">
          <button className='btn btn-primary' onClick={handlePreviousMonth}>&#8592; Prev Month</button>
          <button className='btn btn-success' onClick={handleShowModal}>Add</button>
          <button className='btn btn-primary' onClick={handleNextMonth} disabled={isNextMonthDisabled()}>Next Month &#8594;</button>
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
              {filteredInventory
                .slice().reverse().map(item => (
                  <React.Fragment key={item._id}>
                    <tr className='first-row'>
                      <td className='first-row'>{formatDateDisplay(item.date)}</td>
                      <td className='border-end'>Chicken Thighs</td>
                      <td className='border-end'>{item.chickenThighs.onLine}</td>
                      <td>{item.chickenThighs.frozen}</td>
                    </tr>
                    <tr className='first-row'>
                      <td className='border-top'></td>
                      <td className='border-top border-end'>Chicken Karage</td>
                      <td className='border-top border-end'>{item.chickenKarage.onLine}</td>
                      <td className='border-top'>{item.chickenKarage.frozen}</td>
                    </tr>
                    <tr className='first-row'>
                      <td className='border-top'></td>
                      <td className='border-top border-end'>Chicken Wings</td>
                      <td className='border-top border-end'>{item.chickenWings}</td>
                      <td className='border-top'></td>
                    </tr>
                    <tr className='first-row'>
                      <td className='border-top'></td>
                      <td className='border-top border-end'>Hot Dogs</td>
                      <td className='border-top border-end'>{item.hotDogs.onLine}</td>
                      <td className='border-top'>{item.hotDogs.frozen}</td>
                    </tr>
                    <tr className='first-row'>
                      <td className='border-top'></td>
                      <td className='border-top border-end'>Veggie Dogs</td>
                      <td className='border-top border-end'>{item.vegDogs.onLine}</td>
                      <td className='border-top'>{item.vegDogs.frozen}</td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
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
