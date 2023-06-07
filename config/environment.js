const development = {
  name: "development",
  asset_path: "./assets",
  db: process.env.ONLINE_SELLER_DEVELOPMENT_DB,
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  db: process.env.ONLINE_SELLER_PRODUCTION_DB,
};

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
module.exports = development;
