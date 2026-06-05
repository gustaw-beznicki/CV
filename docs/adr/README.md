# Architecture Decision Records

This folder holds **Architecture Decision Records (ADRs)** — short documents that capture a
significant technical decision, the context that forced it, and its consequences. They exist so the
*why* behind a choice survives long after the discussion that produced it.

## Convention

- One decision per file, named `NNNN-kebab-title.md` (zero-padded sequential number).
- Lightweight [MADR](https://adr.github.io/madr/)-style format.
- Never rewrite history: once a decision changes, add a **new** ADR and mark the old one
  `Superseded by NNNN`.

## Status lifecycle

`Proposed` → `Accepted` / `Rejected` / `Deferred` → `Superseded`

- **Proposed** — drafted, not yet decided.
- **Accepted** — decided and in effect.
- **Rejected** — considered and declined.
- **Deferred** — analysis recorded, decision intentionally postponed.
- **Superseded** — replaced by a later ADR.

## Index

| # | Title | Status |
|---|---|---|
| [0001](0001-package-manager-npm-vs-pnpm.md) | Package manager: npm vs pnpm | Deferred |
