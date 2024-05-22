import { employedRouter } from "./employed";
import { mergeRouters, router } from "../../trpc";

// This example demonstrates how to use the mergeRouters function to combine multiple routers into a single router.
// The employedRouter is imported from the employed module and merged with the people router to create the asiRouter.

export const peopleRouter = mergeRouters(
  router({
    employed: employedRouter,
  })
);
