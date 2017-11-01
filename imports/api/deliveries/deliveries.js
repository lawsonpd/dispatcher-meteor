import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { attachSchema } from 'meteor/aldeed:collection2';

export const Deliveries = new Mongo.Collection('deliveries');

Deliveries.schema = new SimpleSchema({
  driver: {type: String},
  date: {type: String},
  recipientName: {type: String},
  address: {type: String},
  recipientPhone: {type: String},
  specialInstructions: {type: String, optional: true},
  availabilityCheckSent: {type: Boolean, defaultValue: false},
  recipientAvailable: {type: Boolean, optional: true},
  started: {type: Boolean, defaultValue: false},
  completed: {type: Boolean, defaultValue: false}
});

Deliveries.attachSchema(Deliveries.schema);

Deliveries.helpers({
  editableBy(userId) {
    if (!this.userId) {
      return false;
    }
    return this.userId === userId;
  }
});