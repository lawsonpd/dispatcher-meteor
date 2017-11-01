import { Meteor } from 'meteor/meteor';
import { Deliveries } from '/imports/api/deliveries/deliveries.js';
import './deliveries_today.html';

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

Template.deliveries_today.events({
  'submit .confirmAvailability'(event, instance) {
    const phoneNumber = instance.data.phoneNumber;
    const address = instance.data.address;
    Meteor.call('confirm-availability', {
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
})