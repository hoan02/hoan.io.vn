// Runs a command with local .env files moved aside, then puts them back.
// OpenNext inlines every .env file it finds (for all modes) into the Worker bundle,
// so production builds must not see the local secrets used by `next dev`.
// Usage: node scripts/with-hidden-env.mjs <command> [args...]
import { existsSync, mkdirSync, readdirSync, renameSync, rmdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const STASH = ".env-hidden-during-build";
const files = readdirSync(".").filter((f) => /^\.env(\..+)?$/.test(f) && f !== ".env.example");

if (existsSync(STASH)) {
  console.error(`${STASH}/ already exists; restore its files to the project root first.`);
  process.exit(1);
}

mkdirSync(STASH);
for (const f of files) renameSync(f, join(STASH, f));

const restore = () => {
  for (const f of files) if (existsSync(join(STASH, f))) renameSync(join(STASH, f), f);
  if (existsSync(STASH) && readdirSync(STASH).length === 0) rmdirSync(STASH);
};
process.on("SIGINT", () => {
  restore();
  process.exit(130);
});

let status = 1;
try {
  const [cmd, ...args] = process.argv.slice(2);
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  status = result.status ?? 1;
} finally {
  restore();
}
process.exit(status);
