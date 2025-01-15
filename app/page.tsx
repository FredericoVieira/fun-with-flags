"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { countriesApi } from "./services";
import { Card, Grid, Search, Select } from "./components";

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
  const [selected, setSelected] = useState("All regions");
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

  const regions = [
    "All regions",
    ...new Set(countries.map(({ region }) => region)),
  ];

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name, region }) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All regions" || region === selected;

    return nameMatches && regionMatches;
  });

  return (
    <>
      <div className="flex justify-between mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
        <Select
          options={regions}
          selected={selected}
          setSelected={setSelected}
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
