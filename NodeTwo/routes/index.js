var express = require('express');
var router = express.Router();
const post = require('../models/post.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', async (req, res, next) => {
  await post.getPosts()
    .then(post => res.json({
      message: `Records get successfully`,
      content: post
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
});

/* A post by id */
router.get('/get/:id', async (req, res) => {
  const id = req.params.id
  await post.getPost(id)
    .then(post => res.json({
      message: `Records get successfully`,
      content: post
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

/* Insert a new post */
router.post('/post', async (req, res) => {
  await post.insertPost(req.body)
    .then(post => res.status(201).json({
      message: `The post #${post.id} has been created`,
      content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a post */
router.put('/put/:id', async (req, res) => {
  const id = req.params.id
  await post.updatePost(id, req.body)
    .then(post => res.json({
      message: `The post #${id} has been updated`,
      content: post
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    })
})

/* Delete a post */
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id

  await post.deletePost(id)
    // .then(post => res.json(post))
    .then(post => res.json({
      message: `The post #${id} has been deleted`,
      content:post
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    })
})

module.exports = router;
