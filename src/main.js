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
    let finalValue = newValue.toFixed(2);
    $('#showHere').html("your " + dollar + " has been converted to " + finalValue + " " + code + ". 1 US dollar is equal to " + response.conversion_rates[code] + " " + code);
    } else {
    $('#showHere').html("Your country code is wrong!")
    }
}

function anyConversion(response, val1, val2) {
  let rate = response.conversion_rate;
  let money = $("#money").val();
  let mathOutput = money * rate;
  if (typeof(response.conversion_rate) === "number") {
    $("#showHere2").html("Your " + money + " in " + val1 + " has been converted to " + mathOutput + " in " + val2 + ".");
  } else {
    $("#showHere2").html("One of your codes must be wrong!");
  }
}

function clearFields() {
  $("#USD").val('');
  $('#code').val('');
  $("#currency1").val('');
  $('#currency2').val('');
  $('#money').val('');
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
        clearFields()
      })
      .catch(function(error) {
      $("#showHere").html(`There was an error getting the current rates in our backend: ${error}`)
      })
  })

  $('#form2').submit(function(){
    event.preventDefault();
    let val1 = $("#currency1").val();
    let val2 = $("#currency2").val();
    CurrencyExchange.anyRate(val1, val2)
      .then(function(response){
        anyConversion(response, val1, val2)
        clearFields()
      })
      .catch(function(error){
        $("#showHere2").html(`There was an error in our backend: ${error}`)
      })
  })


})

