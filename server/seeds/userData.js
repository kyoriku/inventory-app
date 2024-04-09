require('dotenv').config(); 

const userData = [
  {
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }
];

module.exports = userData;
