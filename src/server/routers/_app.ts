import { peopleRouter } from "./people";
import { mergeRouters, router } from "../trpc";

export const appRouter = mergeRouters(
  router({
    people: peopleRouter,
  })
);

export type AppRouter = typeof appRouter;
