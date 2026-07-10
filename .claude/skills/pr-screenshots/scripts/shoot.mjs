// Capture CV screenshots with Playwright. Run from the repo root:
//   pnpm run build && pnpm run preview &
//   BASE=http://localhost:<port> pnpm exec node .claude/skills/pr-screenshots/scripts/shoot.mjs
//
// Flags: --routes /,/pl  --out .pr-screenshots  --prefix page  --selector "<css>"
// With --selector, crops that element (waits for it); otherwise full-page.
import { chromium } from "playwright";

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const BASE = process.env.BASE || arg("base", "http://localhost:4321");
const OUT = arg("out", ".pr-screenshots");
const PREFIX = arg("prefix", "page");
const SELECTOR = arg("selector", null);
const ROUTES = arg("routes", "/,/pl").split(",");
const VIEWPORT = { width: 1280, height: 900 };

const labelFor = (route) =>
  route === "/" || route === "" ? "en" : route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";

const browser = await chromium.launch();
for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  const file = `${OUT}/${PREFIX}-${labelFor(route)}.png`;
  if (SELECTOR) {
    await page.waitForSelector(SELECTOR, { timeout: 10000 });
    // 1200ms: outlasts the hero fadeUp animation (0.8s + 0.15s delay)
    await page.waitForTimeout(1200);
    await page.locator(SELECTOR).screenshot({ path: file });
  } else {
    await page.waitForTimeout(1200);
    await page.screenshot({ path: file, fullPage: true });
  }
  console.log(`saved ${file}`);
  await ctx.close();
}
await browser.close();
