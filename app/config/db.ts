import log from "@/common/chalk";
import mongoose from "mongoose";
import env from "./env";

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    log.success("MonggoDB 连接成功");
  })
  .catch((err) => {
    log.error(err);
  });

export default mongoose;
