import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Deliveries } from './deliveries.js';

Meteor.methods({
  'assign-delivery'({ delivery }) {
    Deliveries.insert(delivery);
  },
  'start-delivery'({ deliveryId }) {
    Deliveries.update({ _id: deliveryId }, {
      $set: { started: true }
    });
  },
  'complete-delivery'({ deliveryId }) {
    Deliveries.update({ _id: deliveryId }, {
      $set: { completed: true }
    });
  },
});