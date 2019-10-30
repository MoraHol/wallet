var flagRecuperate = false


// verificar si existio antes alguna wallet
if (localStorage.getItem('timestampkey') != null) {
  $.confirm({
    title: 'Recuperacion de Wallet',
    content: 'Tuviste una wallet en este equipo ¿Quieres Recuperarla?',
    buttons: {
      Si: function () {
        $('#title-form').text('Recuperacion de cuenta')
        $('#form-submit').text('Recuperar Wallet')
        $('#alerts').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Hola ¿Quieres Recuperar tu Wallet?!</strong> Ingresa tu correo y las 12 palabras con que registro su Wallet.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`)
        flagRecuperate = true
      },
      No: function () {
        flagRecuperate = false
      }
    }
  })
}

// cuando se hace el envio del formulario
$('#form-register').submit(function (e) {
  e.preventDefault()
  let string = ""
  $(this).find(':input').each(function () {
    string += $(this).val()
  })

  // envio al middelware de la llave generada
  if (flagRecuperate) {
    // si es una recuperacion de cuenta se revisara si existe la wallet
    string += localStorage.getItem('timestampkey')
    let json = {
      origin: 'wallet',
      operation: 'get_funding',
      account: sha256(string)
    }
    $.post(`http://${ipCoordinator}/resource`, { 'JSON': JSON.parse(json) }, (data, status) => {
      if (data.status) {
        // se guarda la direccion de wallet en la session 
        sessionStorage.setItem('dirWallet', sha256(string))
        location.href = 'wallet.html'
      } else {
        $.notify({
          message: 'Esta wallet no exsite <br> Por favor revisa las 12 palabras'
        }, {
          type: 'danger'
        })
      }
    })
  } else {
    let timestamp = Date.now()
    string += timestamp
    // se guarda el timestamp por recupereacion 
    localStorage.setItem('timestampkey', timestamp)
    // se guarda la direccion de wallet en la session 
    sessionStorage.setItem('dirWallet', sha256(string))
    // Se manda el registro de la wallet
    let json = {
      'origin': 'wallet',
      'operation': 'record_transaction',
      'from': sha256(string),
      'to': sha256(string),
      'amount': 0
    }
    $.post(`http://${ipCoordinator}/resource`, {
      'JSON': JSON.parse(json)
    }, (data, status) => {
      // si es exitoso Entra
      if (data.status) {
        location.href = 'wallet.html'
      }
    })
  }
})