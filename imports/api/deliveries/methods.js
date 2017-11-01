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
  'confirm-availability'({ phoneNumber, address }) {
    twilio_client.messages.create({
      to: "+1" + phoneNumber,
      from: "+16157249953",
      body: `Hi, this is Jake's Bakes! We have a gift delivery for you! We've been instructed to deliver it to ${address}. Will you be able to accept the order there in about an hour? Reply 'Yes' or 'No' and we'll give you a call if we have any other questions!`,
    });
  }
});