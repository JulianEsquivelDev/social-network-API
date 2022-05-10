// require Thoughts and Users models
const { Thoughts, Users} = require('../models');
// users controller
const usersController = {
    // method to get all users
    getAllUsers(req, res) {
        Users.find({})
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1 })
        .then(UsersDbData => res.json(UsersDbData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get one user by id
        getUsersById({ params } , res) {
            Users.findOne({ _id: params.id})
            .populate({ path: 'thoughts', select: '-__V'})
            .populate({ path: 'friends', select: '-__v'})
            .select('-__v')
            .then(UsersDbData => {
                if (!UsersDbData) {
                    res.status(404).json({ message: 'Sorry no user found with this id'});
                    return;
                }
                res.json(UsersDbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
        },
        // method to create a new user
        createUsers({ body }, res) {
            Users.create(body)
            .then(UsersDbData => res.json(UsersDbData))
            .catch(err => res.json(err));
        },
        // method to update a user by id
        updateUsers({ params, body }, res) {
            Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(UsersDbData => {
                if (!UsersDbData) {
                    res.status(404).json({ message: 'Sorry no user found with this id'});
                    return;
                }
                res.json(UsersDbData);
            })
            .catch(err => res.json(err));
        },
        // method to delete a user with their thoughts by id
        deleteUsers({ params }, res ) {
            Thoughts.deleteMany({ userId: params.id })
            .then(() => {
                Users.findOneAndDelete({ userId: params.id })
                .then(UsersDbData => {
                    if (!UsersDbData) {
                    res.status(404).json({ message: 'Sorry no user found with this id' });
                    return;
                    }
                    res.json(UsersDbData);
                })
            })
            .catch(err => res.json(err));
        },
        // method to add a friend
        addFriend({ params}, res) {
            Users.findOneAndUpdate({_id: params.userId }, {$push: { friends: params.friendId }},
                {new: true})
                .populate({ path: 'friends', select: ('-__v')})
                .select('-__v')
                .then(UsersDbData => {
                    if (!UsersDbData) {
                        res.status(404).json({ message: 'Sorry no user found with this id' });
                    return;
                    }
                    res.json(UsersDbData);
                })
                .catch(err => res.json(err));
        },

        // method to delete a friend
        deleteFriend({ params}, res) {
            Users.findOneAndUpdate({_id: params.userId }, {$push: { friends: params.friendId }},
                {new: true})
                .populate({ path: 'friends', select: ('-__v')})
                .select('-__v')
                .then(UsersDbData => {
                    if (!UsersDbData) {
                        res.status(404).json({ message: 'Sorry no user found with this id' });
                    return;
                    }
                    res.json(UsersDbData);
                })
                .catch(err => res.json(err));
        }
};
// export the controller
module.exports = usersController;