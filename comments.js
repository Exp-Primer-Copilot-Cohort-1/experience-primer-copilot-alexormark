// Create web server
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var mongoose = require('mongoose');

// GET /comments
// Return all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting comments.'
            });
        }
        return res.json(comments);
    });
});

// GET /comments/:id
// Return a specific comment
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting comment.'
            });
        }
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found.'
            });
        }
        return res.json(comment);
    });
});

// POST /comments
// Create a new comment
router.post('/', jsonParser, function(req, res) {
    User.findById(req.body.author, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting user.'
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        Post.findById(req.body.post, function(err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting post.'
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'Post not found.'
                });
            }
            var comment = new Comment({