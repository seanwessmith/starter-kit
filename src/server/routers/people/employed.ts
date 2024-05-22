import { z } from "zod";
import { router } from "../../trpc.ts";
import { authProcedure } from "../../trpc.ts";
// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/server/types/database.types";

// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const fetchPeople = async (cookie: string) => {
  // const { data } = await supabase.from("people").select("*").order("name"); // Use Supabase on the client
  const data: StarterKit.Person[] = [
    {
      id: 1,
      name: "John Doe",
      title: "Software Engineer",
      startdatetimestamp: "1715401157",
    },
    {
      id: 2,
      name: "Jane Doe",
      title: "Product Manager",
      startdatetimestamp: "1714401157",
    },
    {
      id: 3,
      name: "Alice Doe",
      title: "Designer",
      startdatetimestamp: "1713401157",
    },
    {
      id: 4,
      name: "Bob Doe",
      title: "QA Engineer",
      startdatetimestamp: "1712401157",
    },
  ];
  return data;
};

// discountedPriceOnly uses the ASI API to get the current price of the item. This is quicker but will not return the full price and or discount.
export const employedRouter = router({
  get: authProcedure
    .input(
      z
        .object({
          names: z.array(z.string()).optional(),
          titles: z.array(z.string()).optional(),
          afterStartDate: z.string().optional(),
          beforeStartDate: z.string().optional(),
        })
        .optional()
    )
    .query(
      async ({
        input,
        ctx,
      }): Promise<{
        success: boolean;
        people: StarterKit.Person[];
        error?: string;
      }> => {
        try {
          const { names, titles, afterStartDate, beforeStartDate } =
            input ?? {};
          let people = await fetchPeople(ctx.asi);
          if (!people) {
            return {
              success: false,
              people: [],
              error: "Failed to fetch data from Supabase.",
            };
          }

          if (names && names.length > 0) {
            people = people.filter((person) => names.includes(person.name));
          }

          if (titles && titles.length > 0) {
            people = people.filter((person) => titles.includes(person.title));
          }

          if (afterStartDate) {
            const afterDate = new Date(afterStartDate).getTime();
            people = people.filter(
              (person) =>
                new Date(person.startdatetimestamp).getTime() > afterDate
            );
          }

          if (beforeStartDate) {
            const beforeDate = new Date(beforeStartDate).getTime();
            people = people.filter(
              (person) =>
                new Date(person.startdatetimestamp).getTime() < beforeDate
            );
          }

          return {
            success: true,
            people,
          };
        } catch (error) {
          return {
            success: false,
            people: [],
            error:
              error instanceof Error ? error.message : "error getting peoples",
          };
        }
      }
    ),
});
