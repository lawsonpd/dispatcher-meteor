// import { Deliveries } from '/imports/api/deliveries/deliveries.js';
import { Meteor } from 'meteor/meteor';
import './dispatch.html';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.dispatch.helpers({
  'isDispatcher'() {
    return Meteor.user().username === 'dispatcher';
  }
})

Template.dispatch.events({
  'submit .Deliveries_dispatchDelivery'(event, instance) {
    event.preventDefault();

    const d = new Date().toDateString();

    const data = {
      driver: event.target.driver.value,
      address: event.target.address.value,
      recipientName: event.target.name.value,
      recipientPhone: event.target.phone.value,
      specialInstructions: event.target.instructions.value,
      date: d
    };

    Meteor.call('assign-delivery', {
      delivery: data
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        FlowRouter.go('Deliveries.Today');
      }
    });
  }
});