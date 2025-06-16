describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Exercicio -> Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Pedro Henrique');
    cy.get('#lastName').type('Ribeiro');
    cy.get('#email').type('pedro@msn.com');
    cy.get('#open-text-area').type('Muito bom');
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
  });

  it('Extra 1 -> Preenche os campos obrigatórios e envia o formulário', () => {
    const bigText = Cypress._.repeat('Muito bom!', 5);

    cy.get('#firstName').type('Pedro Henrique');
    cy.get('#lastName').type('Ribeiro');
    cy.get('#email').type('pedro@msn.com');
    cy.get('#open-text-area').type(bigText, { delay: 0 });
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
  });

  it('Extra 2 -> Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Pedro Henrique');
    cy.get('#lastName').type('Ribeiro');
    cy.get('#email').type('pedro.com.br');
    cy.get('#open-text-area').type('Olá');
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible');
  });

  it('Extra 3 -> Campo de telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('input[name="firstName"]').type('Pedro Henrique');
    cy.get('#lastName').type('Ribeiro');
    cy.get('#email').type('pedro.com.br');
    cy.get('#phone').type('abcd').should('have.value', '');
    cy.get('#open-text-area').type('Olá');
    cy.get('input[id="phone-checkbox"]').check();
    cy.contains('button', 'Enviar').click()
  });


  it('Extra 4 -> Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Pedro Henrique');
    cy.get('#lastName').type('Ribeiro');
    cy.get('#email').type('pedro@gmail.com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Olá');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('Extra 5 -> Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Pedro Henrique')
      .should('have.value', 'Pedro Henrique')
      .clear()
      .should('have.value', '');

    cy.get('#lastName').type('Ribeiro').should('have.value', 'Ribeiro').clear().should('have.value', '');
    cy.get('#email').type('pedro@gmail.com').should('have.value', 'pedro@gmail.com').clear().should('have.value', '');
    cy.get('#phone').type('30379204').should('have.value', '30379204').clear().should('have.value', '');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Olá');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('Extra 6 -> Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar')
      .click();

    cy.get('.error').should('be.visible');
  });

  it('Extra 7.1 -> Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit1();

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
  });

  it('Extra 7.2 -> Envia o formuário com sucesso usando um comando customizado', () => {

    const data = {
      firstName: 'Pedro Henrique',
      lastName: 'Ribeiro',
      email: 'pedro_aser@hotmail.com',
      text: 'Olá'
    }

    cy.fillMandatoryFieldsAndSubmit2(data);

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
  });

  it('Extra 7.3 -> Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit3();

    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
  });

  it('Extra 8 -> Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('youtube')
      .should('not.have.value', 'Youtube');
  });

  it('Extra 9 -> Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('Extra 10 -> Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('include.text', 'B');
  });

  it('Extra 11 -> Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .should('not.be.checked')
      .check()
      .should('be.checked');
  });

  it('Extra 12 -> Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked');
      });
  });

  it('Extra 13 -> Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .each(check => { // delete
        cy.wrap(check) // .check()
          .check()
          .last()
          .uncheck()
      })
  });

  it('Extra 14 -> Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile({
        contents: 'cypress/fixtures/example.json',
        fileName: 'example.json',
        lastModified: Date.now()
      })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('Extra 15 -> Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
  });

  it('Extra 16 -> Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivo')
    cy.get('#file-upload')
      .selectFile('@arquivo')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  })

  it('Extra 17 -> Verifica que a politica de privacidade abre em outra aba sem a necessidade de clicar', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  });

  it('Extra 18 -> Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
      .click();
  });

  it('Extra 19 -> Remove o atributo target do elemento', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click();

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible',);
  });
})
