import mongoose from 'mongoose';

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
