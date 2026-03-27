import * as readline from "readline";
import { createAgent } from "./agents";
import { Listr } from "listr2";

// 禁用 LangChain 详细日志，只显示关键信息
process.env.LANGCHAIN_TRACING_V2 = "false";
process.env.LANGCHAIN_VERBOSE = "false";

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
		console.log("🔧 工具: 天气查询、计算器、执行系统命令行");
		console.log("\n💡 输入消息开始对话，输入 'exit' 或 'quit' 退出");
		console.log("💡 输入 'clear' 清空对话历史");
		console.log("=".repeat(60) + "\n");

		// 创建 readline 接口
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: "> ",
		});

		// 对话历史
		const conversationHistory: Array<{ role: string; content: string }> =
			[];

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
				conversationHistory.push({
					role: "user",
					content: trimmedInput,
				});

				// 显示思考中
				process.stdout.write("🤖 思考中...\r");

				try {
					// 调用智能体
					const result = await (agent as any).invoke({
						messages: conversationHistory,
					});

					// 清除思考中
					process.stdout.write("\r" + " ".repeat(20) + "\r");

					// 检查是否有工具调用
					const aiMessages = result.messages.filter(
						(msg: any) =>
							msg.tool_calls && msg.tool_calls.length > 0,
					);

					if (aiMessages.length > 0) {
						// 使用 listr2 创建任务列表
						const tasks = new Listr<any>(
							aiMessages.flatMap((msg: any) =>
								msg.tool_calls.map((call: any) => {
									let title = "";
									let task = async () => {
										return "完成";
									};

									if (
										call.name === "execute_command" &&
										call.args &&
										call.args.command
									) {
										title = `$ ${call.args.command}`;
									} else if (
										call.name === "get_weather" &&
										call.args &&
										call.args.city
									) {
										title = `🌤️ 查询天气: ${call.args.city}`;
									} else if (
										call.name === "calculator" &&
										call.args &&
										call.args.expression
									) {
										title = `🔢 计算: ${call.args.expression}`;
									} else {
										title = `🔧 调用工具: ${call.name}`;
									}

									return {
										title,
										task,
									};
								}),
							),
							{
								concurrent: true,
								exitOnError: false,
							},
						);

						await tasks.run();
					}

					// 获取助手回复
					const lastMessage =
						result.messages[result.messages.length - 1];
					const content =
						typeof lastMessage.content === "string"
							? lastMessage.content
							: JSON.stringify(lastMessage.content);

					// 添加助手消息到历史
					conversationHistory.push({ role: "assistant", content });

					// 显示回复
					console.log(`\n🤖 ${content}\n`);
				} catch (error: any) {
					// 清除思考中并显示错误
					process.stdout.write("\r" + " ".repeat(20) + "\r");
					throw error;
				}
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
