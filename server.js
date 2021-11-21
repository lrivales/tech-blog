const express = require('express');
const sequelize = require('./config/connection');
const apiUserRoutes = require('./controllers/apiUserRoutes');
const apiPostRoutes = require('./controllers/apiPostRoutes');
const apiCommentRoutes = require('./controllers/apiCommentRoutes');
const homeRoutes = require('./controllers/homeRoutes');
const hbs = require('express-handlebars').create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiUserRoutes);
app.use(apiPostRoutes);
app.use(apiCommentRoutes);
app.use(homeRoutes);

// sequelize.sync({force: true}) will recreate the tables
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
}); 