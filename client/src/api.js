import axios from "axios";

export default {
  fetchCustomers: async (page) => {
    return await axios.get(`/customers?page=${page}`);
  },
  fetchAnalytics: async () => {
    return await axios.get("/analytics");
  },
};
