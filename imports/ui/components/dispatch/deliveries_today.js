import { Meteor } from 'meteor/meteor';
import { Deliveries } from '/imports/api/deliveries/deliveries.js';
import { Template } from 'meteor/templating';
import './deliveries_today.html';
import './delivery_today.html';

Template.deliveries_today.onCreated(function () {
  this.autorun(() => {
    this.subscribe('deliveries.today');
  });
});

Template.deliveries_today.helpers({
  isDispatcher() {
    return Meteor.user().username === 'dispatcher';
  },
  deliveries() {
    return Deliveries.find();
  },
});

Template.delivery_today.events({
  'submit .confirmAvailability'(event, instance) {
    event.preventDefault();

    // console.log(this._id);

    const deliveryId = this._id;
    const phoneNumber = this.recipientPhone;
    const address = this.address;

    Meteor.call('confirm-availability', {
      deliveryId: deliveryId,
      phoneNumber: phoneNumber,
      address: address
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        FlowRouter.go('Deliveries.Today');
      }
    });
  }
});