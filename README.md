# revtap-fullstack-assignment
App is hosted in Heroku using docker container : https://revtap.herokuapp.com/

TECH stack used : 
- node
- feathersjs
- mongodb
- react

```
GET /customers :  returns customers with aggregation of their orders
POST /customers with body : will create a customers
same for /orders
---
/analytics : returns aggregated data on orders collection to find total orders count and total order price for each day of orders.
```
You can try a it by using 
```
GET https://revtap.herokuapp.com/customers | for pagination user https://revtap.herokuapp.com/customers?page=1
GET https://revtap.herokuapp.com/orders
GET https://revtap.herokuapp.com/analytics
```
imported some data to momgodb using 'db.json' accourding to the schema
