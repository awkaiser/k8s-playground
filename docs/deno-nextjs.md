# Next.js + Deno

As of December 2024, using Next.js with _only_ `deno` isn't 100% smooth sailing.

# Project setup

After running the [recommended:](https://docs.deno.com/examples/next_tutorial/)

```sh
deno run -A npm:create-next-app@latest
```

... there are some things to look out for:

- Delete **node_modules** and **package-lock.json**, then run `deno install` to
  create **deno.lock** and a new **node_modules** (with symlinks)
- Configuring **deno.json**, you'll notice that Deno supports a limited set of
  TypeScript compiler options relative to the **tsconfig.json** that ships with
  Next.js:

```tsx
{
  "compilerOptions": {
    "jsx": "react-jsxdev", // `react-jsx` for production
    "lib": ["deno.ns", "dom"], // server-side + client-side types
    "types": ["next-env.d.ts", ".next/types/**/*.ts"] // Next.js types
  },
  "imports": {
    "@/": "./src/" // import MyComponent from '@/components/MyComponent.tsx'
  },
  "unstable": ["unsafe-proto"] // Currently necessary to run Next.js
}
```

Deno would benefit from its own Next.js template.

# Deno LSP gotchas

## Next.js component imports

There is an [issue](https://github.com/denoland/deno/issues/25359) where the
Deno LSP will throw an error on component imports:

```tsx
import Image from "next/image";

/* ... */

return (
  <main>
    <Image src="/next.svg" />
  </main>
);
```

```text
JSX element type 'Image' does not have any construct or call signatures. deno-ts(2604)
```

This is due to `next@15.1.2` exporting types that are
[broken](https://arethetypeswrong.github.io/?p=next%4015.1.2) for ESM
`type: "module"` projects (Deno or Node.js w/ `node16 | nodenext` module
resolution). The Deno VSCode extension already recommends disabling the Deno LSP
on any project with **tsconfig.json** compiler options unsupported by Deno,
which resolves the broken types as well since the TypeScript LSP has no problem
with them.

```json
{ // .vscode/settings.json
  "deno.enable": true,
  "deno.disablePaths": [
    "./apps/deno-nextjs-app-dir"
  ],
  "editor.defaultFormatter": "denoland.vscode-deno"
}
```

# Linting

(TBD)

# Middleware

Even the simplest Next.js Middleware:[^1]

```tsx
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.redirect(new URL("/"));
}

export const config = {
  matcher: "/go-home",
};
```

... fails with this error:

```
⨯ Error: Attempt to export a nullable value for "File"
   at eventLoopTick (ext:core/01_core.js:175:7)
```

```
defineProperties
  node_modules/.deno/next@15.1.2/node_modules/next/dist/compiled/edge-runtime/index.js (1:513931)
```

:bomb: :boom:

[^1]: Next.js' approach to middleware
    [grinds my gears,](https://www.reddit.com/r/nextjs/comments/1d84szr/anyone_else_hate_nextjs_middleware_implementation/)
    so it's not the worst to have a vacation from it :wink:

# Reference

- **Deno:**
  ["Build a Next.js App"](https://docs.deno.com/examples/next_tutorial/)
- **Github:**
  ["Next.js components are not importing types properly"](https://github.com/denoland/deno/issues/25359)
