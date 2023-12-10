import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'usuario' 
  }, // Declaramos usuario por defecto
});

const User = mongoose.model('User', userSchema);
export default User;
