const { Sequelize } = require("sequelize");

// // Option 1: Passing a connection URI
// const sequelize1 = new Sequelize('sqlite::memory:'); // Example for sqlite
// const sequelize2 = new Sequelize('postgres://user:pass@example.com:5432/dbname'); // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize3 = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("testdb", "user1", "pass123", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  logging: false,
});
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
