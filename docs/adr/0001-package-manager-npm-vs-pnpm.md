# 0001 — Package manager: npm vs pnpm

- **Status:** Deferred
- **Date:** 2026-06-05

## Context

The question came up of whether to switch this repo's package manager from **npm** to **pnpm**.

Relevant facts about the current setup:

- Single-developer **Astro** static site (this CV), small dependency tree.
- Uses npm: a `package-lock.json` is committed; there is **no** `packageManager` field in
  `package.json`.
- CI ([`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)) runs `npm ci`, with
  GitHub Actions **pinned to commit SHAs** as a security measure.
- Deploy is a Cloudflare Worker: CI builds to `dist/` and `wrangler deploy` uploads that **static**
  output. The package manager therefore never affects the deployed artifact.

## Decision drivers

- Dependency-tree correctness (avoiding accidental reliance on undeclared packages).
- Install speed and disk usage.
- CI security posture (everything is SHA-pinned and deliberately locked down).
- Actual payoff at the current scale (one small repo).
- Possible future standardization across multiple repos.

## Options considered

1. **Stay on npm** (status quo).
2. **Migrate to pnpm.**

## Pros of pnpm

- **Stricter dependency tree.** pnpm's non-flat `node_modules` (symlinked from a content-addressable
  store) only exposes packages you actually declared, eliminating "phantom dependencies" that npm's
  flat tree silently allows. This is the most concrete win — correctness, not speed.
- **Faster installs, especially warm.** Packages are hard-linked from a global store instead of
  re-copied; Astro's large transitive tree makes cold/CI installs noticeably quicker once warm.
- **Disk savings across projects.** One shared global store rather than a full copy per repo.
- **Deploy artifact unaffected.** Since only the static `dist/` is uploaded, there is zero
  deploy-time risk from the switch.

## Cons / cost

- **Touches the hardened CI workflow.** Would need to add a (SHA-pinned) `pnpm/action-setup` step
  and change `npm ci` → `pnpm install --frozen-lockfile` — more moving parts in a workflow that is
  intentionally locked down.
- **Another tool to manage.** Pin `"packageManager": "pnpm@<ver>"` and rely on Corepack to provision
  it on dev + CI.
- **One-time migration risk.** `pnpm import` converts the lockfile cleanly, but pnpm's strictness can
  surface a peer-dependency issue npm's flat tree hid — usually a quick fix, but non-zero friction.
- **Modest payoff at this scale.** For one small site that builds in ~2s, the speed/disk gains are
  real but minor; the honest case is correctness + multi-repo standardization, not build speed.

## Decision

**Deferred.** Stay on npm for now. The upside for a standalone small site is mostly stricter
dependency hygiene — nice-to-have, not compelling, against the cost of editing the SHA-pinned CI
workflow.

Revisit if/when several repos are standardized together — notably the **B&B Digital** white-label
template system — since that is where pnpm's shared store and strict resolution compound.

## Migration sketch (if later accepted)

1. `pnpm import` (converts `package-lock.json` → `pnpm-lock.yaml`).
2. Delete `package-lock.json`; commit `pnpm-lock.yaml`.
3. Add `"packageManager": "pnpm@<ver>"` to `package.json`.
4. Update CI: SHA-pinned `pnpm/action-setup` + `pnpm install --frozen-lockfile`.
5. Verify `astro check`, `astro build`, and `npx wrangler dev` (built `dist/` through the worker).
