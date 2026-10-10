// Fails the deploy if the OpenNext bundle contains anything that looks like a
// secret. Next.js inlines values from .env files it loads for production builds,
// and OpenNext ships them inside the Worker; secrets belong in `wrangler secret put`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".open-next";
const PATTERNS = [
  { name: "OpenRouter API key", re: /sk-or-v1-[A-Za-z0-9]{16,}/ },
  { name: "Anthropic API key", re: /sk-ant-[A-Za-z0-9_-]{16,}/ },
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(m?js|cjs|json|map|txt)$/.test(entry)) yield path;
  }
}

const hits = [];
for (const file of walk(ROOT)) {
  const text = readFileSync(file, "utf8");
  for (const { name, re } of PATTERNS) if (re.test(text)) hits.push(`${name} in ${file}`);
}

if (hits.length) {
  console.error("Refusing to deploy: the build contains secrets.\n  " + hits.join("\n  "));
  console.error("Move them out of .env / .env.local / .env.production (use .env.development.local for `next dev`) and set them with `npx wrangler secret put`.");
  process.exit(1);
}
console.log("No secrets found in .open-next.");
