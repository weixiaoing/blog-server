import chalk from "chalk";

// 定义不同日志级别的颜色
const log = {
  success: (msg: string) => console.log(chalk.green.bold(`[SUCCESS] ${msg}`)),
  info: (msg: string) => console.log(chalk.blue.bold(`[INFO] ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow.bold(`[WARN] ${msg}`)),
  error: (msg: string) => console.log(chalk.red.bold(`[ERROR] ${msg}`)),
};

export default log
