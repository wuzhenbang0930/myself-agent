# MYSELF AI AGENT

> 基于 **LangChain Deep Agents SDK** 的智能助手

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![LangChain](https://img.shields.io/badge/LangChain-1.0+-FF6B6B?style=for-the-badge&logo=chainlink&logoColor=white)]()
[![Deep Agents](https://img.shields.io/badge/Deep%20Agents-1.8+-00D9FF?style=for-the-badge&logo=robot&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

---

## 🎯 项目简介

Myself Agent 是一个基于 **LangChain Deep Agents SDK** 构建的智能助手项目，集成了任务规划、文件管理、子智能体生成等核心能力。

### ✨ 核心特性

| 特性 | 说明 |
|-----|------|
| 🤖 **Deep Agents SDK** | LangChain 官方智能体框架 |
| 🔧 **工具系统** | 可扩展的工具集 |
| 📋 **规则引擎** | 自定义业务规则 |
| 🔄 **热更新** | 开发体验友好 |
| 🌐 **多模型支持** | OpenAI / DashScope / Anthropic |

---

## 🛠️ 技术选型

### 核心框架

| 技术 | 版本 | 说明 |
|-----|------|------|
| `deepagents` | ^1.8.5 | 智能体框架 |
| `langchain` | ^1.2.36 | 核心库 |
| `@langchain/core` | ^1.1.35 | 核心抽象 |
| `@langchain/openai` | ^1.3.0 | OpenAI 兼容接口 |

### 开发工具

| 技术 | 版本 | 说明 |
|-----|------|------|
| `typescript` | ^6.0.2 | 类型安全 |
| `ts-node` | ^10.9.2 | 直接运行 TS |
| `nodemon` | ^3.1.14 | 热更新 |

### 工具库

| 技术 | 版本 | 说明 |
|-----|------|------|
| `zod` | ^4.3.6 | Schema 验证 |
| `dotenv` | ^17.3.1 | 环境变量 |

---

## 📁 项目结构

```
myself-agent/
├── src/
│   ├── config/         # 配置管理
│   ├── tools/         # 工具定义
│   ├── agents/        # 智能体
│   └── extensions/     # 扩展功能
├── .env               # 环境变量
├── nodemon.json       # 热更新配置
└── tsconfig.json      # TS 配置
```

---

## 🚀 开发步骤

### 1️⃣ 环境准备

```bash
# 克隆项目
git clone <repository-url>
cd myself-agent

# 安装依赖
npm install
```

### 2️⃣ 配置环境变量

```bash
# 复制示例配置
cp .env.example .env

# 编辑 .env
vim .env
```

```bash
# 阿里云 DashScope 配置
OPENAI_API_KEY=your_api_key_here
OPENAI_API_BASE=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-plus
```

### 3️⃣ 启动开发

```bash
# 开发模式（热更新）
npm run dev

# 简单运行
npm run dev:simple

# 编译
npm run build

# 生产模式
npm start
```

---

## 📖 使用说明

### 交互命令

| 命令 | 说明 |
|-----|------|
| `exit` / `quit` | 退出程序 |
| `clear` | 清空对话历史 |

### 可用模型

| 模型 | 速度 | 推荐场景 |
|-----|------|---------|
| `qwen-turbo` | ⚡ 快速 | 测试/开发 |
| `qwen-plus` | 💨 标准 | 日常使用 ⭐ |
| `qwen-max` | 💪 高性能 | 复杂任务 |

---

## 🏷️ NPM Keywords

```json
{
  "keywords": [
    "langchain",
    "deep-agents",
    "ai-agent",
    "openai",
    "dashscope",
    "llm",
    "typescript",
    "chatbot",
    "autonomous-agent",
    "artificial-intelligence",
    "nodejs"
  ]
}
```

---

## 🔧 扩展开发

### 添加新工具

```typescript
// src/tools/index.ts
import { tool } from "langchain";
import * as z from "zod";

export const myTool = tool(
  ({ param }) => result,
  {
    name: "my_tool",
    description: "工具描述",
    schema: z.object({
      param: z.string().describe("参数"),
    }),
  }
);
```

### 自定义规则

```typescript
// src/extensions/rules.ts
export const customRules: Rule[] = [
  {
    id: "rule-1",
    name: "自定义规则",
    condition: "触发词",
    action: "执行动作",
    priority: 8,
    enabled: true,
  },
];
```

---

## 📚 相关资源

| 资源 | 链接 |
|-----|------|
| 📘 Deep Agents 文档 | [官方文档](https://docs.langchain.com/deepagents) |
| 📗 LangChain 文档 | [官方文档](https://docs.langchain.com) |
| 📙 DashScope 控制台 | [阿里云控制台](https://dashscope.console.aliyun.com/) |

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wuzhenbang0930/myself-agent&type=Timeline)](https://star-history.com/#wuzhenbang0930/myself-agent&Timeline)

**License:** MIT © 2024

**Made with ❤️ using LangChain Deep Agents SDK**