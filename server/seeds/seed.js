const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const userData = require('./userData'); // Import user seed data
const fryerData = require('./fryerData'); // Import fryer seed data
const grillData = require('./grillData'); // Import grill seed data

// Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/counts'; // Use the MONGODB_URI environment variable

async function seedDatabase() {
  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();

    const db = client.db();

    // Drop the existing database
    await db.dropDatabase();
    console.log('Database dropped successfully.');

    // Hash password for the user
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData[0].password, saltRounds);
    userData[0].password = hashedPassword;

    // Insert user seed data into a collection
    const userResult = await db.collection('users').insertMany(userData);
    console.log(`${userResult.insertedCount} user documents inserted into the database.`);

    // Insert fryer seed data into a collection
    const fryerResult = await db.collection('fryers').insertMany(fryerData);
    console.log(`${fryerResult.insertedCount} fryer documents inserted into the database.`);

    // Insert grill seed data into a collection
    const grillResult = await db.collection('grills').insertMany(grillData);
    console.log(`${grillResult.insertedCount} grill documents inserted into the database.`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Execute the seed script
seedDatabase();
