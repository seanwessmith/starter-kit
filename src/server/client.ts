import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./routers/_app";

async function main() {
  const url = "http://127.0.0.1:8080/trpc";

  const sdk = createTRPCClient<AppRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url,
      }),
    ],
  });

  const people = await sdk.people.employed.get.query();
  console.log("👌", people);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
