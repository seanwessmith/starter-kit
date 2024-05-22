import { initTRPC } from "@trpc/server";
import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import { Context } from "./auth";
import { AuthHandler } from "./auth";
import { AppRouter } from "./routers/_app";

const t = initTRPC.context<Context>().create({
  allowOutsideOfServer: true,
});

export const trpc = createTRPCNext<AppRouter>({
  config: ({}) => ({
    links: [
      httpBatchLink({
        url: `${
          process.platform === "darwin" || !process.platform
            ? "http://localhost:3000"
            : `https://${process.env.VERCEL_DOMAIN}.vercel.app`
        }/api/trpc`,
      }),
    ],
  }),
});

const notAuthed = t.middleware(async ({ ctx, next }) =>
  next({
    ctx: {
      headers: {
        ...ctx.headers,
      },
    },
  })
);

let isAuthenticating = false;
let authenticationPromise: Promise<any> | null = null;

// authenticating is for the ASI endpoints
const authenticateMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.isAuthed) {
    if (!isAuthenticating) {
      isAuthenticating = true;
      const authHandler = new AuthHandler();

      // Initiate authentication and store the promise
      authenticationPromise = authHandler.authenticate().then((authRes) => {
        isAuthenticating = false;
        return authRes;
      });

      // Wait for authentication to complete
      const authRes = await authenticationPromise;
      return next({ ctx: { asi: authRes } });
    } else {
      // Wait for the ongoing authentication to complete
      const authRes = await authenticationPromise;
      return next({ ctx: { asi: authRes } });
    }
  }

  // Proceed with existing authentication information
  return next({ ctx });
});

export const publicProcedure = t.procedure.use(notAuthed);
export const authProcedure = t.procedure.use(authenticateMiddleware);

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const createCallerFactory = t.createCallerFactory;
