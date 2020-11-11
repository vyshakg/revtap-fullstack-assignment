// Initializes the `analytics` service on path `/analytics`
const { Analytics } = require("./analytics.class");
const hooks = require("./analytics.hooks");

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/analytics", new Analytics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("analytics");

  service.hooks(hooks);

  app.service("analytics").hooks({
    before: {
      async find(context) {
        const orderDbo = app.service("orders");
        const results = await orderDbo.Model.aggregate([
          {
            $group: {
              _id: { $dayOfMonth: "$createdAt" },
              ordersCount: { $sum: 1 },
              totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
            },
          },
          {
            $project: {
              _id: 0,
              day: "$_id",
              ordersCount: 1,
              totalPrice: 1,
            },
          },
          { $sort: { day: 1 } },
        ]);

        context.result = results;
        return context;
      },
    },
  });
};
