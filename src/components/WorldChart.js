import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function WorldChart({ country }) {
   const [data, setData] = useState({
      cases: {
         0: 0,
      },
      deaths: {},
      recovered: {},
   });

   useEffect(() => {
      async function getData() {
         await fetch(
            `/v3/covid-19/historical/${
               country === "global" ? "all" : country
            }?lastdays=all`
         )
            .then((res) => res.json())
            .then((value) => {
               if (value.cases) {
                  setData(country === "global" ? value : value.timeline);
               }
            })
            .catch((err) => {
               console.log(err.message);
               alert("No Data found!");
            });
      }
      getData();
   }, [country]);
   return (
      <div className="WorldChart__main">
         <h2 className="WorldChart__title">
            {country === "global"
               ? "Worldwide covid-19 history"
               : `Covid-19 history of ${country}`}
         </h2>
         <Line
            className="worldChart__lineGraph"
            data={{
               labels: Object.keys(data.cases),
               datasets: [
                  {
                     id: 1,
                     label: "cases",
                     data: Object.values(data.cases),
                     backgroundColor: "yellow",
                  },
                  {
                     id: 2,
                     label: "Deaths",
                     data: Object.values(data.deaths),
                     backgroundColor: "red",
                  },
                  {
                     id: 3,
                     label: "Recovered",
                     data: Object.values(data.recovered),
                     backgroundColor: "green",
                  },
               ],
            }}
         />
      </div>
   );
}
