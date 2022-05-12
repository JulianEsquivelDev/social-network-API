const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

// /api/users using get and post
router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);
// /api/users/:id using get put delete
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);
// /api/users/:userId/friends/:friendId using post and delete
router 
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
