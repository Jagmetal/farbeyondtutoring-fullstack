"use strict";
let Models = require("../models"); 

const getPosts = (res) => {
    //finds all users
    Models.Post.find({})
        .then(posts => res.send(posts))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const createPost = (postPayload, res) => {
    new Models.Post(postPayload).save()
        .then(post => res.send(post))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deletePost = (postId, res) => {
    // Delete a post by its ID
    Models.Post.findByIdAndRemove(postId)
        .then(post => {
            if (!post) {
                res.send({ result: 404, error: "Post not found" });
            } else {
                res.send({ result: 200, message: "Post deleted successfully" });
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getPosts, createPost, deletePost
}
