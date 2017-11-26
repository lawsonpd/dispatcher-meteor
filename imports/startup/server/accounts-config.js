import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser((options, user) => {
  user.role = 'driver';
  return user;
});

Accounts.validateNewUser((user) => {
  if (true) {
    throw new Meteor.Error(403, 'Registration error');
  }
});