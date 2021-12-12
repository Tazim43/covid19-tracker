import React, { useEffect, useState } from "react";
import milify from "millify";

export default function Table() {
   const [data, setData] = useState([
      {
         name: "",
         cases: 0,
      },
   ]);

   useEffect(() => {
      async function getData() {
         // fetching the data of all countries
         await fetch("/v3/covid-19/countries")
            .then((res) => res.json())
            .then((data) => {
               const table = data.map((res) => ({
                  name: res.country,
                  cases: res.cases,
               }));
               setData(table);
            })
            .catch((err) => {
               console.log(err);
            });
      }
      getData();
   }, []);

   return (
      <div className="Table__main">
         <h2>Total cases by country</h2>
         {data.map((res, index) => (
            <div key={Math.random()}>
               <div className={index % 2 ? "Table__odd" : "Table__even"}>
                  <div>{res.name}</div>
                  <div>
                     {milify(res.cases, {
                        precision: 2,
                     })}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
