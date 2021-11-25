const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { QueryTypes, json } = require('sequelize');

router.get('/', async (req, res) => {
    const posts = await sequelize.query(
        "SELECT `post`.`id`, `post`.`title`, `post`.`post_text`, `post`.`user_id`, `post`.`created_at` AS `createdAt`, `post`.`updated_at` AS `updatedAt`, `post`.`user_id` AS `userId`, `user`.`username` AS `author`, `comments`.`comment_text` AS `post_comment_text`, `comments`.`created_at` AS `comment_date`, `comments->user`.`username` AS `commenter` FROM `post` AS `post` LEFT OUTER JOIN `user` AS `user` ON `post`.`user_id` = `user`.`id` LEFT OUTER JOIN `comment` AS `comments` ON `post`.`id` = `comments`.`post_id` LEFT OUTER JOIN `user` AS `comments->user` ON `comments`.`user_id` = `comments->user`.`id` ORDER BY `post`.`updated_at` DESC",
        { type: QueryTypes.SELECT });

    console.log(posts);
    res.render('homepage', {posts});
});



router.get('/login', async (req, res) => {
    
});

module.exports = router;