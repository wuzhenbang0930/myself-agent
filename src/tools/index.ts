import * as z from "zod";
import { tool } from "langchain";
import { execSync } from "child_process";

/**
 * 示例工具：获取天气
 */
export const getWeatherTool = tool(
	({ city }: { city: string }) => {
		// 模拟天气数据
		const weatherData: Record<string, string> = {
			北京: "晴天，温度 15°C",
			上海: "多云，温度 18°C",
			深圳: "小雨，温度 22°C",
			杭州: "晴天，温度 16°C",
		};

		return weatherData[city] || `${city}的天气信息暂不可用`;
	},
	{
		name: "get_weather",
		description: "获取指定城市的天气信息",
		schema: z.object({
			city: z.string().describe("城市名称"),
		}),
	},
);

/**
 * 示例工具：计算器
 */
export const calculatorTool = tool(
	({ expression }: { expression: string }) => {
		try {
			// 简单的安全计算（仅支持基本运算）
			const sanitized = expression.replace(/[^0-9+\-*/().]/g, "");
			const result = eval(sanitized);
			return `计算结果: ${expression} = ${result}`;
		} catch (error) {
			return `计算错误: ${error}`;
		}
	},
	{
		name: "calculator",
		description: "执行简单的数学计算",
		schema: z.object({
			expression: z.string().describe("数学表达式，如: 2+3*4"),
		}),
	},
);

/**
 * 工具：执行系统命令行
 */
export const executeCommandTool = tool(
	({ command }: { command: string }) => {
		try {
			// 执行系统命令并返回输出
			const output = execSync(command, {
				encoding: "utf-8",
				timeout: 30000,
			});
			return `命令执行成功:\n${output}`;
		} catch (error: any) {
			return `命令执行失败: ${error.message}\n错误输出: ${error.stdout || error.stderr}`;
		}
	},
	{
		name: "execute_command",
		description: "执行系统命令行命令",
		schema: z.object({
			command: z.string().describe("要执行的系统命令行命令"),
		}),
	},
);

/**
 * 所有工具列表
 */
export const allTools = [getWeatherTool, calculatorTool, executeCommandTool];
