import ora from 'ora';
import chalk from 'chalk';

const spinner = ora({
  text: "链接网络中"
}).start(); // 开始状态 => 加载状态

setTimeout(() => {
  spinner.color = "yellow";
  spinner.text = "网速有点慢";
}, 1000); // 还是 加载状态, 更新文案和颜色

setTimeout(() => {
  console.log(chalk.blue.bold('\n\n青藤之恋，让天下有情人终成眷属！\n'));
  console.log(process.env.npm_lifecycle_event);
  spinner.succeed("下载成功"); // 加载状态 => 成功状态
}, 2000);
