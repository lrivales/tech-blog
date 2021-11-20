const router = require('express').Router();
const { User, Post } = require('../models');

// get all users
router.get('/api/users', (req, res) => {
    User.findAll({
        include: {
            model: Post,
            attributes: ['title']
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get user by id
router.get('/api/users/:id', (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: Post,
            attributes: ['title']
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// add user
router.post('/api/users', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update user by id
router.put('/api/users/:id', (req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete user
router.delete('/api/users/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;