import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { attachSchema } from 'meteor/aldeed:collection2';

export const Deliveries = new Mongo.Collection('deliveries');

Deliveries.schema = new SimpleSchema({
  driver: {type: String},
  date: {type: String},
  recipientName: {type: String},
  address: {type: String},
  recipientPhone: {
    type: String,
    regEx: /^[0-9]{10}$/
  },
  specialInstructions: {type: String, optional: true},
  availabilityCheckSent: {type: Boolean, defaultValue: false},
  availabilityPending: {type: Boolean, optional: true},
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