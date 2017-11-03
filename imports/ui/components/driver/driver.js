import { Meteor } from 'meteor/meteor';
import { Deliveries } from '/imports/api/deliveries/deliveries.js';
import './driver.html';
import './driver-deliveries.html';

Template.driver.onCreated(function () {
  this.autorun(() => {
    this.subscribe('deliveries.driver');
  });
});

Template.driver.helpers({
  deliveries() {
    d = new Date().toDateString();
    return Deliveries.find({
      date: { $eq: d }
    }).fetch();
  },
});

Template.driverDeliveries.events({
  'submit .completeDelivery'(event, instance) {
    event.preventDefault();

    // console.log(instance.data._id);

    const deliveryId = instance.data._id;

    Meteor.call('complete-delivery', {
      deliveryId: deliveryId
    }, (err, res) => {
      if (err) {
        alert(err);
      }
    });
  },
  'submit .startDelivery'(event, instance) {
    event.preventDefault();

    // console.log(instance.data._id);

    const deliveryId = instance.data._id;

    Meteor.call('start-delivery', {
      deliveryId: deliveryId
    }, (err, res) => {
      if (err) {
        alert(err);
      }
    });
  },
});