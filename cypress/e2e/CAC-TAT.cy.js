describe('Central de Atendimento ao Cliente TAT', () => {

  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
  
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Natalia')
    cy.get('#lastName').type('Sousa')
    cy.get('#email').type('nataliacarvalhoreis@gmail.com')
    cy.get('#open-text-area').type(longText, { delay:0 })
    cy.contains('button', 'Enviar').click()

    cy.get('span.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Natalia')
    cy.get('#lastName').type('Sousa')
    cy.get('#email').type('nataliacarvalhoreis.gmail.com')
    cy.get('#open-text-area').type(longText, { delay:0 })
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Natalia')
    cy.get('#lastName').type('Sousa')
    cy.get('#email').type('nataliacarvalhoreis.gmail.com')
    cy.get('#open-text-area').type(longText, { delay:0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Natália')
    .should('have.value', 'Natália')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Sousa')
    .should('have.value', 'Sousa')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('nataliacarvalhoreis@gmail.com')
    .should('have.value', 'nataliacarvalhoreis@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('3189892053')
    .should('have.value', '3189892053')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Natália',
      lastName: 'Sousa',
      email: 'nataliacarvalhoreis@gmail.com',
      text: 'Teste'
    }

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]') //pega todos os elementos do tipo radio
    .each(tipoDeAtendimento => { // percorre por cada um dos elementos que ele encontrou
      cy.wrap(tipoDeAtendimento) // 'empacota' cada elemento para usar um por vez
      .check()
      .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check() //marca todos os checkbox que encontrar
    .should('be.checked') //valida que eles estao marcados
    .last() //pega o último checkbox
    .uncheck() // desmarca ele
    .should('not.be.checked') // valida que ele não esta marcado - verificação de resultado
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') //cria um alias pro arquivo que esta na pasta fixtures
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
     .should('be.visible')
  })
})
