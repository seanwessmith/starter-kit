"use client";

// * Uncomment the following lines to use Supabase on the client

import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/server/types/database.types";
import { sdk } from "@/server/sdkHandler";
import "./style.scss";

// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export default function AboutPage() {
  const [people, setPeople] = useState<StarterKit.Person[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Starter Kit - About";
  }, []);
  useEffect(() => {
    async function fetchData() {
      // const { data } = await supabase.from("people").select("*").order("name"); // Use Supabase on the client
      const { people: data } = await sdk.people.employed.get.query(); // Use Supabase on the server
      if (!data) {
        setError("Failed to fetch data from Supabase.");
      } else {
        setPeople(data);
      }
      setLoading(true);
    }
    fetchData();
  }, []);

  function timestampToDate(timestamp: string) {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  }

  return (
    <div className="about-page">
      <h1>About Page</h1>
      <p></p>
      <div>
        {loading ? <></> : <p>Loading...</p>}
        {error ? <p>{error}</p> : <></>}
        {people.length > 0 ? (
          <table className="text-white">
            <thead>
              <tr>
                <th className="noselect">ID</th>
                <th className="noselect">Name</th>
                <th className="noselect">Title</th>
                <th className="noselect">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <tr key={index}>
                  <td className="px-4">{person.id}</td>
                  <td className="px-4">{person.name}</td>
                  <td className="px-4">{person.title}</td>
                  <td className="px-4">{timestampToDate(person.startdatetimestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
