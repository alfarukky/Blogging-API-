import mongoose from 'mongoose';
export const connect = async (MONGO_URI) => {
  if (MONGO_URI) {
    return await mongoose.connect(MONGO_URI);
  } else {
    return null;
  }
};
