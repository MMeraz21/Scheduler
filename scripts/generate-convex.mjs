import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const convexRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../node_modules/convex/dist/cjs",
);

const { oneoffContext } = require(path.join(convexRoot, "bundler/context.js"));
const { doCodegen } = require(path.join(convexRoot, "cli/lib/codegen.js"));
const { functionsDir, readProjectConfig } = require(path.join(
  convexRoot,
  "cli/lib/config.js",
));

const ctx = await oneoffContext({});
const { configPath, projectConfig } = await readProjectConfig(ctx);
const functionsDirectoryPath = functionsDir(configPath, projectConfig);

await doCodegen(ctx, functionsDirectoryPath, "disable");
console.log("Generated convex/_generated");
