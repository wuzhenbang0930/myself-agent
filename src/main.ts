import * as readline from "readline";
import { createAgent } from "./agents";
import pc from "picocolors";

process.env.LANGCHAIN_TRACING_V2 = "false";
process.env.LANGCHAIN_VERBOSE = "false";

// 赛博朋克配色
const c = {
  cyan: (t: string) => pc.cyan(t),
  magenta: (t: string) => pc.magenta(t),
  green: (t: string) => pc.green(t),
  yellow: (t: string) => pc.yellow(t),
  red: (t: string) => pc.red(t),
  dim: (t: string) => pc.dim(t),
  bold: (t: string) => pc.bold(t),
  white: (t: string) => pc.white(t),
  bgCyan: (t: string) => pc.bgCyan(pc.black(t)),
  bgMagenta: (t: string) => pc.bgMagenta(pc.black(t)),
};

// 加载动画
const frames = ["█", "▓", "▒", "░", "▒", "▓"];
let loadingIndex = 0;
let loadingInterval: NodeJS.Timeout | null = null;

function startLoading(text: string) {
  if (loadingInterval) return;
  loadingIndex = 0;
  loadingInterval = setInterval(() => {
    const f = c.cyan(frames[loadingIndex % frames.length]);
    process.stdout.write(`\r${f} ${c.dim(text)}`);
    loadingIndex++;
  }, 60);
}

function stopLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
    process.stdout.write("\r" + "\x1B[K");
  }
}

// 类型
interface ToolCall {
  name: string;
  args: any;
  result?: string;
}

// 赛博朋克头部
function printHeader() {
  console.log(c.dim("╔") + c.cyan("═".repeat(48)) + c.dim("╗"));
  console.log(c.dim("║") + c.bold(c.cyan("  MYSELF.AI  ")) + c.magenta(">>") + c.dim(" ".repeat(32)) + c.dim("║"));
  console.log(c.dim("╠") + c.cyan("═".repeat(48)) + c.dim("╣"));
  console.log(c.dim("║") + c.green(" [SYS] ") + c.dim("模型在线") + c.dim(" ".repeat(33)) + c.dim("║"));
  console.log(c.dim("╚") + c.cyan("═".repeat(48)) + c.dim("╝"));
}

// 赛博朋克工具面板
function printTools(tools: ToolCall[]) {
  if (!tools || tools.length === 0) return;
  
  console.log(c.dim("╔") + c.magenta("─".repeat(46)) + c.dim("╗"));
  tools.forEach(tool => {
    console.log(c.dim("║") + c.green(" ◆ ") + c.cyan(tool.name) + c.dim(" ".repeat(Math.max(0, 40 - tool.name.length))) + c.dim("║"));
    if (tool.args.command) console.log(c.dim("║") + c.yellow(" > ") + c.white(tool.args.command.slice(0, 42)) + c.dim(" ".repeat(Math.max(0, 43 - tool.args.command.length))) + c.dim("║"));
    if (tool.args.expression) console.log(c.dim("║") + c.yellow(" = ") + c.white(tool.args.expression) + c.dim(" ".repeat(Math.max(0, 43 - tool.args.expression.length))) + c.dim("║"));
    if (tool.args.city) console.log(c.dim("║") + c.yellow("@ ") + c.white(tool.args.city) + c.dim(" ".repeat(Math.max(0, 43 - tool.args.city.length))) + c.dim("║"));
    if (tool.result) console.log(c.dim("║") + c.green(" → ") + c.dim(tool.result.slice(0, 42)) + c.dim(" ".repeat(Math.max(0, 43 - tool.result.slice(0, 42).length))) + c.dim("║"));
  });
  console.log(c.dim("╚") + c.magenta("─".repeat(46)) + c.dim("╝"));
}

// 赛博朋克分隔线
function divider() {
  console.log(c.dim("├") + c.cyan("─".repeat(48)) + c.dim("┤"));
}

// 赛博朋克底部输入
function printPrompt() {
  console.log(c.dim("╔") + c.cyan("═".repeat(48)) + c.dim("╗"));
  console.log(c.dim("║") + c.magenta(" >>> ") + c.dim(" ".repeat(43)) + c.dim("║"));
  console.log(c.dim("╚") + c.cyan("═".repeat(48)) + c.dim("╝"));
}

// 赛博朋克帮助
function printHelp() {
  console.log(c.dim("║") + c.bold(c.yellow(" 命令")) + c.dim(" ".repeat(41)) + c.dim("║"));
  console.log(c.dim("║") + c.green(" clear ") + c.dim("清空") + c.dim(" ".repeat(37)) + c.dim("║"));
  console.log(c.dim("║") + c.green(" exit  ") + c.dim("退出") + c.dim(" ".repeat(38)) + c.dim("║"));
}

// Markdown 简化渲染
function renderMD(text: string) {
  if (!text) return "";
  text = text.replace(/```\w*\n[\s\S]*?```/g, (m) => {
    const code = m.replace(/```\w*\n?/g, "").trim();
    return "\n" + c.dim("┌" + "─".repeat(40) + "┐\n") + 
           code.split("\n").slice(0, 4).map(l => c.dim("│") + c.yellow(l.slice(0, 40).padEnd(40)) + c.dim("│")).join("\n") + 
           "\n" + c.dim("└" + "─".repeat(40) + "┘");
  });
  text = text.replace(/\*\*(.+?)\*\*/g, c.bold("$1"));
  text = text.replace(/^### (.+)$/gm, "\n" + c.cyan(" ▸ $1"));
  text = text.replace(/^## (.+)$/gm, "\n" + c.cyan(" ▸▸ $1"));
  text = text.replace(/^# (.+)$/gm, "\n" + c.cyan(" ▸▸▸ $1"));
  text = text.replace(/^- (.+)$/gm, "  " + c.green("▸") + " $1");
  text = text.replace(/`([^`]+)`/g, c.yellow("$1"));
  return text;
}

async function startServer() {
  printHeader();
  divider();
  printHelp();
  printPrompt();
  
  try {
    startLoading("初始化中");
    const agent = await createAgent();
    stopLoading();
    console.log(`\r${c.green("█")} ${c.green("系统就绪")}\n`);
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const messages: any[] = [];
    
    process.stdout.write(c.magenta(" >>> "));
    
    rl.on("line", async (input) => {
      const cmd = input.trim().toLowerCase();
      
      if (cmd === "exit" || cmd === "quit") {
        console.log(`\n${c.green("█")} ${c.cyan("再见!")}\n`);
        rl.close();
        process.exit(0);
      }
      
      if (cmd === "clear" || cmd === "c") {
        messages.length = 0;
        console.log();
        printHeader();
        divider();
        printHelp();
        printPrompt();
        process.stdout.write(c.magenta(" >>> "));
        return;
      }
      
      if (!input.trim()) {
        process.stdout.write(c.magenta(" >>> "));
        return;
      }
      
      process.stdout.write("\r" + "\x1B[K");
      startLoading("处理中");
      
      try {
        messages.push({ role: "user", content: input.trim() });
        const result = await (agent as any).invoke({ messages: [...messages] });
        stopLoading();
        
        // 收集工具
        const tools: ToolCall[] = [];
        result.messages.forEach((msg: any) => {
          if (msg.tool_calls) {
            msg.tool_calls.forEach((tc: any) => {
              tools.push({ name: tc.name, args: tc.args || {} });
            });
          }
          if (msg.tool_call_id && tools.length > 0) {
            tools[tools.length - 1].result = typeof msg.content === "string" ? msg.content : "";
          }
        });
        
        // 最终回复
        const lastMsg = result.messages[result.messages.length - 1];
        let content = typeof lastMsg.content === "string" ? lastMsg.content : "";
        
        messages.push({ role: "assistant", content });
        
        // 显示
        console.log();
        divider();
        
        if (tools.length > 0) {
          printTools(tools);
          divider();
        }
        
        if (content.trim()) {
          console.log(renderMD(content.trim()));
        }
        
        console.log();
        
      } catch (err: any) {
        stopLoading();
        console.log(`\n${c.red("█")} ${c.red("错误:")} ${err.message}\n`);
      }
      
      process.stdout.write(c.magenta(" >>> "));
    });
    
    rl.on("close", () => process.exit(0));
    
  } catch (err: any) {
    stopLoading();
    console.log(`\n${c.red("█")} ${c.red("启动失败:")} ${err.message}\n`);
    process.exit(1);
  }
}

startServer();
