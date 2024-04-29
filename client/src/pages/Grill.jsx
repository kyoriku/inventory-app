import React, { useState, useEffect } from 'react';

import { getMe, getGrillData, saveGrillData, updateGrillData } from '../utils/API';
import Auth from '../utils/auth';
import { formatDate, formatDateDisplay } from '../utils/formatDate'

import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import AddGrillEntryModal from '../components/GrillModalAdd';
import EditGrillEntryModal from '../components/GrillModalEdit';

import '../styles/styles.css';
import '../styles/Input.css';

const GrillStation = () => {
  const initialNewItemState = {
    date: formatDate(Date.now()),
    burgers: { onLine: '', frozen: '' },
    clubChicken: { onLine: '', frozen: '' },
    beerCanChicken: { onLine: '', frozen: '' },
    vegBurgers: { onLine: '', frozen: '' },
    sourdough: '',
    sesameBuns: '',
    hoagieBuns: '',
    turkey: { onLine: '', frozen: '' },
    halloumi: ''
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
      const response = await getGrillData();

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
          burgers: { ...itemToEdit.burgers },
          clubChicken: { ...itemToEdit.clubChicken },
          beerCanChicken: { ...itemToEdit.beerCanChicken },
          vegBurgers: { ...itemToEdit.vegBurgers },
          sourdough: itemToEdit.sourdough,
          sesameBuns: itemToEdit.sesameBuns,
          hoagieBuns: itemToEdit.hoagieBuns,
          turkey: { ...itemToEdit.turkey },
          halloumi: itemToEdit.halloumi
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
        const response = await updateGrillData(editingItemId, editItem, token);

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
        const response = await saveGrillData(newItem, token);

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
      "burgers": ["onLine", "frozen"],
      "clubChicken": ["onLine", "frozen"],
      "beerCanChicken": ["onLine", "frozen"],
      "vegBurgers": ["onLine", "frozen"],
      "sourdough": ["on Line"],
      "sesameBuns": ["on Line"],
      "hoagieBuns": ["on Line"],
      "turkey": ["onLine", "frozen"],
      "halloumi": ["on Line"]
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
      const response = await saveGrillData(newItem);

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
      const response = await updateGrillData(updatedItemToEdit._id, updatedItemToEdit, token);

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
      burgers: { ...item.burgers },
      clubChicken: { ...item.clubChicken },
      beerCanChicken: { ...item.beerCanChicken },
      vegBurgers: { ...item.vegBurgers },
      sourdough: item.sourdough,
      sesameBuns: item.sesameBuns,
      hoagieBuns: item.hoagieBuns,
      turkey: { ...item.turkey },
      halloumi: item.halloumi
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
          <h2 className='text-center card title-card bg-dark text-light'>Grill</h2>
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
                  <th scope='col'>On Line</th>
                  <th scope='col'>Frozen</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory
                  .slice().reverse().map(item => (
                    <React.Fragment key={item._id}>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='first-row'>{formatDateDisplay(item.date)}</td>
                        <td className='border-end'>Burgers</td>
                        <td className='border-end'>{item.burgers.onLine}</td>
                        <td>{item.burgers.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Club Chicken</td>
                        <td className='border-top border-end'>{item.clubChicken.onLine}</td>
                        <td className='border-top'>{item.clubChicken.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Beer Can Chicken</td>
                        <td className='border-top border-end'>{item.beerCanChicken.onLine}</td>
                        <td className='border-top'>{item.beerCanChicken.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Veggie Burgers</td>
                        <td className='border-top border-end'>{item.vegBurgers.onLine}</td>
                        <td className='border-top'>{item.vegBurgers.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Sourdough</td>
                        <td className='border-top border-end'>{item.sourdough}</td>
                        <td className='border-top'></td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Sesame Buns</td>
                        <td className='border-top border-end'>{item.sesameBuns}</td>
                        <td className='border-top'></td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Hoagie Buns</td>
                        <td className='border-top border-end'>{item.hoagieBuns}</td>
                        <td className='border-top'></td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Turkey</td>
                        <td className='border-top border-end'>{item.turkey.onLine}</td>
                        <td className='border-top'>{item.turkey.frozen}</td>
                      </tr>
                      <tr className='first-row' onClick={() => handleEditItem(item)}>
                        <td className='border-top'></td>
                        <td className='border-top border-end'>Halloumi</td>
                        <td className='border-top border-end'>{item.halloumi}</td>
                        <td className='border-top'></td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddGrillEntryModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newItem={newItem}
        />
        {editItem && (
          <EditGrillEntryModal
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
        <h2 className='text-center card title-card bg-dark text-light'>Grill</h2>
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
              <th className='align-top'>Burgers</th>
              <th className='align-top'>Club Chicken</th>
              <th className='align-top'>Beer Can Chicken</th>
              <th className='align-top'>Veggie Burgers</th>
              <th className='align-top'>Sourdough</th>
              <th className='align-top'>Sesame Buns</th>
              <th className='align-top'>Hoagie Buns</th>
              <th className='align-top'>Turkey</th>
              <th className='align-top'>Halloumi</th>
            </tr>
            <tr className='table-secondary border-dark'>
              <td className='table-secondary border-dark'>{monthNames[currentMonth]} {currentYear}</td>
              <td className='align-top'>OL / F</td>
              <td className='align-top'>OL / F</td>
              <td className='align-top'>OL / F</td>
              <td className='align-top'>OL / F</td>
              <td></td>
              <td></td>
              <td></td>
              <td className='align-top'>OL / F</td>
              <td></td>
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
                    renderEditableInput("burgers", editItem.burgers, handleEditChange)
                  ) : (
                    `${item.burgers.onLine} / ${item.burgers.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("clubChicken", editItem.clubChicken, handleEditChange)
                  ) : (
                    `${item.clubChicken.onLine} / ${item.clubChicken.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("beerCanChicken", editItem.beerCanChicken, handleEditChange)
                  ) : (
                    `${item.beerCanChicken.onLine} / ${item.beerCanChicken.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("vegBurgers", editItem.vegBurgers, handleEditChange)
                  ) : (
                    `${item.vegBurgers.onLine} / ${item.vegBurgers.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="sourdough"
                      value={editItem.sourdough}
                      onChange={handleEditChange}
                      className="form-control half-width-input"
                    />
                  ) : (
                    item.sourdough
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="sesameBuns"
                      value={editItem.sesameBuns}
                      onChange={handleEditChange}
                      className="form-control half-width-input"
                    />
                  ) : (
                    item.sesameBuns
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="hoagieBuns"
                      value={editItem.hoagieBuns}
                      onChange={handleEditChange}
                      className="form-control half-width-input"
                    />
                  ) : (
                    item.hoagieBuns
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    renderEditableInput("turkey", editItem.turkey, handleEditChange)
                  ) : (
                    `${item.turkey.onLine} / ${item.turkey.frozen}`
                  )}
                </td>
                <td>
                  {isEditMode && editingItemId === item._id ? (
                    <input
                      type="text"
                      name="halloumi"
                      value={editItem.halloumi}
                      onChange={handleEditChange}
                      className="form-control half-width-input"
                    />
                  ) : (
                    item.halloumi
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
                  name="burgers.onLine"
                  value={newItem.burgers.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="burgers.frozen"
                  value={newItem.burgers.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="clubChicken.onLine"
                  value={newItem.clubChicken.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="clubChicken.frozen"
                  value={newItem.clubChicken.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="beerCanChicken.onLine"
                  value={newItem.beerCanChicken.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="beerCanChicken.frozen"
                  value={newItem.beerCanChicken.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="vegBurgers.onLine"
                  value={newItem.vegBurgers.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="vegBurgers.frozen"
                  value={newItem.vegBurgers.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="sourdough"
                  value={newItem.sourdough}
                  onChange={handleChange}
                  className="form-control small-input"
                  placeholder='Total'                />
              </td>
              <td>
                <input
                  type="text"
                  name="sesameBuns"
                  value={newItem.sesameBuns}
                  onChange={handleChange}
                  className="form-control small-input"
                  placeholder='Total'                />
              </td>
              <td>
                <input
                  type="text"
                  name="hoagieBuns"
                  value={newItem.hoagieBuns}
                  onChange={handleChange}
                  className="form-control small-input"
                  placeholder='Total'                />
              </td>
              <td>
                <input
                  type="text"
                  name="turkey.onLine"
                  value={newItem.turkey.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='OL'
                />
                <span> / </span>
                <input
                  type="text"
                  name="turkey.frozen"
                  value={newItem.turkey.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                  placeholder='F'
                />
              </td>
              <td>
                <input
                  type="text"
                  name="halloumi"
                  value={newItem.halloumi}
                  onChange={handleChange}
                  className="form-control small-input"
                  placeholder='Total'
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

export default GrillStation;
