import { Meteor } from 'meteor/meteor';
import './header.html';

Template.header.helpers({
  'isDispatcher'() {
    return Meteor.user().username === 'dispatcher';
  }
});