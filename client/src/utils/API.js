// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

// route to create a new user
export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// route to login a user
export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// get all fryer data
export const getFryerData = () => {
  return fetch('/api/fryer');
};

// save new fryer data
export const saveFryerData = (newItem, token) => {
  return fetch('/api/fryer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
};

// update fryer data
// export const updateFryerData = (newItem, token) => {
//   return fetch('/api/fryer', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(newItem),
//   });
// };

export const updateFryerData = (itemId, newItem, token) => {
  return fetch(`/api/fryer/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
};


// delete fryer data
export const deleteFryerData = (token) => {
  return fetch('/api/fryer', {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// get all grill data
export const getGrillData = () => {
  return fetch('/api/grill');
};

// save new grill data
export const saveGrillData = (newItem, token) => {
  return fetch('/api/grill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
};

// update grill data
export const updateGrillData = (newItem, token) => {
  return fetch('/api/grill', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  });
};

// delete grill data
export const deleteGrillData = (token) => {
  return fetch('/api/grill', {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
