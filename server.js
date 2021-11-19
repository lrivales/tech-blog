const express = require('express');
const sequelize = require('./config/connection');
const apiUserRoutes = require('./controllers/apiUserRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiUserRoutes);

// sequelize.sync({force: true}) will recreate the tables
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
}); 