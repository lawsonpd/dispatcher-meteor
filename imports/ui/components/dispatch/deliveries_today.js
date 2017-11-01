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