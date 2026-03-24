import * as readline from "readline";
import { createAgent } from "./agents";

/**
 * 交互式开发服务器
 */
async function startInteractiveServer() {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 Deep Agents 交互式开发服务器");
  console.log("=".repeat(60));

  try {
    // 创建智能体（异步）
    const agent = await createAgent();
    console.log("\n✅ 智能体已就绪");
    console.log("📌 模型: qwen-plus (阿里云 DashScope)");
    console.log("🔧 工具: 天气查询、计算器");
    console.log("\n💡 输入消息开始对话，输入 'exit' 或 'quit' 退出");
    console.log("💡 输入 'clear' 清空对话历史");
    console.log("=".repeat(60) + "\n");

    // 创建 readline 接口
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "👤 你: ",
    });

    // 对话历史
    const conversationHistory: Array<{ role: string; content: string }> = [];

    rl.prompt();

    rl.on("line", async (input) => {
      const trimmedInput = input.trim();

      // 处理命令
      if (trimmedInput === "exit" || trimmedInput === "quit") {
        console.log("\n👋 再见！");
        rl.close();
        process.exit(0);
      }

      if (trimmedInput === "clear") {
        conversationHistory.length = 0;
        console.log("✅ 对话历史已清空\n");
        rl.prompt();
        return;
      }

      if (!trimmedInput) {
        rl.prompt();
        return;
      }

      try {
        // 添加用户消息到历史
        conversationHistory.push({ role: "user", content: trimmedInput });

        console.log("🤖 思考中...\r");

        // 调用智能体
        const result = await agent.invoke({
          messages: conversationHistory,
        });

        // 获取助手回复
        const lastMessage = result.messages[result.messages.length - 1];
        const content = typeof lastMessage.content === "string"
          ? lastMessage.content
          : JSON.stringify(lastMessage.content);

        // 添加助手消息到历史
        conversationHistory.push({ role: "assistant", content });

        // 显示回复
        console.log(`🤖 助手: ${content}\n`);
        
      } catch (error: any) {
        console.error(`\n❌ 错误: ${error.message || error}\n`);
      }

      rl.prompt();
    });

    rl.on("close", () => {
      process.exit(0);
    });

  } catch (error: any) {
    console.error("\n❌ 启动失败:", error.message || error);
    console.error("\n请检查:");
    console.error("1. .env 文件中的 API Key 是否正确");
    console.error("2. 网络连接是否正常");
    process.exit(1);
  }
}

// 启动服务器
startInteractiveServer();