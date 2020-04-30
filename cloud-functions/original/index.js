const axios = require('axios');
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const url = "https://api.covid19api.com/country/canada/status/confirmed";

 exports.helloWorld = async (req, res) => {
    switch (req.method) {
        case 'POST':
          const response = await fetchData(req.body.startDate, req.body.endDate);

          if (response.error) {
            res.status(405).send(response);
          } else {
            res.status(200).send(response);
          }
          
          break;
        default:
          res.status(405).send({error: 'Something blew up!'});
          break;
      }
};

async function fetchData(startDate, endDate) {
    const from = dayjs(startDate);
    const to = dayjs(endDate);

    if (!from.isValid() || !to.isValid()) {
        return {
            error: 'Date is invalid',
            data: {}
        };
    }

    try {
      const response = await axios.get(`${url}?from=${from.utc().format()}&to=${to.utc().format()}`);
      return {
          data: response.data
        };
    } catch (error) {
      console.log(error);
    }
};

function transformData(data) {
    const dataTransformed = [];

    if (data) {
        for (let row of data) {
            dataTransformed.push({
                name: row.
            })
        }
    }
    return data;
}