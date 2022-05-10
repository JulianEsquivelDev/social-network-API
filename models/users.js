// import from mongoose library
const { Schema, model } = require('mongoose');
const moment = require('moment');
const { Users } = require('.');
// new schema for Users
const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    toJSON: {
        virtuals: true
    },
    id: false
});
// get the total count of friends
UsersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
// // Use the users schema to create the model for users
const Users = model('Users', UsersSchema);
// export the module 'Users'
model.exports = Users;