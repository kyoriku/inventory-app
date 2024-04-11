// Importing React and necessary hooks
import React, { useState, useEffect } from 'react';

// Importing utility functions
import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import { formatDate, formatDateDisplay } from '../utils/formatDate';

// Importing components
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

// Importing the styles for the page
import '../styles/styles.css';

const GrillStation = () => {
  const [userData, setUserData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newItem, setNewItem] = useState({
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
  }, [userDataLength])

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/grill');
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
  }, []);

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
      const response = await fetch('/api/grill', {
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
        burgers: { onLine: '', frozen: '' },
        clubChicken: { onLine: '', frozen: '' },
        beerCanChicken: { onLine: '', frozen: '' },
        vegBurgers: { onLine: '', frozen: '' },
        sourdough: '',
        sesameBuns: '',
        hoagieBuns: '',
        turkey: { onLine: '', frozen: '' },
        halloumi: ''
      });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter(item =>
    item.date.toLowerCase().includes(searchQuery)
  );

  if (!userDataLength) {
    return <LoadingSpinner />
  }

  return (
    <div className='pt-2 background'>
      <div className='d-flex justify-content-center'>
        <h2 className='text-center card title-card bg-secondary text-light'>Grill</h2>
      </div>
      <div className='mx-2'>
        <div className='d-flex justify-content-center mb-2'>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
        <table className='table table-bordered border-dark table-hover box m-0'>
          <thead>
            <tr className='table-dark'>
              <th className='align-top' style={{ width: '10%' }}>Date</th>
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
              <td className='table-secondary border-dark'></td>
              <td>On Line / Frozen</td>
              <td>On Line / Frozen</td>
              <td>On Line / Frozen</td>
              <td>On Line / Frozen</td>
              <td></td>
              <td></td>
              <td></td>
              <td>On Line / Frozen</td>
              <td> </td>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item._id}>
                <td className='table-secondary border-dark'>{formatDateDisplay(item.date)}</td>
                <td>{item.burgers.onLine} / {item.burgers.frozen}</td>
                <td>{item.clubChicken.onLine} / {item.clubChicken.frozen}</td>
                <td>{item.beerCanChicken.onLine} / {item.beerCanChicken.frozen}</td>
                <td>{item.vegBurgers.onLine} / {item.vegBurgers.frozen}</td>
                <td>{item.sourdough}</td>
                <td>{item.sesameBuns}</td>
                <td>{item.hoagieBuns}</td>
                <td>{item.turkey.onLine} / {item.turkey.frozen}</td>
                <td>{item.halloumi}</td>
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
                />
                <span> / </span>
                <input
                  type="text"
                  name="burgers.frozen"
                  value={newItem.burgers.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="clubChicken.onLine"
                  value={newItem.clubChicken.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
                <span> / </span>
                <input
                  type="text"
                  name="clubChicken.frozen"
                  value={newItem.clubChicken.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="beerCanChicken.onLine"
                  value={newItem.beerCanChicken.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
                <span> / </span>
                <input
                  type="text"
                  name="beerCanChicken.frozen"
                  value={newItem.beerCanChicken.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="vegBurgers.onLine"
                  value={newItem.vegBurgers.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
                <span> / </span>
                <input
                  type="text"
                  name="vegBurgers.frozen"
                  value={newItem.vegBurgers.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="sourdough"
                  value={newItem.sourdough}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="sesameBuns"
                  value={newItem.sesameBuns}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hoagieBuns"
                  value={newItem.hoagieBuns}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="turkey.onLine"
                  value={newItem.turkey.onLine}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
                <span> / </span>
                <input
                  type="text"
                  name="turkey.frozen"
                  value={newItem.turkey.frozen}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="halloumi"
                  value={newItem.halloumi}
                  onChange={handleChange}
                  className="form-control half-width-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center mt-2">
        <button className='btn btn-success btn-lg' onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default GrillStation;
