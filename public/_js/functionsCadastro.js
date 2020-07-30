function parar() {
  const btn = document.getElementById('formCadastro')
  btn.addEventListener("submit", (event) => {
    event.preventDefault()
  })
  validar()
}

function enviarDados() {
  console.log('A')
  const nome = document.querySelector('#nome')
  const nasc = document.querySelector('#nasc')
  const celular = document.querySelector('#contato')
  const email = document.querySelector('#email')
  const senha = document.querySelector('#senha')
  const sobrenome = document.querySelector('#sobrenome')
  const cpf = document.querySelector('#cpf')
  const cep = document.querySelector('#cep')
  const numeroCasa = document.querySelector('#numero')
  const cidade = document.querySelector('#cidade')
  const bairro = document.querySelector('#bairro')
  const rua = document.querySelector('#rua')
  const estado = document.querySelector('#estado')
  const complemento = document.querySelector('#complemento')

  const dadosCadastro = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    nascimento: nasc.value,
    cpf: cpf.value,
    celular: celular.value,
    email: email.value,
    senha: senha.value,
    cep: cep.value,
    bairro: bairro.value,
    numero: numeroCasa.value,
    rua: rua.value,
    complemento: complemento.value,
    estado: estado.value,
    cidade: cidade.value
  }
  const dadosCadastroString = JSON.stringify(dadosCadastro)
  console.log(dadosCadastroString);
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/cadastro",
    dataType: 'json',
    data: dadosCadastroString,
    contentType: 'application/json',
    error: function (xhr, ajaxOptions, errorThrown) {
      console.log(xhr.responseJSON.errors)
      console.log(errorThrown)
    }
  }).done((response) => {

  })
}

function mascaraCpf(mascara, input) {
  const vetMask = mascara.split("")
  const numCpf = input.value.replace(/\D/g, "")
  const cursor = Number(input.selectionStart)
  const tecla = (window.event) ? event.keyCode : event.which

  for (let i = 0; i < numCpf.length; i++) {
    vetMask.splice(vetMask.indexOf("_"), 1, numCpf[i])
  }

  input.value = vetMask.join("")

  if (tecla != 37 && (cursor == 3 || cursor == 7 || cursor == 11)) {
    input.setSelectionRange(cursor + 1, cursor + 1)
  } else {
    input.setSelectionRange(cursor, cursor)
  }

}

function mascaraCEP(mascara, input) {
  const vetMask = mascara.split("")
  const numCEP = input.value.replace(/\D/g, "")
  const cursor = Number(input.selectionStart)
  const tecla = (window.event) ? event.keyCode : event.which

  for (let i = 0; i < numCEP.length; i++) {
    vetMask.splice(vetMask.indexOf("_"), 1, numCEP[i])
  }

  input.value = vetMask.join("")

  if (tecla != 37 && cursor == 5) {
    input.setSelectionRange(cursor + 1, cursor + 1)
  } else {
    input.setSelectionRange(cursor, cursor)
  }

}

function validar() {
  var senha = form_cadastro.senha.value;
  var txtcsenha = form_cadastro.txtcsenha.value;

  if (senha == "" || senha.length <= 6) {
    alert('Senha deve conter no mínimo 6 dígitos');
    form_cadastro.senha.focus();
    return false;
  }
  if (txtcsenha != senha) {
    alert('As senhas não coincidem')
    form_cadastro.txtcsenha.focus();
    return false;
  }
}