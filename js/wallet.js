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
    $.post('asasass/asasasa/', {
        amount, dir, dirWallet: sessionStorage.getItem('dirWallet')
    }, (data, status) => {
        // mostrado de datos
    })
})


// actualizado de monto
$('#update-amount').click(function () {
    $.get('asas/asas', {
        dirWallet: sessionStorage.getItem('dirWallet')
    }, (data, status) => {
        $('#amount-wallet').html(`$ ${$.number(data, 2)}`)
    })
})