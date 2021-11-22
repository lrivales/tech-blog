const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

// get all posts
router.get('/api/posts', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get post by id
router.get('/api/posts/:id', (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// add post
router.post('/api/posts', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit post by id
router.put('/api/posts/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.body.user_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete post
router.delete('/api/posts/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;