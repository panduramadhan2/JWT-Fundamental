import { Sequelize } from "sequelize";

const db = new Sequelize("auth_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default db;


//ini untuk keperluan testing Jest
// import { Sequelize } from "sequelize";

// const db = new Sequelize("auth_db_test", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
// });

// export default db;