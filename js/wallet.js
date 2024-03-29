
//apenas se cargue se actualiza el saldo de la cuenta
$(document).ready(function () {
  updateAmount()
})


// verificacion de que se haya iniciado una wallet
if (sessionStorage.getItem('dirWallet') == null) {
  location.href = 'index.html'
}

// dar formato de moneda al monto
$('.number').number(true, 2)

// envio de dinero
$('#form-send-money').submit(function (e) {
  e.preventDefault()
  let amount = $(this).find('.number').val()
  let dir = $(this).find('.dir').val()
  let json = {
    origin: 'wallet',
    operation: 'record_transaction',
    from: sessionStorage.getItem('dirWallet'),
    to: dir,
    amount: amount
  }
  $.post(`http://${ipCoordinator}/resource`, { 'JSON': JSON.parse(json) }, (data, status) => {
    // mostrado de datos
    if (data.status) {
      updateAmount()
    }
  })
})



// actualizado de monto
$('#update-amount').click(updateAmount)

/**
 * Actuliza el saldo de la wallet
 */
function updateAmount() {
  let json = {
    origin: 'wallet',
    operation: 'get_funding',
    account: sessionStorage.getItem('dirWallet')
  }
  $.post(`http://${ipCoordinator}/resource`, { 'JSON': JSON.parse(json) }, (data, status) => {
    if (data.status) {
      $('#amount-wallet').html(`$ ${$.number(data.amount, 2)}`)
    }
  })
}