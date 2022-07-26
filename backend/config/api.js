require("dotenv").config();

const {
  NODE_ENV
} = process.env;

const env = NODE_ENV || "development";

const defaultConfig = {
  pageItemCount: 20,
  allowedAmounts: [5, 10, 20, 50, 100]
};


module.exports = {
  [env]: defaultConfig
};
