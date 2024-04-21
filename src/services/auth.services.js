import User from '../model/schema/user.schema.js';
import { ErrorWithStatus } from '../Exception/error-with-status.exception.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (email, first_name, last_name, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorWithStatus('User already registered', 400);
  }

  //password
  password = await bcrypt.hash(password, 10);

  //create User
  const newUser = new User({
    email,
    first_name,
    last_name,
    password,
  });
  await newUser.save();
  return {
    message: 'User created successfully',
    data: {
      id: newUser._id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      updateAt: newUser.updatedAt,
      createAt: newUser.createdAt,
    },
  };
};
