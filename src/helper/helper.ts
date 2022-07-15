import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export function validate(id: string) {
  let valid = false;
  try {
    if (id === String(new mongoose.Types.ObjectId(id))) {
      valid = true;
    }
  } catch (e) {
    valid = false
  }
  return valid;
}
