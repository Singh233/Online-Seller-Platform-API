const development = {
  name: "development",
  asset_path: "./assets",
  db: process.env.ONLINE_SELLER_DEVELOPMENT_DB,
  jwt_secret: "something",
};

const production = {
  name: "production",
  db: process.env.ONLINE_SELLER_PRODUCTION_DB,
  jwt_secret: process.env.ONLINE_SELLER_JWT_SECRET,
};

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
module.exports = production;
