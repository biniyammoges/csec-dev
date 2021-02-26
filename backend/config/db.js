const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Database connected : ${con.connection.host}`.yellow.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectMongo;
