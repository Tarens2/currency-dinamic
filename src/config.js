export default {
    rootUrl: 'http://query.yahooapis.com/v1/public/yql?q=',
    formatLine: "&format=xml",
    urlCurrenciesTypes(){
        return [
            this.rootUrl,
            encodeURIComponent("select * from xml where url='http://www.cbr.ru/scripts/XML_val.asp?d=0'"),
            this.formatLine
        ].join("");
    },
    urlCurrenciesDynamics(date_req1, date_req2, VAL_NM_RQ){
        return [
            this.rootUrl,
            encodeURIComponent(`select * from xml where url='http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${date_req1}&date_req2=${date_req2}&VAL_NM_RQ=${VAL_NM_RQ}'`),
            this.formatLine
        ].join("");
    },
}