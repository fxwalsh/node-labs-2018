import express from 'express';
import Post from './postsModel';

const router = express.Router();// eslint-disable-line

router.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) return handleError(res, err);
    return res.send(posts);
  });
});

// Add a post
router.post('/', (req, res) => {
     const newPost = req.body;
    if (newPost) {
           Post.create(newPost, (err, post) => {
              if (err) return handleError(res, err);
                 return res.status(201).send({post});
          });
      } else {
         return handleError(res, err);
      }
});

// upvote a post
router.post('/:id/upvotes', (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, post) => {
        if (err) return handleError(res, err);
        post.upvotes++;
       post.save((err) => {
          if (err) return handleError(res, err);
           return res.status(201).send({post});
        });
  } );
});

// get post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, post) => {
        if (err) return handleError(res, err);
        return res.send({post});
  } );
});

// add comment
router.post('/:id/comments', (req, res) => {
   const id = req.params.id;
   const comment = req.body;
   Post.findById(id, (err, post)=>{
     if (err) return handleError(res, err);
        post.comments.push(comment);
        post.save((err) => {
          if (err) return handleError(res, err);
           return res.status(201).send({post});
        });
  });
});

router.post('/:postId/comments/:commentId/upvotes', (req, res) => {
   const commentId = req.params.commentId;
   const postId = req.params.postId;
   Post.findById( postId, (err, post)=>{
        if (err) return handleError(res, err);
           post.comments.id(commentId).upvotes++;
           post.save((err) => {
           if (err) return handleError(res, err);
                return res.status(201).send({post});
           });
  });
});

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;
