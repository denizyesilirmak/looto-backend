import jsonwebtoken from 'jsonwebtoken';
import { Types } from 'mongoose';

type DataType = {
  email: string;
  id: Types.ObjectId;
};

export const generateToken = (data: DataType) => {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET!, {
    expiresIn: '180d',
  });
};
