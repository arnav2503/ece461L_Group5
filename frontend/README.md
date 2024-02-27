### Frontend Setup

1. Install [Node.js](https://nodejs.org/en)
2. Open a terminal and navigate to the `Project-Directory`
3. Create a new Vite app using `npm create vite@latest`
   * Enter `frontend` as the project name
   * Choose `React` as the framework
   * Choose `TypeScript` as the language
4. Navigate to the `frontend` directory: `cd frontend`
5. Install the packages: `npm install`
6. Install tailwindcss: `npm install tailwindcss postcss autoprefixer`
7. Initialize tailwindcss: `npx tailwindcss init -p`
8. Edit `tsconfig.json` and add the following code:

```json
{
    {
        "compilerOptions": {
            // ...
            "baseUrl": ".",
            "paths": {
                "@/*": [
                    "./src/*"
                ]
            }
            // ...
        }
    }
}
```

9. Run `npm i -D @types/node`
10. Update `vite.config.ts` to include the following code:

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

11. Run the CLI using: `npx shadcn-ui@latest init`
    * Choose `yes` to use TypeScript
    * Choose `Default` as the style
    * Choose `Stone` for the base color
    * Enter `src/index.css` as the global css
    * Choose `yes` to use css variables for color
    * Enter `tailwind.config.js` for the tailwind config file
    * Enter `@/components` for the components directory
    * Enter `@/lib/utils` for the utils directory
    * Select `no` for using React Server Components
12. To add a component use: `npx shadcn-ui@latest add component <component-name>`. The component will be added to the `src/components/ui` directory. Check a list of available components [here](https://ui.shadcn.com/docs/components/accordion)
