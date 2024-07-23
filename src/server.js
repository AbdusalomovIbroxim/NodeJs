const app = require('./app');
const { sequelize } = require('./config/db.config');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
