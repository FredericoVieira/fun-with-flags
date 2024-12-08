"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { countriesApi } from "./services";
import { Card, Grid } from "./components";

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

  return (
    <Grid>
      {countries.map(
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
  );
}
