import mongoose from 'mongoose';

export class Singl{
  name: string
  private static instance: Singl
  private constructor(name) {
    this.name = name
  }

  static getInstance(name){
    if(!Singl.instance){
      Singl.instance = new Singl(name)
    }
    return Singl.instance
  }

}

export function validate(id: string) {
  let valid = false;
  try {
    if (id === String(new mongoose.Types.ObjectId(id))) {
      valid = true;
    }
  } catch (e) {
    valid = false;
  }
  return valid;
}
