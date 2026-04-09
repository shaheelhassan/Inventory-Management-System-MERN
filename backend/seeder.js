const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const User = require('./models/User');
const Item = require('./models/Item');

const connectDB = async () => {
  try {
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const items = [
  { name: 'Surgical Masks', sku: 'MED-001', category: 'Pharmaceutical', quantity: 1200, supplier: 'Global Med', purchaseDate: '2024-01-10', expiryDate: '2026-01-10', price: 0.5 },
  { name: 'Wireless Headphones', sku: 'ELEC-102', category: 'Electronics', quantity: 45, supplier: 'TechCore', purchaseDate: '2024-02-15', price: 99.99 },
  { name: 'Insulin Syringes', sku: 'MED-045', category: 'Pharmaceutical', quantity: 15, supplier: 'PharmaDirect', purchaseDate: '2024-04-01', expiryDate: '2025-04-01', price: 1.2 },
  { name: 'Laptop Stand', sku: 'OFF-304', category: 'Office Supplies', quantity: 120, supplier: 'DeskStore', purchaseDate: '2024-03-20', price: 35.0 },
  { name: 'Multivitamin Syrup', sku: 'MED-089', category: 'Pharmaceutical', quantity: 10, supplier: 'NatureHealth', purchaseDate: '2023-10-01', expiryDate: '2024-03-01', price: 12.5 },
  { name: 'Security Camera', sku: 'ELEC-905', category: 'Electronics', quantity: 8, supplier: 'SafeEye', purchaseDate: '2024-01-05', price: 150.0 },
  { name: 'Office Chair', sku: 'OFF-102', category: 'Office Supplies', quantity: 50, supplier: 'ComfortSpace', purchaseDate: '2024-05-10', price: 125.0 },
];

const importData = async () => {
  try {
    await connectDB();
    
    await User.deleteMany();
    await Item.deleteMany();

    const createdUsers = await User.create([
      { name: 'Admin User', email: 'admin@inventrack.com', password: 'password123', role: 'Admin' },
      { name: 'Manager User', email: 'manager@inventrack.com', password: 'password123', role: 'Manager' },
      { name: 'Staff User', email: 'staff@inventrack.com', password: 'password123', role: 'Viewer' }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleItems = items.map(item => ({ ...item, user: adminUser }));

    await Item.insertMany(sampleItems);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Logic to clear data could be here
  process.exit();
} else {
  importData();
}
