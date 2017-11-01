// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Deliveries } from '../deliveries.js';

Meteor.publish('deliveries.driver', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Deliveries.find({
    driver: Meteor.user().username,
    completed: false
  });
});

Meteor.publish('deliveries.all', function () {
  if (!this.userId || !(Meteor.user().username === 'dispatcher')) {
    // Should display error page
    return this.ready();
  }
  return Deliveries.find({});
});

Meteor.publish('deliveries.today', function () {
  if (!this.userId || !(Meteor.user().username === 'dispatcher')) {
    // Should display error page
    return this.ready();
  }
  const d = new Date().toDateString();
  return Deliveries.find( { date: { $eq: d } } );
});