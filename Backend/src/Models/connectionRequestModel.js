const mongoose = require("mongoose")
const connectionRequestScheme = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'

    },
    status:{
        type:String,
        enum :{
            values:['interested','ignored','accepted','rejected'],
            message:`{value} is invalid Status type`
        }
    }
}, {
    timestamps:true
})
connectionRequestScheme.index({fromUserId:1, toUserId:1})
// connectionRequestScheme.pre("save", function(next){
//     if(this.fromUserId.equals(this.toUserId)){
//         throw new Error("You can not send connection to your self")
//     }
//     next();
// })
const ConnectionSchemeModel = mongoose.model("connectionRequest",connectionRequestScheme)
module.exports = ConnectionSchemeModel;