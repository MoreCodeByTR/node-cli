#!/usr/bin/env node

import inquirer from 'inquirer';

console.log('🚀 欢迎使用 Inquirer Demo!\n');

async function runDemo() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入你的名字:',
        default: '张三',
        validate: (input) => {
          if (input.trim().length === 0) {
            return '名字不能为空！';
          }
          return true;
        }
      },
      {
        type: 'number',
        name: 'age',
        message: '请输入你的年龄:',
        default: 18,
        validate: (input) => {
          if (input < 0 || input > 150) {
            return '请输入有效的年龄（0-150）';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'gender',
        message: '请选择你的性别:',
        choices: ['男', '女', '其他'],
        default: '男'
      },
      {
        type: 'checkbox',
        name: 'hobbies',
        message: '请选择你的爱好（可多选）:',
        choices: [
          { name: '🎮 玩游戏', value: 'gaming' },
          { name: '📚 阅读', value: 'reading' },
          { name: '🎵 音乐', value: 'music' },
          { name: '⚽ 运动', value: 'sports' },
          { name: '🎨 绘画', value: 'art' },
          { name: '💻 编程', value: 'coding' }
        ],
        validate: (choices) => {
          if (choices.length === 0) {
            return '至少选择一个爱好！';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'hasExperience',
        message: '你有编程经验吗？',
        default: false
      },
      {
        type: 'list',
        name: 'experience',
        message: '请选择你的编程经验年限:',
        choices: ['< 1年', '1-3年', '3-5年', '5年以上'],
        when: (answers) => answers.hasExperience === true
      },
      {
        type: 'password',
        name: 'password',
        message: '请输入一个密码（用于演示）:',
        mask: '*',
        validate: (input) => {
          if (input.length < 6) {
            return '密码至少需要6个字符！';
          }
          return true;
        }
      },
      {
        type: 'editor',
        name: 'bio',
        message: '请输入你的个人简介（将打开编辑器）:',
        default: '在这里写下你的简介...',
        validate: (input) => {
          if (input.trim().length < 10) {
            return '简介至少需要10个字符！';
          }
          return true;
        }
      },
      {
        type: 'rawlist',
        name: 'color',
        message: '选择你最喜欢的颜色（数字选择）:',
        choices: ['红色', '蓝色', '绿色', '黄色', '紫色']
      },
      {
        type: 'expand',
        name: 'conflict',
        message: '发现文件冲突，你想如何处理？',
        choices: [
          { key: 'y', name: '覆盖', value: 'overwrite' },
          { key: 'a', name: '全部覆盖', value: 'overwrite_all' },
          { key: 'd', name: '显示差异', value: 'show_diff' },
          { key: 'x', name: '中止', value: 'abort' }
        ],
        default: 3
      }
    ]);

    console.log('\n✨ 感谢你的回答！以下是汇总信息:\n');
    console.log('═══════════════════════════════════════');
    console.log(`👤 姓名: ${answers.name}`);
    console.log(`🎂 年龄: ${answers.age}`);
    console.log(`⚧ 性别: ${answers.gender}`);
    console.log(`🎯 爱好: ${answers.hobbies.join(', ')}`);
    console.log(`💼 有编程经验: ${answers.hasExperience ? '是' : '否'}`);
    if (answers.experience) {
      console.log(`📊 经验年限: ${answers.experience}`);
    }
    console.log(`🔒 密码长度: ${answers.password.length} 个字符`);
    console.log(`📝 个人简介: ${answers.bio.substring(0, 50)}...`);
    console.log(`🎨 喜欢的颜色: ${answers.color}`);
    console.log(`⚙️  冲突处理方式: ${answers.conflict}`);
    console.log('═══════════════════════════════════════');

    // 询问是否再次运行
    const { again } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: '是否再次运行 demo？',
        default: false
      }
    ]);

    if (again) {
      console.log('\n');
      await runDemo();
    } else {
      console.log('\n👋 再见！');
    }
  } catch (error) {
    if (error.isTtyError) {
      console.error('❌ 当前环境不支持交互式命令行');
    } else {
      console.error('❌ 发生错误:', error.message);
    }
  }
}

// 运行 demo
runDemo();

