const express = require('express');
const sequelize = require('./src/config/database'); // Import Sequelize instance
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const orderReturnRoutes = require('./src/routes/orderReturnRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const sellerRoutes = require('./src/routes/sellerRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Syncing models with the database
sequelize.sync()
.then(() => console.log('Database synced successfully!'))
.catch((error) => console.error('Error syncing database:', error));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// User Route
app.use('/api/users', userRoutes);

// Order Route
app.use('/api/orders', orderRoutes);


// Order Return Route
app.use('/api/order-returns', orderReturnRoutes);
// Sample route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use('/api/customers', customerRoutes);  

app.use('/api/sellers', sellerRoutes);

module.exports = app;