import { Logger } from '@nestjs/common';

import mongoose from 'mongoose';

export class DBFactory {
  private static readonly models = {};

  static getModel(model, schema) {
    if (!DBFactory.models[model]) {
      DBFactory.models[model] = new MongoWrapper(model, schema);
    }
    return DBFactory.models[model];
  }
}

export class MongoWrapper {
  private readonly logger: Logger;
  private readonly model;

  constructor(mod, schema) {
    this.logger = new Logger();
    this.model = mongoose.model(mod, schema);
  }

  async find(filter?) {
    this.logger.log('find', MongoWrapper.name);
    return this.model.find(filter);
  }

  async findWithSelect(filter, select) {
    this.logger.log('findWithSelect', MongoWrapper.name);
    return this.model.find().select(select);
  }
  async findOne(filter) {
    this.logger.log('findOne', MongoWrapper.name);
    return this.model.findOne(filter);
  }

  async findOneWithPopulate(filter, populateParam) {
    this.logger.log('findOneWithPopulate', MongoWrapper.name);
    return this.model.findOne(filter).populate(populateParam);
  }

  async findOneAndUpdate(filter, update, option?) {
    this.logger.log('findOneAndUpdate', MongoWrapper.name);
    return this.model.findOneAndUpdate(filter, update, option);
  }

  async updateOne(filter, update) {
    this.logger.log('updateOne', MongoWrapper.name);
    return this.model.updateOne(filter, update);
  }

  async deleteOne(filter) {
    this.logger.log('deleteOne', MongoWrapper.name);
    return this.model.deleteOne(filter);
  }

  async create(object) {
    this.logger.log('create', MongoWrapper.name);
    return this.model.create(object);
  }

  async bulkWrite(arrayForBulk) {
    this.logger.log('bulkWrite', MongoWrapper.name);
    return this.model.bulkWrite(arrayForBulk);
  }
}
