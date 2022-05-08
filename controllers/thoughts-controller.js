// require Thoughts and Users models
const { Thoughts, Users } = require('../models');

// thoughts controller
const thoughtsController = {
    // method to get all thoughts data
    // callback function for the GET route
    getAllThoughts(req, res ) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__V'
        })
        .select('-__V')
        .sort({ _id: -1 })
        .then(ThoughtsDbData => res.json(ThoughtsDbData))
        .catch(err => {
            console.log(err);
        res.sendStatus(400);
        })
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id} )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(ThoughtsDbData => res.json(ThoughtsDbData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },
    // method to create a new thought
    createThought({ body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate({ _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true });
        })
        .then(ThoughtsDbData => {
            if (!ThoughtsDbData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(ThoughtsDbData);
        })
        .catch(err => res.json(err));
    },
    // method to update thought by id
    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(ThoughtsDbData => {
            if (!ThoughtsDbData) {
                res.status(404).json({ message: 'No Thought found with this id' });
                return;
            }
            res.json(ThoughtsDbData);
        })
        .catch(err => res.json(err));
    },

    // method to delete thought by id
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(ThoughtsDbData => res.json(ThoughtsDbData)
        )
        .catch(err => res.json(err));
    },
    // method to create a new reaction
    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true})
            .populate({ path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(ThoughtsDbData => {
                if (!ThoughtsDbData) {
                    res.status(404).json({ message: 'No Thoughts found with this id'})
                    return;
                }
                res.json(ThoughtsDbData);
            })
            .catch(err => res.status(400).json(err))
    },
    // method to delete reaction by id
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true })
            .then(ThoughtsDbData => {
                if (!ThoughtsDbData) {
                res.status(404).json({ message: 'No Thoughts found with this id'})
                return;
            }
            res.json(ThoughtsDbData);
    })
    .catch(err => res.status(400).json(err));
}

}