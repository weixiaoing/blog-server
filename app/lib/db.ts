import log from "@/common/chalk";
import mongoose from "mongoose";
import env from "./env";
import { Db } from "mongodb";

const db = await mongoose
  .connect(env.MONGO_URI)
  .then((res) => {
    log.success("MonggoDB 连接成功");
    return res.connection.db;
  })
  .catch((err) => {
    throw err;
  });





export { db }

export default mongoose;
