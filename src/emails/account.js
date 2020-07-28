const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')

const mandarEmailPedido = (produto, pedido) => {
    sgMail.send({
        to: produto.email,
        from: 'viniciusmeres1@gmail.com',
        subject: 'Seu produto tem um novo pedido',
        text: `Olá, seu produto ${produto.nome} no Ateliê Ascii tem um novo pedido. Nome do comprador: ${pedido.nome} ${pedido.sobrenome},
        CPF: ${pedido.cpf}, Celular: ${pedido.celular}, Email: ${pedido.email}, Endereço: Rua ${pedido.rua}, ${pedido.bairro}, 
        Nº ${pedido.numero}, ${pedido.cidade} - ${pedido.estado}, Complemento: ${pedido.complemento}`
    })
}

module.exports = mandarEmailPedido