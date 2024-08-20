require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./config/db.config');

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
