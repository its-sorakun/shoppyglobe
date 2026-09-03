import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = [
  {
    name: "ThinkPad T14",
    price: 1200,
    description: "Rugged, developer-friendly laptop with excellent keyboard.",
    stockQuantity: 15
  },
  {
    name: "Mechanical Keyboard",
    price: 150,
    description: "Cherry MX Brown switches for tactile feedback.",
    stockQuantity: 50
  },
  {
    name: "USB-C Hub",
    price: 45,
    description: "7-in-1 dongle for all your peripheral needs.",
    stockQuantity: 100
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB...');
    await Product.deleteMany({}); // Clear existing products
    const inserted = await Product.insertMany(seedProducts);
    console.log('Successfully seeded database with products!');
    console.log('--- Copy one of these IDs for your Cart tests ---');
    inserted.forEach(p => console.log(`${p.name} ID: ${p._id}`));
    process.exit();
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
