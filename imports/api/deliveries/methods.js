import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Deliveries } from './deliveries.js';

var twilioSid = 'ACccbc0970e6b5b4bc789062b6cd6c988b';
var twilioAuthToken = '67c5c73297d2b5854ce51da8b0ff1723';
var twilio = require('twilio');
var twilio_client = new twilio(twilioSid, twilioAuthToken);

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
  'confirm-availability'({ deliveryId, phoneNumber, address }) {
    twilio_client.messages.create({
      to: "+1" + phoneNumber,
      from: "+16157249953",
      body: `Hi, this is Jake's Bakes! We have a gift delivery for you! We've been instructed to deliver it to ${address}. Will you be able to accept the order there in about an hour? Reply 'Yes' or 'No' and we'll give you a call if we have any other questions!`,
    });
    Deliveries.update({ _id: deliveryId }, {
      $set: { availabilityPending: true }
    });
  }
});