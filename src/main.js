import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './serviceLogic.js'

function conversion(response) {
  let newValue = response.conversion_rates.${code} * dollar;
  $('#showHere').html("your " + dollar + " has been converted to " + newValue + " " + code + ".")
}

$(document).ready(function(){
  $('#form1').submit(function() {
    let dollar = $('#USD').val();
    let code = $("#code").val();
    clearFields(); // create function
    CurrencyExchange.getRates()
      .then(function(response) {
        conversion(response)
      })

  })
})