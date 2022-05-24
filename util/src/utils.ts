import * as geoip from 'geoip-country'
import { Request } from "express";
export const getCountryCode = (req: Request) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = String(ip).replace("::ffff:", "");
    let countryCode = "unknow";
    try {
        if (ip) {
            const geo = geoip.lookup(ip);
            let country = geo ? geo.country : "unknow";
            countryCode = country;
        }
        if (countryCode) {
            return countryCode;
        }
    } catch (ex) {
        return countryCode;
    }
    return countryCode;
};