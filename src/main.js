import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './serviceLogic.js'
import {Codes} from './currencyCodes.js'

function conversion(response) {
  let dollar = $('#USD').val();
  let code = $("#code").val();
  if (typeof(response.conversion_rates[code]) === "number") {
    let newValue = response.conversion_rates[code] * dollar;
    let finalValue = newValue.toFixed(2)
    $('#showHere').html("your " + dollar + " has been converted to " + finalValue + " " + code + ". 1 US dollar is equal to " + response.conversion_rates[code] + " " + code)
    } else {
    $('#showHere').html("Your country code is wrong!")
    }
}

function clearFields() {
  $("#USD").val('');
  $('#code').val('');
}

Codes.forEach(function(element) {
  $("#sideBar").append("<li>" + element + "</li>")
})

$(document).ready(function(){
  $('#form1').submit(function() {
    event.preventDefault();
    CurrencyExchange.getRates()
      .then(function(response) {
        conversion(response)
        clearFields();
      })
      .catch(function(error) {
      $("#showHere").html(`There was an error getting the current rates in our backend: ${error.message}`)
      })
  })
})

