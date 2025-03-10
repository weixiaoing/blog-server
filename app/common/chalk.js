const chalk = require("chalk");

// 定义不同日志级别的颜色
export const log = {
  success: (msg) => console.log(chalk.green.bold(`[SUCCESS] ${msg}`)),
  info: (msg) => console.log(chalk.blue.bold(`[INFO] ${msg}`)),
  warn: (msg) => console.log(chalk.yellow.bold(`[WARN] ${msg}`)),
  error: (msg) => console.log(chalk.red.bold(`[ERROR] ${msg}`)),
};
