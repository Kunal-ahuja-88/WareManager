import mongoose , {Schema} from "mongoose"
import bcrypt from "bcryptjs"
const userSchema =  new Schema({
      name : {
        type:String,
        required:[true,"Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
      password : {
        type:String,
        required:[true,"Please add a passowrd"],
        minLength:[6,"Password must be upto 6 characters"],
        maxLength:[25,"Password must not be more than 25 characters"]
      },
      photo : {
        type:String,
        required:[true,"Please add a photo"],
        default:"https://img.lovepik.com/free-png/20210922/lovepik-sea-png-image_401115632_wh1200.png"
      },
      phone : {
        type:String,
        default:"+234"
      },

      bio : {
        type:String,
        maxLength:[250,"Bio must not be more than 250 characters"],
        default:"bio"
      }


},{timestamps:true})

// Encrypting password before saving to db

userSchema.pre("save",async function(next) {
  if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema);