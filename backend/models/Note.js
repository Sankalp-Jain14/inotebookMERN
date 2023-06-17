const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  //to let the uer access only his notes, you have to associate notes with the user
        ref:'user'
    },
    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes' , NotesSchema)