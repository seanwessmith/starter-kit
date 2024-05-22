# Starter Kit

## Description

This is a starter kit for React with Next.js and Typescript.
It includes an optional SDK and Supabase database.

## Installation

1. Install bun `curl -fsSL https://bun.sh/install | bash`
2. Clone the repository `git clone https://github.com/seanwessmith/starter-kit`
3. In the repo root `bun install` to install the dependencies
4. In the repo root `bun start` to start the project

## Usage

### Client Pages

1. New pages go in `/app/[page name]/page.tsx`. Where page name is the name of the page and the route.
2. Update /app/clientComponent.tsx to navigate to the appropriate page.

### SDK Routes (optional)

1. New sdk routes go in `/src/server/routers/[route name]`. Where route name is the new route.
2. Create an `/src/server/routers/[route name]/index.ts` file that will mergeRouters from sibling files.
3. Create sibling files with the second route name `/src/server/routers/[route name]/[second route name].ts`.

### Supabase (optional)

1. In the repo root install Supabase cli `brew install supabase/tap/supabase`
2. In the repo root run `supabase login`
3. In the repo root run `bun supabase:create:demo`
4. Open the SQL editor on supabase.com. replace XXXXX with your project id ex: `https://supabase.com/dashboard/project/XXXXX/sql`
5. In the Supabase sql text area run:

      ```sql
      CREATE TABLE people (
          id bigint primary key generated always as identity,
          name VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          startDateTimestamp TIMESTAMP NOT NULL
      );
      INSERT INTO people (name, title, startDateTimestamp) VALUES
      ('John Doe', 'Software Engineer', timestamp '2021-01-01 00:00:00.001'),
      ('Jane Doe', 'Product Manager', timestamp '2022-02-02 00:00:00.001'),
      ('Alice Doe', 'Designer', timestamp '2023-03-03 00:00:00.001'),
      ('Bob Doe', 'QA Engineer', timestamp '2024-04-04 00:00:00.001');
      ```

6. Back in the repo root run `bun run supabase:types`.
7. Uncomment `/app/about/page.tsx` supabase lines. comment out the SDK lines. Alternatively you can comment out the Supabase lines in the SDK if you'd prefer for supabase calls to come from the server.
8. [NOTE] Anytime the schema changes run `bun run supabase:types`.
