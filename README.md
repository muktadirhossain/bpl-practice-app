# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).


## New Features:🧮 

  - Shop
  - buy tickets
  - Players API 
  - Facebook counter: (optional)

```javascript

name: Deploy to VPS

on:
  push:
    branches:
      - main  # This will run the action on each push to the 'main' branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build Next.js app
        run: npm run build

      - name: Copy files to VPS
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USER: ${{ secrets.SSH_USER }}
          SSH_KEY: ${{ secrets.SSH_KEY }}
          APP_DIRECTORY: ${{ secrets.APP_DIRECTORY }}
        run: |
          echo "$SSH_KEY" > private_key.pem
          chmod 600 private_key.pem
          rsync -avz -e "ssh -i private_key.pem -o StrictHostKeyChecking=no" \
            --exclude=node_modules --exclude=.git ./ $SSH_USER@$SSH_HOST:$APP_DIRECTORY
          rm private_key.pem

      - name: Restart Application with PM2
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USER: ${{ secrets.SSH_USER }}
          SSH_KEY: ${{ secrets.SSH_KEY }}
          APP_DIRECTORY: ${{ secrets.APP_DIRECTORY }}
        run: |
          echo "$SSH_KEY" > private_key.pem
          chmod 600 private_key.pem
          ssh -i private_key.pem -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << EOF
            cd $APP_DIRECTORY
            pm2 restart app || pm2 start npm --name "app" -- start
          EOF
          rm private_key.pem
```

```
https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
```
