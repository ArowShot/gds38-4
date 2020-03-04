var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('games', GameSchema);

