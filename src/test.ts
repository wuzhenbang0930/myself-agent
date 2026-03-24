import { createAgent } from "./agents";

/**
 * 简单测试脚本
 */
async function test() {
  console.log("🧪 测试 Deep Agent\n");

  try {
    const agent = createAgent();
    console.log("✅ 智能体创建成功\n");

    console.log("测试 1: 简单对话");
    const result1 = await agent.invoke({
      messages: [{ role: "user", content: "你好" }],
    });
    console.log("✅ 通过\n");

    console.log("测试 2: 天气查询");
    const result2 = await agent.invoke({
      messages: [{ role: "user", content: "北京天气怎么样" }],
    });
    console.log("✅ 通过\n");

    console.log("测试 3: 计算器");
    const result3 = await agent.invoke({
      messages: [{ role: "user", content: "计算 123 + 456" }],
    });
    console.log("✅ 通过\n");

    console.log("🎉 所有测试通过！");
    
  } catch (error) {
    console.error("❌ 测试失败:", error);
    process.exit(1);
  }
}

test();