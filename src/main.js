import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './serviceLogic.js'

function conversion(response) {
  let dollar = $('#USD').val();
  let code = $("#code").val();
  let newValue = response.conversion_rates[code] * dollar;
  console.log(dollar);
  console.log(code);
  console.log(newValue)
  $('#showHere').html("your " + dollar + " has been converted to " + newValue + " " + code + ".")
}

$(document).ready(function(){
  $('#form1').submit(function() {
    event.preventDefault();
    CurrencyExchange.getRates()
      .then(function(response) {
        conversion(response)
      })

  })
})