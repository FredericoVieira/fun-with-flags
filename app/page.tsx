"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { countriesApi } from "./services";
import { Card, Grid, Search } from "./components";

type Country = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountries(response);
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name }) =>
    name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <Grid>
        {filteredCountries.map(
          ({ cca3, flags, name, capital, region, population }, index) => {
            const { svg: flag } = flags ?? {};
            const { common: countryName } = name ?? {};
            const [capitalName] = capital ?? [];

            return (
              <Link key={cca3} href={`/country/${cca3}`}>
                <Card
                  index={index}
                  flag={flag}
                  name={countryName}
                  capital={capitalName}
                  region={region}
                  population={population}
                />
              </Link>
            );
          }
        )}
      </Grid>
    </>
  );
}
