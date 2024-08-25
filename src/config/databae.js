const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING).then((conn) => {
    console.log(`Database Connected : ${conn.connection.host}`);
  });
};

module.exports = dbConnection;
