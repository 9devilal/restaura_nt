const mongoose=require('mongoose');
const schema=mongoose.Schema;

var studentinfo=new schema({
	firstname:{type:String,required:true},
	lastname:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	password:{type:Number,required:true},
	mobile :{type:Number,required:true},
	admin:{type:Boolean,default:false},
	image:{type:String}
	
});

studentinfo.set('timestamps',true);
const info= mongoose.model('info',studentinfo);
module.exports=info;