import mongoose, { Schema } from "mongoose";

const CitySchema = new Schema({
  code: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  latitude: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  longitude: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  population: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  region: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

interface ICitySchema {
  code: number;
  name: string;
  latitude: string;
  longitude: string;
  population: number;
  region: string;
}

export default mongoose.model<ICitySchema>("City", CitySchema);
