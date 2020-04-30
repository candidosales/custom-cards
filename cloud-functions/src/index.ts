"use strict";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const url = "https://api.covid19api.com/country/canada/status/confirmed";

export interface DataApiCovid {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  Cases: number;
  Date: string;
}

export interface DataChart {
  name: string;
  value: number;
}

export interface ResponseData {
  error?: string;
  data: any;
}

export const helloWorld = async (req: any, res: any) => {
  switch (req.method) {
    case "POST":
      const response = await fetchData(req.body.startDate, req.body.endDate);

      if (response.error) {
        res.status(405).send(response);
      } else {
        res.status(200).send(response);
      }

      break;
    default:
      res.status(405).send({ error: "Something blew up!" });
      break;
  }
};

async function fetchData(
  startDate: string,
  endDate: string
): Promise<ResponseData> {
  const from = dayjs(startDate);
  const to = dayjs(endDate);

  if (!from.isValid() || !to.isValid()) {
    return {
      error: "Date is invalid",
      data: {},
    };
  }

  try {
    // Fetch Data via API
    const response = await axios.get(
      `${url}?from=${from.utc().format()}&to=${to.utc().format()}`
    );
    return {
      // Transform Data
      data: response.data.map((row) => {
        return {
          name: row.Date,
          value: row.Cases
        }
      })
    };
  } catch (error) {
    return {
      error: error,
      data: {},
    };
  }
}
