const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
    first_name:{
        type: String,
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
    },
    mobile:{
        type: Number,
    },
    delete_flag:{
        type: Boolean,
    },
    active_flag:{
        type: Boolean,
    },
    password:{
        type: String,
    },
    role:{
        type: String,
    }
    }
);

module.exports = mongoose.model('User',UserSchema)