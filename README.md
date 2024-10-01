# browser-extension-template

My browser extension template

## Features

- Writing with [TypeScript](https://www.typescriptlang.org/)
- Building with [Vite](https://vitejs.dev/)
  - Using [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)
- Linting and formatting with [ESLint](https://eslint.org/)
  - Using [@antfu/eslint-config](https://github.com/antfu/eslint-config)
  - Automated with [Husky](https://typicode.github.io/husky/)
- Optimized for [Visual Studio Code](https://code.visualstudio.com)

## Guide

1. [Create a repository from a template](https://docs.github.com/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

2. Install packages

    ```shell
    npm i -D typescript vite @crxjs/vite-plugin@beta vite-plugin-zip-pack eslint @antfu/eslint-config husky lint-staged @types/chrome @types/node
    ```

3. Set up Husky

    ```shell
    npx husky init && echo "lint-staged" >.husky/pre-commit
    ```

4. Set up `src/manifest.ts` and `vite.config.ts`

    - Update the `name`, `description` and `icons` fields in `src/manifest.ts`
    - Modify the `RELEASE_NAME` in `vite.config.ts` as needed

5. Update `README.md` and create `LICENSE`

6. Follow the guide below if you need support for polyfill, CSS, or libraries

### WebExtension API Polyfill

```shell
npm i webextension-polyfill
npm i -D @types/webextension-polyfill
```

### CSS

```shell
npm i -D stylelint stylelint-config-standard @stylistic/stylelint-config stylelint-config-clean-order
```

```diff
  // stylelint.config.js
+ /**
+  * @type {import("stylelint").Config}
+  */
+ export default {
+   extends: [
+     "stylelint-config-standard",
+     "@stylistic/stylelint-config",
+     "stylelint-config-clean-order",
+   ],
+   ignoreFiles: [
+     'dist/**/*',
+   ],
+ };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
+     "stylelint": "stylelint '**/*.css'",
+     "stylelint:fix": "stylelint --fix '**/*.css'"
    },
    "lint-staged": {
      // ...
+     "*.css": "stylelint --fix"
    }
  }
```

```diff
  // .vscode/settings.json
  {
    "editor.codeActionsOnSave": {
      // ...
+     "source.fixAll.stylelint": "explicit"
    },
    // ...
+   "stylelint.validate": [
+     "css",
+     "less",
+     "postcss",
+     "scss",
+     "html",
+     "vue",
+     "svelte",
+     "astro"
+   ],
+   "css.validate": false,
+   "less.validate": false,
+   "scss.validate": false
  }
```

#### Notable Stylelint Plugins

- [stylelint-declaration-strict-value](https://www.npmjs.com/package/stylelint-declaration-strict-value)
- [stylelint-no-unsupported-browser-features](https://www.npmjs.com/package/stylelint-no-unsupported-browser-features)
- [stylelint-declaration-block-no-ignored-properties](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties)
- [stylelint-high-performance-animation](https://www.npmjs.com/package/stylelint-high-performance-animation)
- [stylelint-a11y](https://www.npmjs.com/package/stylelint-a11y)

### PostCSS

```shell
npm i -D postcss-load-config
```

```diff
  // postcss.config.js
+ /**
+  * @type {import('postcss-load-config').Config}
+  */
+ export default {
+   plugins: [],
+ };
```

[Find plugins](https://github.com/postcss/postcss#plugins)

### Inline Styles and Style Tags

```shell
npm i -D postcss-html stylelint-config-html
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
+     "stylelint-config-html/html",
    ],
  };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
-     "stylelint": "stylelint '**/*.css'",
-     "stylelint:fix": "stylelint --fix '**/*.css'"
+     "stylelint": "stylelint '**/*.{css,html}'",
+     "stylelint:fix": "stylelint --fix '**/*.{css,html}'"
    },
    "lint-staged": {
      // ...
-     "*.css": "stylelint --fix"
+     "*.{css,html}": "stylelint --fix"
    }
  }
```

### CSS Modules

```shell
npm i -D typescript-plugin-css-modules @types/css-modules stylelint-config-css-modules
```

```diff
  // tsconfig.json
  {
    "compilerOptions": {
      // ...
+     "plugins": [
+       {
+         "name": "typescript-plugin-css-modules"
+       }
+     ]
    }
  }
```

```diff
  // .vscode/settings.json
  {
    // ...
+   "typescript.tsdk": "./node_modules/typescript/lib",
+   "typescript.enablePromptUseWorkspaceTsdk": true
  }
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
+     "stylelint-config-css-modules",
    ],
  };
```

### Styled Components

```shell
npm i styled-components
npm i -D stylelint-config-styled-components
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
+     "stylelint-config-styled-components",
    ],
  };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
-     "stylelint": "stylelint '**/*.css'",
-     "stylelint:fix": "stylelint --fix '**/*.css'"
+     "stylelint": "stylelint '**/*.{css,jsx,tsx}'",
+     "stylelint:fix": "stylelint --fix '**/*.{css,jsx,tsx}'"
    },
    "lint-staged": {
      // ...
-     "*.css": "stylelint --fix"
+     "*.{css,jsx,tsx}": "stylelint --fix"
    }
  }
```

### Tailwind CSS

```shell
npm i -D tailwindcss stylelint-config-tailwindcss
```

```diff
  // postcss.config.js
+ import tailwindcss from 'tailwindcss';

  export default {
    plugins: [
      // ...
+     tailwindcss(),
    ],
  };
```

```diff
  // tailwind.config.js
+ /**
+  * @type {import('tailwindcss').Config}
+  */
+ export default {
+   content: [],
+   theme: {
+     extend: {},
+   },
+   plugins: [],
+ };
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
+     "stylelint-config-tailwindcss",
    ],
  };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
-     "stylelint": "stylelint '**/*.css'",
-     "stylelint:fix": "stylelint --fix '**/*.css'"
+     "stylelint": "stylelint '**/*.{css,jsx,tsx}'",
+     "stylelint:fix": "stylelint --fix '**/*.{css,jsx,tsx}'"
    },
    "lint-staged": {
      // ...
-     "*.css": "stylelint --fix"
+     "*.{css,jsx,tsx}": "stylelint --fix"
    }
  }
```

### SCSS

You can use `sass-embedded` instead of `sass`.

```shell
npm i -D sass stylelint-config-standard-scss
# If you have installed stylelint-config-standard
npm r stylelint-config-standard
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
-     "stylelint-config-standard",
+     "stylelint-config-standard-scss",
    ],
  };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
-     "stylelint": "stylelint '**/*.css'",
-     "stylelint:fix": "stylelint --fix '**/*.css'"
+     "stylelint": "stylelint '**/*.{css,scss}'",
+     "stylelint:fix": "stylelint --fix '**/*.{css,scss}'"
    },
    "lint-staged": {
      // ...
-     "*.css": "stylelint --fix"
+     "*.{css,scss}": "stylelint --fix"
    }
  }
```

### Less

```shell
npm i -D less stylelint-config-standard-less
# If you have installed stylelint-config-standard
npm r stylelint-config-standard
```

```diff
  // stylelint.config.js
  export default {
    extends: [
      // ...
-     "stylelint-config-standard",
+     "stylelint-config-standard-less",
    ],
  };
```

```diff
  // package.json
  {
    "scripts": {
      // ...
-     "stylelint": "stylelint '**/*.css'",
-     "stylelint:fix": "stylelint --fix '**/*.css'"
+     "stylelint": "stylelint '**/*.{css,less}'",
+     "stylelint:fix": "stylelint --fix '**/*.{css,less}'"
    },
    "lint-staged": {
      // ...
-     "*.css": "stylelint --fix"
+     "*.{css,less}": "stylelint --fix"
    }
  }
```

### React

You can use `@vitejs/plugin-react-swc` instead of `@vitejs/plugin-react`.

1. Install packages

    ```shell
    npm i react react-dom
    npm i -D @types/react @types/react-dom @vitejs/plugin-react
    ```

2. Configure Vite

    ```diff
      // vite.config.ts
    + import react from '@vitejs/plugin-react';

      export default {
        plugins: [
          // ...
    +     react(),
        ],
      } satisfies UserConfig;
    ```

3. Configure `tsconfig.json`

    ```diff
      // tsconfig.json
      {
        "compilerOptions": {
          // ...
    +     "jsx": "react-jsx"
        }
      }
    ```

4. Set up linters

    ```diff
      // eslint.config.js
      export default antfu({
        // ...
    +   react: true,
      });
    ```

    ```shell
    npm run lint
    ```

### Vue

1. Install packages

    ```shell
    npm i vue
    npm i -D @vitejs/plugin-vue vue-tsc stylelint-config-standard-vue
    # If you have installed stylelint-config-standard
    npm r stylelint-config-standard
    ```

2. Configure vite

    ```diff
      // vite.config.ts
    + import vue from '@vitejs/plugin-vue';

      export default {
        plugins: [
          // ...
    +     vue(),
        ],
      } satisfies UserConfig;
    ```

    ```diff
      // package.json
      {
        "scripts": {
          // ...
    -     "build": "tsc && vite build",
    +     "build": "vue-tsc && vite build",
        }
      }
    ```

3. Configure `tsconfig.json`

    ```diff
      // tsconfig.json
      {
        // ...
    +   "include": ["**/*", "**/*.vue"]
      }
    ```

4. Set up linters

    ```diff
      // stylelint.config.js
      export default {
        extends: [
          // ...
    -     "stylelint-config-standard",
    +     "stylelint-config-standard-vue",
        ],
      };
    ```

    ```diff
      // package.json
      {
        "scripts": {
          // ...
    -     "stylelint": "stylelint '**/*.css'",
    -     "stylelint:fix": "stylelint --fix '**/*.css'"
    +     "stylelint": "stylelint '**/*.{css,vue}'",
    +     "stylelint:fix": "stylelint --fix '**/*.{css,vue}'"
        },
        "lint-staged": {
          // ...
    -     "*.css": "stylelint --fix"
    +     "*.{css,vue}": "stylelint --fix"
        }
      }
    ```

### Svelte

1. Install packages

    ```shell
    npm i -D @sveltejs/vite-plugin-svelte svelte-check postcss-html stylelint-config-html
    ```

2. Configure Vite

    ```diff
      // vite.config.ts
    + import { svelte } from '@tsconfig/svelte';

      export default {
        plugins: [
          // ...
    +     svelte(),
        ],
      } satisfies UserConfig;
    ```

    ```diff
      // svelte.config.js
    + import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
    +
    + /**
    + * @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig}
    + */
    + export default {
    +   preprocess: vitePreprocess(),
    + };
    ```

    ```diff
      // package.json
      {
        "scripts": {
          // ...
    -     "build": "tsc && vite build",
    +     "build": "vite build",
          // ...
    +     "check": "svelte-check && tsc --excludeDirectories src"
        }
      }
    ```

3. Configure `tsconfig.json`

    ```diff
      // tsconfig.json
      {
        // ...
    +   "include": ["**/*", "**/*.svelte"]
      }
    ```

4. Set up linters

    ```diff
      // eslint.config.js
      export default antfu({
        // ...
    +   svelte: true,
      });
    ```

    ```shell
    npm run lint
    ```

    ```diff
      // stylelint.config.js
      export default {
        extends: [
          // ...
    +     "stylelint-config-html/svelte",
        ],
      };
    ```

    ```diff
      // package.json
      {
        "scripts": {
          // ...
    -     "stylelint": "stylelint '**/*.css'",
    -     "stylelint:fix": "stylelint --fix '**/*.css'"
    +     "stylelint": "stylelint '**/*.{css,svelte}'",
    +     "stylelint:fix": "stylelint --fix '**/*.{css,svelte}'"
        },
        "lint-staged": {
          // ...
    -     "*.css": "stylelint --fix"
    +     "*.{css,svelte}": "stylelint --fix"
        }
      }
    ```

### Solid

1. Install packages

    ```shell
    npm i solid-js
    npm i -D vite-plugin-solid
    ```

2. Configure Vite

    ```diff
      // vite.config.ts
    + import solid from 'vite-plugin-solid';

      export default {
        plugins: [
          // ...
    +     solid(),
        ],
      } satisfies UserConfig;
    ```

3. Configure `tsconfig.json`

    ```diff
      // tsconfig.json
      {
        "compilerOptions": {
          // ...
    +     "jsx": "preserve",
    +     "jsxImportSource": "solid-js"
        }
      }
    ```

4. Set up linters

    ```diff
      // eslint.config.js
      export default antfu({
        // ...
    +   solid: true,
      });
    ```

    ```shell
    npm run lint
    ```

## Scripts

```shell
# Start vite
npm run dev

# Build for production
npm run build

# Lint with ESLint
npm run lint

# Lint and fix with ESLint
npm run lint:fix
```

## License

browser-extension-template by Level222 is marked with [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
