import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/routers/_app";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/trpc"
    : `https://${process.env.VERCEL_DOMAIN}.vercel.app/api/trpc`;
export const sdk = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url })],
});
