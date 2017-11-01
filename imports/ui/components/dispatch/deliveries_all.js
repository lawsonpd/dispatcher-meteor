import { Meteor } from 'meteor/meteor';
import { Deliveries } from '/imports/api/deliveries/deliveries.js';
import './deliveries_all.html';

Template.deliveries_all.onCreated(function () {
  this.autorun(() => {
    this.subscribe('deliveries.all');
  });
});

Template.deliveries_all.helpers({
  isDispatcher() {
    return Meteor.user().username === 'dispatcher';
  },
  deliveries() {
    return Deliveries.find();
  },
});