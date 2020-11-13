import { Table } from "antd";
import { useEffect, useState } from "react";
import API from "../api";
import moment from "moment";

function MainLayout() {
  const [customers, setCustomers] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    return (async () => {
      const response = await API.fetchCustomers(page);
      setCustomers(response.data);
    })();
  }, [page]);

  const expandedRowRender = (record, index, indent, expanded) => {
    const columns = [
      { title: "Date", dataIndex: "createdAt", key: "createdAt" },
      { title: "Product Name", dataIndex: "product", key: "product" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const data = [];
    if (customers) {
      let orders = customers.data[index].orders;
      orders = orders ? orders : [];
      for (let i = 0; i < orders.length; ++i) {
        data.push({
          key: orders[i]._id,
          createdAt: moment(orders[i].createdAt).format("ll"),
          product: orders[i].product,
          price: orders[i].price,
          quantity: orders[i].quantity,
        });
      }
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        title={() => "Orders"}
      />
    );
  };

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const data = [];
  let total = 1;
  if (customers) {
    let len = customers.data ? customers.data.length : 0;
    total = customers.total;
    for (let i = 0; i < len; ++i) {
      data.push({
        key: customers.data[i]._id,
        firstName: customers.data[i].firstName,
        lastName: customers.data[i].lastName,
        email: customers.data[i].email,
      });
    }
  }

  const onPageChange = (page) => {
    setPage(page);
  };

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      pagination={{
        defaultCurrent: 1,
        total,
        onChange: onPageChange,
        position: ["bottomCenter"],
      }}
      expandable={{ expandedRowRender }}
      dataSource={data}
      title={() => "Customers"}
    />
  );
}

export default MainLayout;
