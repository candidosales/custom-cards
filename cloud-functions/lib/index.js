"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const url = "https://api.covid19api.com/country/canada/status/confirmed";
exports.helloWorld = async (req, res) => {
    switch (req.method) {
        case "POST":
            const response = await fetchData(req.body.startDate, req.body.endDate);
            if (response.error) {
                res.status(405).send(response);
            }
            else {
                res.status(200).send(response);
            }
            break;
        default:
            res.status(405).send({ error: "Something blew up!" });
            break;
    }
};
async function fetchData(startDate, endDate) {
    const from = dayjs_1.default(startDate);
    const to = dayjs_1.default(endDate);
    if (!from.isValid() || !to.isValid()) {
        return {
            error: "Date is invalid",
            data: {},
        };
    }
    try {
        // Fetch Data via API
        const response = await axios_1.default.get(`${url}?from=${from.utc().format()}&to=${to.utc().format()}`);
        return {
            // Transform Data
            data: response.data.map((row) => {
                return {
                    name: row.Date,
                    value: row.Cases
                };
            })
        };
    }
    catch (error) {
        return {
            error: error,
            data: {},
        };
    }
}
//# sourceMappingURL=index.js.map