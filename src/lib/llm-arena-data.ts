/**
 * LLM Arena — open-weights bubble race dataset.
 *
 * Verified Oct 2026 against vendor model cards & papers (see SOURCES below).
 * - MMLU: 5-shot MMLU (instruct where published, else base).
 * - HumanEval: pass@1 (instruct where published; 2025+ vendors report
 *   SWE-Bench / LiveCodeBench instead — mapped approximately).
 * - Arena: LMArena Elo snapshot at/near launch (drifts daily).
 * - ii: chart composite 0–100 for animation. NOT the official Artificial
 *   Analysis index (different scale/versions) — relative motion only.
 * - context_k: context window in thousands of tokens.
 * - params: total params in B (active MoE params in `active`).
 * - closed: proprietary flagships (dashed overlay, never frontier).
 * - pest: params undisclosed — bubble size estimated.
 */
export type ArenaModel = {
  id: string;
  name: string;
  org: string;
  release: string;
  params: number;
  active: number | null;
  mmlu: number;
  ii: number;
  arena: number;
  humaneval: number;
  context_k: number;
  closed?: boolean;
  pest?: boolean;
};

export const ARENA_MODELS: ArenaModel[] = [
  {id:"llama-7b",   name:"LLaMA 7B",        org:"Meta",       release:"2023-02-24", params:7,   active:null, mmlu:35.1, ii:8,  arena:966,  humaneval:10,  context_k:2},
  {id:"llama-13b",  name:"LLaMA 13B",       org:"Meta",       release:"2023-02-24", params:13,  active:null, mmlu:46.9, ii:12, arena:1000, humaneval:16,  context_k:2},
  {id:"alpaca",     name:"Alpaca 7B",       org:"Stanford",   release:"2023-03-13", params:7,   active:null, mmlu:41.6, ii:10, arena:972,  humaneval:10,  context_k:2},
  {id:"vicuna13",   name:"Vicuna 13B",      org:"LMSYS",      release:"2023-03-30", params:13,  active:null, mmlu:49.0, ii:14, arena:1042, humaneval:19,  context_k:2},
  {id:"mpt7",       name:"MPT-7B",          org:"Mosaic",     release:"2023-05-05", params:7,   active:null, mmlu:27.5, ii:9,  arena:960,  humaneval:18,  context_k:8},
  {id:"falcon40",   name:"Falcon 40B",      org:"TII",        release:"2023-05-25", params:40,  active:null, mmlu:55.4, ii:18, arena:1031, humaneval:26,  context_k:2},
  {id:"llama2-7b",  name:"Llama 2 7B",      org:"Meta",       release:"2023-07-18", params:7,   active:null, mmlu:45.3, ii:13, arena:1003, humaneval:13,  context_k:4},
  {id:"llama2-13b", name:"Llama 2 13B",     org:"Meta",       release:"2023-07-18", params:13,  active:null, mmlu:54.8, ii:17, arena:1047, humaneval:19,  context_k:4},
  {id:"llama2-70b", name:"Llama 2 70B",     org:"Meta",       release:"2023-07-18", params:70,  active:null, mmlu:68.9, ii:27, arena:1117, humaneval:31,  context_k:4},
  {id:"mistral7",   name:"Mistral 7B",      org:"Mistral",    release:"2023-09-27", params:7.3, active:null, mmlu:60.1, ii:29, arena:1072, humaneval:30,  context_k:32},
  {id:"zephyr",     name:"Zephyr 7B",       org:"HuggingFace",release:"2023-10-23", params:7,   active:null, mmlu:61.1, ii:30, arena:1075, humaneval:31,  context_k:8},
  {id:"mixtral",    name:"Mixtral 8×7B",    org:"Mistral",    release:"2023-12-11", params:46.7,active:12.9,  mmlu:70.6, ii:35, arena:1114, humaneval:54,  context_k:32},
  {id:"phi2",       name:"Phi-2",           org:"Microsoft",  release:"2023-12-12", params:2.7, active:null, mmlu:57.0, ii:24, arena:1034, humaneval:47,  context_k:2},
  {id:"qwen72",     name:"Qwen 72B",        org:"Alibaba",    release:"2023-11-30", params:72,  active:null, mmlu:77.4, ii:40, arena:1100, humaneval:65,  context_k:32},
  {id:"gemma7",     name:"Gemma 7B",        org:"Google",     release:"2024-02-21", params:7,   active:null, mmlu:64.3, ii:27, arena:1064, humaneval:32,  context_k:8},
  {id:"dbrx",       name:"DBRX 132B",       org:"Databricks", release:"2024-03-27", params:132, active:36,    mmlu:73.7, ii:38, arena:1103, humaneval:70,  context_k:32},
  {id:"mixtral22",  name:"Mixtral 8×22B",   org:"Mistral",    release:"2024-04-17", params:141, active:39,    mmlu:77.8, ii:44, arena:1148, humaneval:74,  context_k:64},
  {id:"llama3-8b",  name:"Llama 3 8B",      org:"Meta",       release:"2024-04-18", params:8,   active:null, mmlu:68.4, ii:38, arena:1152, humaneval:62,  context_k:8},
  {id:"llama3-70b", name:"Llama 3 70B",     org:"Meta",       release:"2024-04-18", params:70,  active:null, mmlu:82.0, ii:51, arena:1208, humaneval:81,  context_k:8},
  {id:"phi3",       name:"Phi-3 mini",      org:"Microsoft",  release:"2024-04-23", params:3.8, active:null, mmlu:69.0, ii:30, arena:1062, humaneval:58,  context_k:128},
  {id:"qwen2-72",   name:"Qwen2 72B",       org:"Alibaba",    release:"2024-06-07", params:72.7,active:null, mmlu:84.2, ii:55, arena:1212, humaneval:86,  context_k:128},
  {id:"gemma2-27",  name:"Gemma 2 27B",     org:"Google",     release:"2024-06-27", params:27.2,active:null, mmlu:75.2, ii:42, arena:1218, humaneval:52,  context_k:8},
  {id:"llama31-8b", name:"Llama 3.1 8B",    org:"Meta",       release:"2024-07-23", params:8,   active:null, mmlu:69.4, ii:39, arena:1156, humaneval:73,  context_k:128},
  {id:"llama31-70", name:"Llama 3.1 70B",   org:"Meta",       release:"2024-07-23", params:70,  active:null, mmlu:83.6, ii:57, arena:1240, humaneval:80,  context_k:128},
  {id:"llama31-405",name:"Llama 3.1 405B",  org:"Meta",       release:"2024-07-23", params:405, active:null, mmlu:88.6, ii:60, arena:1267, humaneval:89,  context_k:128},
  {id:"mistral123", name:"Mistral Large 2", org:"Mistral",    release:"2024-07-24", params:123, active:null, mmlu:84.0, ii:54, arena:1230, humaneval:92,  context_k:128},
  {id:"qwen25-72",  name:"Qwen2.5 72B",     org:"Alibaba",    release:"2024-09-19", params:72.7,active:null, mmlu:86.1, ii:56, arena:1228, humaneval:87,  context_k:128},
  {id:"llama32-3b", name:"Llama 3.2 3B",    org:"Meta",       release:"2024-09-25", params:3.2, active:null, mmlu:63.4, ii:32, arena:1100, humaneval:42,  context_k:128},
  {id:"ministral8", name:"Ministral 8B",    org:"Mistral",    release:"2024-10-16", params:8,   active:null, mmlu:65.0, ii:22, arena:1150, humaneval:35,  context_k:128},
  {id:"qwen25coder",name:"Qwen2.5-Coder 32B", org:"Alibaba",  release:"2024-11-12", params:32.5,active:null, mmlu:74.0, ii:44, arena:1220, humaneval:93,  context_k:128},
  {id:"llama33-70", name:"Llama 3.3 70B",   org:"Meta",       release:"2024-12-06", params:70.6,active:null, mmlu:86.0, ii:58, arena:1257, humaneval:88,  context_k:128},
  {id:"phi4",       name:"Phi-4",           org:"Microsoft",  release:"2024-12-12", params:14,  active:null, mmlu:84.8, ii:45, arena:1256, humaneval:83,  context_k:16},
  {id:"deepseekv2", name:"DeepSeek-V2",     org:"DeepSeek",   release:"2024-05-07", params:236, active:21,    mmlu:78.5, ii:36, arena:1120, humaneval:48,  context_k:128},
  {id:"deepseekv3", name:"DeepSeek-V3",     org:"DeepSeek",   release:"2024-12-26", params:671, active:37,    mmlu:88.5, ii:61, arena:1318, humaneval:83,  context_k:128},
  {id:"deepseekr1", name:"DeepSeek-R1",     org:"DeepSeek",   release:"2025-01-20", params:671, active:37,    mmlu:90.8, ii:68, arena:1361, humaneval:91,  context_k:128},
  {id:"qwq32",      name:"QwQ-32B",         org:"Alibaba",    release:"2025-03-05", params:32.5,active:null,  mmlu:80.0, ii:52, arena:1335, humaneval:65,  context_k:131},
  {id:"gemma3-27",  name:"Gemma 3 27B",     org:"Google",     release:"2025-03-12", params:27,  active:null, mmlu:77.0, ii:48, arena:1338, humaneval:88,  context_k:128},
  {id:"small31",    name:"Mistral Small 3.1", org:"Mistral",  release:"2025-03-17", params:24,  active:null,  mmlu:81.0, ii:50, arena:1240, humaneval:65,  context_k:128},
  {id:"llama4scout",name:"Llama 4 Scout",   org:"Meta",       release:"2025-04-05", params:109, active:17,    mmlu:79.6, ii:47, arena:1300, humaneval:45,  context_k:10000},
  {id:"llama4mav",  name:"Llama 4 Maverick",org:"Meta",       release:"2025-04-05", params:400, active:17,    mmlu:85.5, ii:55, arena:1300, humaneval:60,  context_k:1024},
  {id:"qwen3-32",   name:"Qwen3 32B",       org:"Alibaba",    release:"2025-04-28", params:32.5,active:null,  mmlu:88.0, ii:60, arena:1347, humaneval:85,  context_k:128},
  {id:"qwen3-235",  name:"Qwen3 235B",      org:"Alibaba",    release:"2025-04-28", params:235, active:22,    mmlu:87.8, ii:66, arena:1400, humaneval:85,  context_k:128},
  {id:"phi4mini",   name:"Phi-4-mini-reasoning", org:"Microsoft", release:"2025-04-30", params:3.8, active:null, mmlu:73.0, ii:34, arena:1150, humaneval:70, context_k:128},
  {id:"devstral",   name:"Devstral Small 24B", org:"Mistral", release:"2025-05-21", params:24,  active:null,  mmlu:81.0, ii:51, arena:1238, humaneval:55,  context_k:128},
  {id:"kimi-k2",    name:"Kimi K2",         org:"Moonshot",   release:"2025-07-11", params:1040,active:32,    mmlu:89.5, ii:62, arena:1416, humaneval:88,  context_k:256},
  {id:"qwen3coder", name:"Qwen3-Coder 480B", org:"Alibaba",   release:"2025-07-22", params:480, active:35,    mmlu:87.0, ii:65, arena:1380, humaneval:94,  context_k:256},
  {id:"glm45",      name:"GLM-4.5",         org:"Zhipu",      release:"2025-07-28", params:355, active:32,    mmlu:88.0, ii:64, arena:1411, humaneval:87,  context_k:131},
  {id:"oss20",      name:"gpt-oss 20B",     org:"OpenAI",     release:"2025-08-05", params:20.9,active:3.6,   mmlu:85.3, ii:38, arena:1300, humaneval:61,  context_k:128},
  {id:"oss120",     name:"gpt-oss 120B",    org:"OpenAI",     release:"2025-08-05", params:116.8,active:5.1,  mmlu:90.0, ii:49, arena:1350, humaneval:62,  context_k:128},
  {id:"deepseek32", name:"DeepSeek V3.2-Exp", org:"DeepSeek", release:"2025-09-29", params:671, active:37,    mmlu:93.0, ii:71, arena:1423, humaneval:90,  context_k:128},
  {id:"glm46",      name:"GLM-4.6",         org:"Zhipu",      release:"2025-09-30", params:355, active:32,    mmlu:87.5, ii:66, arena:1390, humaneval:88,  context_k:128},
  {id:"minimax-m2", name:"MiniMax M2",      org:"MiniMax",    release:"2025-10-27", params:230, active:10,    mmlu:85.0, ii:63, arena:1380, humaneval:80,  context_k:196},
  {id:"olmo3-32",   name:"OLMo 3 32B",      org:"Ai2",        release:"2025-11-20", params:32,  active:null,  mmlu:78.0, ii:40, arena:1200, humaneval:60,  context_k:65},
  {id:"nano-nemotron", name:"Nemotron 3 Nano 30B", org:"NVIDIA", release:"2025-12-15", params:31.6, active:3.2, mmlu:78.6, ii:55, arena:1314, humaneval:78,  context_k:1024},
  {id:"kimi-k25",   name:"Kimi K2.5",       org:"Moonshot",   release:"2026-01-27", params:1000,active:32,    mmlu:91.0, ii:70, arena:1370, humaneval:90,  context_k:256},
  {id:"qwen35-397", name:"Qwen3.5 397B-A17B", org:"Alibaba",  release:"2026-02-16", params:397, active:17,    mmlu:91.5, ii:72, arena:1375, humaneval:90,  context_k:256},
  {id:"glm5",       name:"GLM-5",           org:"Zhipu",      release:"2026-02-11", params:744, active:40,    mmlu:90.2, ii:69, arena:1452, humaneval:89,  context_k:205},
  {id:"qwen35-27",  name:"Qwen3.5 27B",     org:"Alibaba",    release:"2026-02-24", params:27.8,active:null,  mmlu:85.5, ii:58, arena:1270, humaneval:76,  context_k:256},
  {id:"qwen35-122", name:"Qwen3.5 122B-A10B", org:"Alibaba",  release:"2026-02-24", params:122, active:10,    mmlu:88.0, ii:64, arena:1320, humaneval:82,  context_k:256},
  {id:"nemotron-super", name:"Nemotron 3 Super 120B", org:"NVIDIA", release:"2026-03-11", params:120, active:12, mmlu:89.8, ii:68, arena:1350, humaneval:87, context_k:1024},
  {id:"qwen36-27",  name:"Qwen3.6 27B",     org:"Alibaba",    release:"2026-04-21", params:27.8,active:null,  mmlu:86.5, ii:60, arena:1295, humaneval:78,  context_k:256},
  {id:"deepseekv4f",name:"DeepSeek V4 Flash", org:"DeepSeek", release:"2026-04-24", params:284, active:13,    mmlu:86.4, ii:70, arena:1372, humaneval:70,  context_k:1024},
  {id:"nano-omni",  name:"Nemotron 3 Nano Omni", org:"NVIDIA", release:"2026-04-28", params:30, active:3,     mmlu:83.0, ii:52, arena:1361, humaneval:63,  context_k:256},
  {id:"gemma4-31",  name:"Gemma 4 31B",     org:"Google",     release:"2026-03-31", params:30.7,active:null,  mmlu:86.8, ii:60, arena:1452, humaneval:95,  context_k:256},
  {id:"nemotron-ultra", name:"Nemotron 3 Ultra 550B", org:"NVIDIA", release:"2026-06-04", params:550, active:55, mmlu:92.0, ii:73, arena:1385, humaneval:92, context_k:1024},
  {id:"gemma4-12",  name:"Gemma 4 12B",     org:"Google",     release:"2026-06-03", params:12,  active:null,  mmlu:84.0, ii:53, arena:1265, humaneval:74,  context_k:256},
  {id:"glm52",      name:"GLM-5.2",         org:"Zhipu",      release:"2026-06-13", params:744, active:40,    mmlu:92.3, ii:74, arena:1483, humaneval:93,  context_k:1024},
  {id:"inkling",    name:"Inkling 975B",    org:"ThinkingMachines", release:"2026-07-15", params:975, active:41, mmlu:88.7, ii:72, arena:1442, humaneval:80, context_k:1024},
  {id:"kimi-k3",    name:"Kimi K3",         org:"Moonshot",   release:"2026-07-16", params:2800,active:104,   mmlu:91.8, ii:73, arena:1500, humaneval:91,  context_k:1024},
  {id:"inkling-small", name:"Inkling-Small 276B", org:"ThinkingMachines", release:"2026-07-30", params:276, active:12, mmlu:90.0, ii:71, arena:1405, humaneval:88, context_k:1024},
  {id:"nemotron-light", name:"Nemotron 3.5 Lightning 30B", org:"NVIDIA", release:"2026-08-11", params:31.6, active:3, mmlu:87.0, ii:65, arena:1335, humaneval:85, context_k:1024},
  {id:"qwen38-max", name:"Qwen3.8 2.4T-A95B", org:"Alibaba",  release:"2026-08-12", params:2450,active:95,   mmlu:93.2, ii:77, arena:1402, humaneval:94,  context_k:1024},
  {id:"qwen38-27",  name:"Qwen3.8 27B",     org:"Alibaba",    release:"2026-08-14", params:27.8,active:null,  mmlu:87.5, ii:62, arena:1315, humaneval:80,  context_k:256},
  {id:"qwen38-flash", name:"Qwen3.8 Flash-Next", org:"Alibaba", release:"2026-08-26", params:176, active:6,   mmlu:89.5, ii:68, arena:1352, humaneval:87,  context_k:256},
  {id:"bolt74",     name:"Nemotron 3.5 Bolt 74B", org:"NVIDIA", release:"2026-10-15", params:74.9, active:9,  mmlu:88.8, ii:66, arena:1340, humaneval:86,  context_k:256},
  {id:"supervl",    name:"Nemotron 3.5 Super VL 120B", org:"NVIDIA", release:"2026-10-15", params:120, active:12, mmlu:90.0, ii:74, arena:1360, humaneval:88, context_k:1024},
  {id:"gpt35",      name:"GPT-3.5 Turbo",   org:"OpenAI",     release:"2023-03-01", params:175, active:null,  closed:true, pest: true, mmlu:70.0, ii:30, arena:1115, humaneval:48,  context_k:4},
  {id:"gpt4",       name:"GPT-4",           org:"OpenAI",     release:"2023-03-14", params:1800,active:null,  closed:true, pest: true, mmlu:86.4, ii:62, arena:1250, humaneval:67,  context_k:8},
  {id:"claude2",    name:"Claude 2",        org:"Anthropic",  release:"2023-07-11", params:100, active:null,  closed:true, pest: true, mmlu:78.5, ii:48, arena:1100, humaneval:56,  context_k:100},
  {id:"gpt4turbo",  name:"GPT-4 Turbo",     org:"OpenAI",     release:"2023-11-06", params:1800,active:null,  closed:true, pest: true, mmlu:87.0, ii:63, arena:1250, humaneval:70,  context_k:128},
  {id:"gemini-ultra", name:"Gemini Ultra",  org:"Google",     release:"2023-12-06", params:100, active:null,  closed:true, pest: true, mmlu:90.0, ii:66, arena:1230, humaneval:74,  context_k:32},
  {id:"opus3",      name:"Claude 3 Opus",   org:"Anthropic",  release:"2024-03-04", params:300, active:null,  closed:true, pest: true, mmlu:86.8, ii:64, arena:1253, humaneval:85,  context_k:200},
  {id:"gpt4o",      name:"GPT-4o",          org:"OpenAI",     release:"2024-05-13", params:200, active:null,  closed:true, pest: true, mmlu:88.7, ii:68, arena:1310, humaneval:90,  context_k:128},
  {id:"sonnet35",   name:"Claude 3.5 Sonnet", org:"Anthropic", release:"2024-06-20", params:200, active:null, closed:true, pest: true, mmlu:88.3, ii:70, arena:1270, humaneval:92,  context_k:200},
  {id:"o1",         name:"OpenAI o1",       org:"OpenAI",     release:"2024-12-05", params:200, active:null,  closed:true, pest: true, mmlu:92.0, ii:74, arena:1330, humaneval:90,  context_k:200},
  {id:"claude37",   name:"Claude 3.7 Sonnet", org:"Anthropic", release:"2025-02-24", params:200, active:null, closed:true, pest: true, mmlu:88.0, ii:72, arena:1300, humaneval:85,  context_k:200},
  {id:"gemini25pro",name:"Gemini 2.5 Pro",  org:"Google",     release:"2025-03-25", params:300, active:null,  closed:true, pest: true, mmlu:90.0, ii:76, arena:1440, humaneval:85,  context_k:1000},
  {id:"opus4",      name:"Claude Opus 4",   org:"Anthropic",  release:"2025-05-22", params:400, active:null,  closed:true, pest: true, mmlu:89.0, ii:75, arena:1400, humaneval:88,  context_k:200},
  {id:"gpt5",       name:"GPT-5",           org:"OpenAI",     release:"2025-08-07", params:400, active:null,  closed:true, pest: true, mmlu:92.0, ii:78, arena:1440, humaneval:88,  context_k:400},
  {id:"sonnet45",   name:"Claude Sonnet 4.5", org:"Anthropic", release:"2025-09-29", params:400, active:null, closed:true, pest: true, mmlu:90.0, ii:79, arena:1445, humaneval:90,  context_k:500},
  {id:"gemini3",    name:"Gemini 3 Pro",    org:"Google",     release:"2025-11-18", params:300, active:null,  closed:true, pest: true, mmlu:93.0, ii:80, arena:1500, humaneval:93,  context_k:1000},
];

export const ORG_COLORS: Record<string, string> = {
  Meta: "#0086ff",
  Mistral: "#ff8205",
  Alibaba: "#a259ff",
  Google: "#34a853",
  Microsoft: "#00c2d1",
  DeepSeek: "#ff3b5c",
  OpenAI: "#2ecc71",
  Moonshot: "#ffca3a",
  TII: "#c98a5b",
  Mosaic: "#7b87a3",
  Stanford: "#e485e4",
  LMSYS: "#ff7ab8",
  HuggingFace: "#ffd21f",
  Databricks: "#ff5c39",
  Zhipu: "#4dd08a",
  NVIDIA: "#76b900",
  ThinkingMachines: "#ff6ec7",
  MiniMax: "#ff4d6d",
  Ai2: "#8ecae6",
  Anthropic: "#d97757",
};

export function orgColor(org: string): string {
  return ORG_COLORS[org] ?? "#8892aa";
}

export const OPEN_COUNT = ARENA_MODELS.filter((m) => !m.closed).length;
export const CLOSED_COUNT = ARENA_MODELS.filter((m) => m.closed).length;

/** Primary sources consulted during Oct 2026 verification. */
export const ARENA_SOURCES: { label: string; url: string }[] = [
  { label: "LLaMA paper (arXiv 2302.13971)", url: "https://arxiv.org/abs/2302.13971" },
  { label: "Llama 2 paper (arXiv 2307.09288)", url: "https://arxiv.org/abs/2307.09288" },
  { label: "Gemma report (arXiv 2403.08295)", url: "https://arxiv.org/abs/2403.08295" },
  { label: "Meta Llama model cards (GitHub)", url: "https://github.com/meta-llama/llama-models" },
  { label: "Mistral AI newsroom", url: "https://mistral.ai/news" },
  { label: "Qwen blog & research", url: "https://qwen.ai/blog" },
  { label: "DeepSeek V3 / R1 papers (GitHub)", url: "https://github.com/deepseek-ai/DeepSeek-V3" },
  { label: "Moonshot AI — Kimi K2 / K2.5 / K3", url: "https://github.com/MoonshotAI/Kimi-K2" },
  { label: "Z.ai — GLM-4.5 / 4.6 / 5 / 5.2 (HuggingFace)", url: "https://huggingface.co/zai-org" },
  { label: "OpenAI gpt-oss model card", url: "https://openai.com/index/gpt-oss-model-card/" },
  { label: "OpenAI GPT-4 technical report", url: "https://arxiv.org/abs/2303.08774" },
  { label: "Google Gemma releases", url: "https://ai.google.dev/gemma/docs/releases" },
  { label: "Thinking Machines — Inkling", url: "https://thinkingmachines.ai/news/introducing-inkling/" },
  { label: "NVIDIA Nemotron 3 / 3.5 family", url: "https://research.nvidia.com/labs/nemotron/Nemotron-3-Super/" },
  { label: "NVIDIA Nemotron 3.5 Super VL", url: "https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/" },
  { label: "Databricks DBRX", url: "https://www.databricks.com/blog/introducing-dbrx-new-state-art-open-llm" },
  { label: "AllenAI OLMo 3", url: "https://allenai.org/blog/olmo3" },
  { label: "LMArena leaderboard", url: "https://lmarena.ai" },
  { label: "Artificial Analysis", url: "https://artificialanalysis.ai" },
];
