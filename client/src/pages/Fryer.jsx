import React, { useState, useEffect } from 'react';

import { getMe, getFryerData, saveFryerData, updateFryerData } from '../utils/API';
import Auth from '../utils/auth';
import { formatDate, formatDateDisplay } from '../utils/formatDate'

import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import AddFryerEntryModal from '../components/FryerModalAdd';
import EditFryerEntryModal from '../components/FryerModalEdit';

import '../styles/styles.css';
import '../styles/Input.css';

const FryerStation = () => {
  const initialNewItemState = {
    date: formatDate(Date.now()),
    chickenThighs: { onLine: '', frozen: '' },
    chickenKarage: { onLine: '', frozen: '' },
    chickenWings: '',
    hotDogs: { onLine: '', frozen: '' },
    vegDogs: { onLine: '', frozen: '' }
  };

  const [userData, setUserData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newItem, setNewItem] = useState(initialNewItemState);
  const [editItem, setEditItem] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 828);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const userDataLength = Object.keys(userData).length;

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const filteredInventory = inventory.filter(item => {
    const itemMonth = new Date(item.date).getMonth();
    const itemDate = item.date.toLowerCase();
    const itemYear = new Date(item.date).getFullYear();
    const query = searchQuery.toLowerCase();
    return itemYear === currentYear && itemMonth === currentMonth && itemDate.includes(query);
  });

  useEffect(() => {
    getUserData();
  }, [userDataLength]);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 828);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getToken = () => Auth.loggedIn() ? Auth.getToken() : null;

  const getUserData = async () => {
    try {
      const token = getToken();
      if (!token) {
        return false;
      }

      const response = await getMe(token);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const user = await response.json();
      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await getFryerData();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const resetFormFields = () => {
    setNewItem(initialNewItemState);
  };

  const handleInputChange = (e, setStateFunction) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setStateFunction(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setStateFunction(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleChange = (e) => {
    handleInputChange(e, setNewItem);
  };

  const handleEditChange = (e) => {
    handleInputChange(e, setEditItem);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const handleRowClick = (itemId) => {
    if (!isEditMode) {
      setSelectedItemId(itemId);
      const itemToEdit = inventory.find(item => item._id === itemId);
      if (itemToEdit) {
        setEditItem({
          date: itemToEdit.date,
          chickenThighs: { ...itemToEdit.chickenThighs },
          chickenKarage: { ...itemToEdit.chickenKarage },
          chickenWings: itemToEdit.chickenWings,
          hotDogs: { ...itemToEdit.hotDogs },
          vegDogs: { ...itemToEdit.vegDogs }
        });
      }
      setEditingItemId(itemId);
      setIsEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setSelectedItemId(null);
    setIsEditMode(false);
    setEditItem(null);
    resetFormFields();
  };

  const handleSaveOrUpdate = async () => {
    const token = getToken();

    if (!token) {
      return false;
    }

    try {
      if (isEditMode && editingItemId) {
        const response = await updateFryerData(editingItemId, editItem, token);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedItem = await response.json();
        setInventory(inventory.map(item => (item._id === editingItemId ? updatedItem : item)));
        setEditingItemId(null);
        setSelectedItemId(null);
        setIsEditMode(false);
        setEditItem(null);
        resetFormFields();
      } else {
        const response = await saveFryerData(newItem, token);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setInventory([...inventory, data]);
        resetFormFields();
      }
    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  };

  const renderEditableInput = (productName, itemValue, onChange) => {
    const inputNames = {
      "chickenThighs": ["onLine", "frozen"],
      "chickenKarage": ["onLine", "frozen"],
      "chickenWings": ["onLine"],
      "hotDogs": ["onLine", "frozen"],
      "vegDogs": ["onLine", "frozen"]
    };

    const names = inputNames[productName];

    if (!names) {
      return null;
    }

    return (
      <>
        {names.map((name, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              name={`${productName}.${name}`}
              value={itemValue[name]}
              onChange={onChange}
              className="form-control half-width-input"
            />
            {index !== names.length - 1 && <span> / </span>}
          </React.Fragment>
        ))}
      </>
    );
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
      handleCloseModal();
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditItem(null);
  };

  const handleEditSubmit = async (editItem) => {
    const itemId = editItem._id;
    const itemToEdit = inventory.find(item => item._id === itemId);

    if (!itemToEdit) {
      throw new Error('Item not found in inventory');
    }

    const updatedItemToEdit = {
      ...itemToEdit,
      ...editItem
    };

    const token = getToken();

    if (!token) {
      return false;
    }

    try {
      const response = await updateFryerData(updatedItemToEdit._id, updatedItemToEdit, token);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedItem = await response.json();
      const updatedInventory = inventory.map(item => item._id === updatedItem._id ? updatedItem : item);
      setInventory(updatedInventory);

      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditItem({
      _id: item._id,
      date: item.date,
      chickenThighs: { ...item.chickenThighs },
      chickenKarage: { ...item.chickenKarage },
      chickenWings: item.chickenWings,
      hotDogs: { ...item.hotDogs },
      vegDogs: { ...item.vegDogs },
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditItem(null);
  };

  if (!userDataLength) {
    return <LoadingSpinner />;
  };

  if (isMobile) {
    return (
      <div className='pt-2 background d-flex flex-column '>
        <div className='d-flex justify-content-center'>
          <h2 className='text-center card title-card bg-dark text-light'>Fryer</h2>
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
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='first-row'>{formatDateDisplay(item.date)}</td>
                        <td className='border-end'>Chicken Thighs</td>
                        <td className='border-end'>{item.chickenThighs.onLine}</td>
                        <td>{item.chickenThighs.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Chicken Karage</td>
                        <td className='border-top border-end'>{item.chickenKarage.onLine}</td>
                        <td className='border-top'>{item.chickenKarage.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Chicken Wings</td>
                        <td className='border-top border-end'>{item.chickenWings}</td>
                        <td className='border-top'></td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Hot Dogs</td>
                        <td className='border-top border-end'>{item.hotDogs.onLine}</td>
                        <td className='border-top'>{item.hotDogs.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
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
        {editItem && (
          <EditFryerEntryModal
            showModal={showEditModal}
            handleCloseModal={handleCloseEditModal}
            handleChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
            editItem={editItem}
          />
        )}
      </div>
    );
  };

  return (
    <div className='pt-2 background'>
      <div className='d-flex justify-content-center'>
        <h2 className='text-center card title-card bg-dark text-light'>Fryer</h2>
      </div>
      <div className='mx-2'>
        <div className="d-flex justify-content-between">
          <button className='btn btn-primary' onClick={handlePreviousMonth}>&#8592; Prev Month</button>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <button className='btn btn-primary' onClick={handleNextMonth} disabled={isNextMonthDisabled()}>
            Next Month &#8594;
          </button>
        </div>
        <table className='mt-2 m-0 table table-bordered border-dark table-hover box'>
          <thead>
            <tr className='table-dark'>
              <th className='align-top' style={{ width: '10vw' }}>Date</th>
              <th className='align-top'>Chicken Thighs</th>
              <th className='align-top'>Chicken Karage</th>
              <th className='align-top'>Chicken Wings</th>
              <th className='align-top'>Hot Dogs</th>
              <th className='align-top'>Veggie Dogs</th>
            </tr>
            <tr className='table-secondary border-dark'>
              <td className='table-secondary border-dark'>{monthNames[currentMonth]} {currentYear}</td>
              <td className='align-top'>OL / F</td>
              <td className='align-top'>OL / F</td>
              <td></td>
              <td className='align-top'>OL / F</td>
              <td className='align-top'>OL / F</td>
            </tr>
          </thead>
          <tbody className='last'>
            {filteredInventory.map(item => (
              <tr
                key={item._id}
                onClick={() => handleRowClick(item._id)}
                className={selectedItemId === item._id ? 'selected-row' : ''}
              >
                <td className='table-secondary border-dark'>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="date"
                      value={formatDateDisplay(editItem.date)}
                      onChange={handleEditChange}
                      style={{ width: '10vw' }}
                      className="form-control"
                      disabled
                    />
                  ) : (
                    formatDateDisplay(item.date)
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("chickenThighs", editItem.chickenThighs, handleEditChange)
                  ) : (
                    `${item.chickenThighs.onLine} / ${item.chickenThighs.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("chickenKarage", editItem.chickenKarage, handleEditChange)
                  ) : (
                    `${item.chickenKarage.onLine} / ${item.chickenKarage.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="chickenWings"
                      value={editItem.chickenWings}
                      onChange={handleEditChange}
                      className="form-control half-width-input"
                    />
                  ) : (
                    item.chickenWings
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("hotDogs", editItem.hotDogs, handleEditChange)
                  ) : (
                    `${item.hotDogs.onLine} / ${item.hotDogs.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("vegDogs", editItem.vegDogs, handleEditChange)
                  ) : (
                    `${item.vegDogs.onLine} / ${item.vegDogs.frozen}`
                  )}
                </td>
              </tr>
            ))}
            <tr className='table-primary border-dark'>
              <td>
                <input
                  type="text"
                  name="date"
                  value={formatDateDisplay(newItem.date)}
                  onChange={handleChange}
                  style={{ width: '10vw' }}
                  className="form-control"
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  name="chickenThighs.onLine"
                  value={newItem.chickenThighs.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="chickenThighs.frozen"
                  value={newItem.chickenThighs.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="chickenKarage.onLine"
                  value={newItem.chickenKarage.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="chickenKarage.frozen"
                  value={newItem.chickenKarage.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="chickenWings"
                  value={newItem.chickenWings}
                  onChange={handleChange}
                  className="form-control small-input"
                  placeholder='Total'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hotDogs.onLine"
                  value={newItem.hotDogs.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="hotDogs.frozen"
                  value={newItem.hotDogs.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="vegDogs.onLine"
                  value={newItem.vegDogs.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="vegDogs.frozen"
                  value={newItem.vegDogs.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isEditMode ? (
        <div className="text-center m-2">
          <button className='btn btn-danger btn-lg me-1 mb-3' onClick={handleCancelEdit}>Cancel</button>
          <button className='btn btn-success btn-lg ms-1 mb-3' onClick={handleSaveOrUpdate}>Update</button>
        </div>
      ) : (
        <div className="text-center m-2">
          <button className='btn btn-success btn-lg  mb-3' onClick={handleSaveOrUpdate}>Save</button>
        </div>
      )}
    </div>
  );
};

export default FryerStation;
