export default class CurrencyExchange {
  static getRates() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function(response){
        if (!response.ok) {
        throw Error(response.statusText)
        }
        return response.json();
      })
      .catch(function(error){
        return error;
      })
  }

  static anyRate(val1, val2) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_Key}/pair/${val1}/${val2}`)
      .then(function(response){
        if (!response.ok) {
        throw Error(response.statusText)
        }
        return response.json();
      })
      .catch(function(error){
        return error;
      })
  }
}