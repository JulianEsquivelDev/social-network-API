const router = require('express').Router();
// get all methods from the thoughts-controller
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');
// /api/thoughts route using get and post
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
// /api/thoughts/:id using get put delete
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughts)
    .delete(deleteThoughts)
// /api/thoughts/:thoughtId/reactions using post
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
// /api/thoughts/:thoughtId/reactionId using delete
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
