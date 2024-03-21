const mongoose=require('mongoose');


const Educator_info=new mongoose.Schema({
    Fname: {
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    BusinessName: {
        type: String,
        required: true,
    }
   

});

exports.Educator_info = mongoose.model('Educator_info', Educator_info);