import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser((options, user) => {
  user.role = 'driver';
  return user;
});