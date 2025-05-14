Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = { //se não passar nenhum objeto, ele usa os valores padrão informados aqui
    firstName: 'Padrão',
    lastName: 'Teste',
    email: 'teste@gmail.com',
    text: 'Valor padrão do teste'
}) => {//se passar valores, ele usa o que foi passado
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})