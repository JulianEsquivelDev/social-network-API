// import from mongoose library
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
// schema for reactions
const ReactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // function will be executed if no value is provided
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    
},
    {
        // using the 'toJSON' Schema option to transform objects after querying
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set id value to false to prevent virtuals from replicating _id as 'id'
        id: false
    }
);
// schema for thoughts
const ThoughtsSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        // min and max char length for thought string
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    // use the reactions schema to confirm the date
    reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    

});
// get total count of reactions 
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Use the thoughts schema to create the model for thoughts
const Thoughts = model('Thoughts', ThoughtsSchema);

model.exports = Thoughts;


