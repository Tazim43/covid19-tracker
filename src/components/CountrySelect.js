import React, { useEffect, useState } from "react";
import { Select, FormControl, MenuItem } from "@mui/material";

export default function CountrySelect({ onCountryChange }) {
   const [countries, setCountries] = useState([
      {
         name: "Global",
         country_code: "",
      },
   ]);

   useEffect(() => {
      async function getCountries() {
         // fetching all countries list
         await fetch("/v3/covid-19/countries")
            .then((res) => res.json())
            .then((data) => {
               const countries = data.map((res) => ({
                  name: res.country,
                  country_code: res.countryInfo.iso2,
               }));
               setCountries(() => [{ name: "Global" }, ...countries]);
            })
            .catch((err) => console.log(err));
      }

      getCountries();
   }, []);

   return (
      <div className="CountrySelect__main">
         <FormControl>
            <Select
               variant="outlined"
               defaultValue="global"
               onChange={onCountryChange}
               className="CountrySelect__select-box"
            >
               <MenuItem vlaue="" disabled>
                  Select Places
               </MenuItem>
               {countries.map((data, index) => {
                  if (data.name !== "Aruba") {
                     return (
                        <MenuItem key={index} value={data.name.toLowerCase()}>
                           {data.name}{" "}
                           {data.country_code ? `(${data.country_code})` : null}
                        </MenuItem>
                     );
                  }
                  return null;
               })}
            </Select>
         </FormControl>
      </div>
   );
}
