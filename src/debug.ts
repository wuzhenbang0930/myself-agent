import { config } from "dotenv";
config();

import { initChatModel } from "langchain";
import { createDeepAgent } from "deepagents";

/**
 * 简化测试 - 无工具
 */
async function main() {
  console.log("🧪 开始测试（无工具）...\n");

  console.log("1. 初始化模型...");
  const model = await initChatModel("qwen-plus", {
    modelProvider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  console.log("✅ 模型初始化成功\n");

  console.log("2. 创建 Agent（无工具）...");
  const agent = createDeepAgent({
    model,
    systemPrompt: "你是一个有帮助的助手。",
  });
  console.log("✅ Agent 创建成功\n");

  console.log("3. 发送测试消息...");
  console.log("   等待响应...\n");

  try {
    const result = await agent.invoke({
      messages: [{ role: "user", content: "你好" }],
    });

    console.log("✅ 响应成功！\n");
    console.log("=" .repeat(50));
    console.log(result.messages[result.messages.length - 1].content);
    console.log("=" .repeat(50));

  } catch (error: any) {
    console.log("❌ 请求失败！");
    console.error("错误:", error.message || error);
    process.exit(1);
  }
}

main();