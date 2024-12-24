# VSCode + Deno

Configure `.vscode/settings.json` at the root:

```json
{
  "deno.enable": true,
  "editor.defaultFormatter": "denoland.vscode-deno"
}
```

When working with projects heavily dependent on `tsc` + `tsconfig.json`, you may
choose to disable the Deno LSP, e.g.

```json
{
  "deno.disablePaths": ["apps/deno-nextjs-app-dir"]
}
```

... but I'm curious to see how far I can get with popular frameworks like
Next.js using _only_ Deno.

# Reference

- **Deno:**
  ["Deno & Visual Studio Code"](https://docs.deno.com/runtime/reference/vscode/)
- **Deno:**
  ["TypeScript support"](https://docs.deno.com/runtime/fundamentals/typescript/)
