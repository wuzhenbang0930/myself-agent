import * as z from "zod";
import { tool } from "langchain";

/**
 * 规则定义
 */
export interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
}

/**
 * 默认规则集
 */
export const defaultRules: Rule[] = [
  {
    id: "rule-1",
    name: "代码安全检查",
    description: "执行代码前进行安全检查",
    condition: "代码",
    action: "检查代码安全性，防止危险操作",
    priority: 10,
    enabled: true,
  },
  {
    id: "rule-2",
    name: "文件操作验证",
    description: "文件操作前验证路径安全性",
    condition: "文件",
    action: "验证文件路径，检查读写权限",
    priority: 9,
    enabled: true,
  },
  {
    id: "rule-3",
    name: "API调用限流",
    description: "外部API调用时添加限流控制",
    condition: "API",
    action: "添加重试逻辑和限流控制",
    priority: 8,
    enabled: true,
  },
  {
    id: "rule-4",
    name: "数据验证",
    description: "用户输入数据验证",
    condition: "输入",
    action: "验证数据格式、类型和范围",
    priority: 7,
    enabled: true,
  },
];

/**
 * 创建规则检查工具
 */
export function createRuleTools(rules: Rule[]) {
  return rules
    .filter(r => r.enabled)
    .sort((a, b) => b.priority - a.priority)
    .map(rule => 
      tool(
        ({ context }: { context: string }) => {
          const triggered = context.toLowerCase().includes(rule.condition.toLowerCase());
          return triggered
            ? `✅ 规则触发: ${rule.name}\n执行动作: ${rule.action}`
            : `⏭️ 规则未触发: ${rule.name}`;
        },
        {
          name: `check_${rule.id}`,
          description: `规则: ${rule.description}`,
          schema: z.object({
            context: z.string().describe("检查上下文"),
          }),
        }
      )
    );
}

/**
 * 规则管理工具
 */
export function createRuleManagementTools(rules: Rule[]) {
  const listRules = tool(
    () => {
      return JSON.stringify(
        rules.map(r => ({
          id: r.id,
          name: r.name,
          priority: r.priority,
          enabled: r.enabled,
        })),
        null,
        2
      );
    },
    {
      name: "list_rules",
      description: "列出所有规则",
      schema: z.object({}),
    }
  );

  return [listRules];
}