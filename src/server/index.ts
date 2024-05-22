import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./routers/_app";
import { Context } from "./auth";

Bun.serve({
  port: 8080,
  fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    console.log("Request received", pathname);

    // Handling the root path
    if (pathname === "/") {
      return new Response("hello world");
    }

    // Handling tRPC requests
    if (pathname.startsWith("/trpc")) {
      return fetchRequestHandler({
        endpoint: "/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({} as Context), // Specify the type of the context object
      });
    }

    // If none of the above, return a 404 response
    return new Response("Not Found", { status: 404 });
  },
});
