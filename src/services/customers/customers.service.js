// Initializes the `customers` service on path `/customers`
const { Customers } = require("./customers.class");
const createModel = require("../../models/customers.model");
const hooks = require("./customers.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/customers", new Customers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("customers");

  service.hooks(hooks);

  app.service("customers").hooks({
    before: {
      async find(context) {
        const limit = 10;
        let page = parseInt(context.params.query.page, 10);
        if (page === undefined || page === null || isNaN(page)) {
          page = 1;
        }

        let skip = (page - 1) * limit;

        const total = await service.Model.count({});

        if (skip >= total) {
          page = page % Math.floor(total / limit);
          skip = page * limit;
        }

        const results = await service.Model.aggregate([
          {
            $lookup: {
              from: "orders",
              localField: "_id",
              foreignField: "customer",
              as: "orders",
            },
          },
          { $skip: skip },
          { $limit: limit },
        ]);

        // console.log(results);
        context.result = {
          total,
          limit,
          skip,
          data: results,
        };
        // Do something with results

        return context;
      },
    },
  });
};
