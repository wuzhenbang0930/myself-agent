# Deep Agents 项目

基于 LangChain Deep Agents SDK 的智能体项目。

## 🚀 快速开始

### 1. 配置 API Key

```bash
# 复制示例配置
cp .env.example .env

# 编辑 .env，填入你的 API Key
vim .env
```

### 2. 运行项目

```bash
# 交互式开发服务器（支持热更新）
npm run dev

# 简单运行（无热更新）
npm run dev:simple

# 运行测试
npm test

# 编译
npm run build

# 生产模式
npm start
```

## 🎮 交互式命令

运行 `npm run dev` 后：

- 输入消息与智能体对话
- `exit` 或 `quit` - 退出程序
- `clear` - 清空对话历史

## 📁 项目结构

```
langchain_agent/
├── src/
│   ├── config/           # 配置管理
│   │   └── index.ts      # API 和应用配置
│   ├── tools/            # 工具定义
│   │   └── index.ts      # 天气、计算器等工具
│   ├── agents/           # 智能体
│   │   └── index.ts      # Deep Agent 创建
│   ├── extensions/       # 扩展功能 (自定义)
│   │   ├── index.ts      # 扩展导出
│   │   └── rules.ts      # 规则系统
│   ├── main.ts           # 交互式主程序
│   ├── test.ts           # 测试脚本
│   └── index.ts          # 导出入口
├── .env                  # 环境变量 (已配置)
├── .env.example          # 环境变量示例
├── nodemon.json          # 热更新配置
├── tsconfig.json         # TypeScript 配置
└── package.json
```

## 🔧 开发功能

### ✅ 热更新
- 使用 nodemon 监听文件变化
- 自动重启服务
- 支持 TypeScript 文件监听

### ✅ 交互式对话
- 命令行交互界面
- 保持对话历史
- 支持清空历史

### ✅ 测试脚本
- 简单测试用例
- 验证智能体功能

## 📝 NPM 脚本

| 脚本 | 说明 |
|-----|------|
| `npm run dev` | 交互式开发服务器（热更新） |
| `npm run dev:simple` | 简单运行（无热更新） |
| `npm test` | 运行测试脚本 |
| `npm run build` | 编译 TypeScript |
| `npm run build:watch` | 编译并监听变化 |
| `npm start` | 生产模式运行 |

## 🎯 核心功能

### Deep Agents SDK 内置
- ✅ 任务规划 (`write_todos`)
- ✅ 文件系统工具
- ✅ 子智能体生成 (`task`)
- ✅ 长期记忆

### 自定义工具
- ✅ `get_weather` - 天气查询
- ✅ `calculator` - 数学计算

### 扩展功能
- ⚠️ 规则系统 (非内置，需手动集成)

## 🔑 环境变量

| 变量 | 说明 | 默认值 |
|-----|------|--------|
| OPENAI_API_KEY | API 密钥 | - |
| OPENAI_API_BASE | API 地址 | DashScope |
| MODEL_NAME | 模型名称 | qwen-plus |

## 📚 相关文档

- [Deep Agents 官方文档](https://docs.langchain.com/deepagents)
- [LangChain 文档](https://docs.langchain.com)
- [LangGraph 文档](https://docs.langchain.com/langgraph)