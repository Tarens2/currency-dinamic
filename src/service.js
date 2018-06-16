import { parseString } from 'xml2js';
import jsonp from 'jsonp';
import moment from 'moment';
import urls from './config';

export default {
  fetchByDate(daysCount, selectedCurrency) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const dateReq2 = moment().format('DD.MM.YYYY');
      const dateReq1 = moment(now.setDate(now.getDate() - daysCount)).format('DD.MM.YYYY');
      jsonp(
        urls.urlCurrenciesDynamics(dateReq1, dateReq2, selectedCurrency),
        null, (err, response) => {
          if (err) reject(err);
          parseString(response.results[0], (err2, result) => {
            if (err2) reject(err2);
            resolve(result.ValCurs.Record);
          });
        },
      );
    });
  },
  fetchCurrencies() {
    return new Promise((resolve, reject) => {
      jsonp(urls.urlCurrenciesTypes(), null, (err, data) => {
        if (err) reject(err);
        parseString(data.results[0], (err2, result) => {
          if (err2) reject(err2);
          resolve(result.Valuta.Item);
        });
      });
    });
  },
};
