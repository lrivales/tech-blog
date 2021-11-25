const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const hbs = require('express-handlebars').create({});
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require('path');

const sess = {
    secret: 'mysupersecretpassword',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sequelize.sync({force: true}) will recreate the tables
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
}); 