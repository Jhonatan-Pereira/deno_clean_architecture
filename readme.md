# Deno Version
- deno 1.33.3 (release, x86_64-unknown-linux-gnu)
- v8 11.4.183.2
- typescript 5.0.4

# Run Project
```sh
deno task dev --unstable --allow-read --allow-env
```

# Run Test
```sh
# Run all tests
deno test --watch --unstable --allow-read --allow-env

# Run specefic test
deno test tests/calc_test.ts

# Run test modules in parallel
deno test --parallel
```

# Commands Node.js
```sh
npm i -D jest ts-jest @types/jest @types/node ts-node-dev
npx rs-jest config:init
npm i knex pg
npm i -D dotenv
npm i uuid
npm i -D @types/uuid
```

# Links
- [Manual Deno KV](https://deno.com/manual@v1.34.0/runtime/kv)