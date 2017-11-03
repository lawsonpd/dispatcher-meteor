import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Deliveries templates
import '../../ui/pages/dispatch/dispatch.js';
import '../../ui/pages/dispatch/deliveries_today.js';
import '../../ui/pages/dispatch/deliveries_all.js';
import '../../ui/pages/driver/driver.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

FlowRouter.route('/driver', {
  name: 'Deliveries.Driver',
  action() {
    BlazeLayout.render('App_body', { main: 'Deliveries_driver' });
  },
});

FlowRouter.route('/dispatch', {
  name: 'Deliveries.Dispatch',
  action() {
    BlazeLayout.render('App_body', { main: 'Deliveries_dispatch' });
  },
});

FlowRouter.route('/deliveries/today', {
  name: 'Deliveries.Today',
  action() {
    BlazeLayout.render('App_body', { main: 'Deliveries_today' });
  }
});

FlowRouter.route('/deliveries', {
  name: 'Deliveries.All',
  action() {
    BlazeLayout.render('App_body', { main: 'Deliveries_all' });
  }
});
