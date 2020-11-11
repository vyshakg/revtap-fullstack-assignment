const customers = require('./customers/customers.service.js');
const orders = require('./orders/orders.service.js');
const analytics = require('./analytics/analytics.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customers);
  app.configure(orders);
  app.configure(analytics);
};
