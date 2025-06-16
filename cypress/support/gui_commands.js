Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', () => {
  cy.get('#firstName').type('Pedro Henrique');
  cy.get('#lastName').type('Ribeiro');
  cy.get('#email').type('pedro@msn.com');
  cy.get('#open-text-area').type('Muito bom');
  cy.contains('button', 'Enviar').click()
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
  cy.get('#firstName').type(data.firstName);
  cy.get('#lastName').type(data.lastName);
  cy.get('#email').type(data.email);
  cy.get('#open-text-area').type(data.text);
  cy.contains('button', 'Enviar').click()
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
  firstName: 'José',
  lastName: 'Silva',
  email: 'jose@gmail.com',
  text: 'Oi'
}) => {
  cy.get('#firstName').type(data.firstName);
  cy.get('#lastName').type(data.lastName);
  cy.get('#email').type(data.email);
  cy.get('#open-text-area').type(data.text);
  cy.contains('button', 'Enviar').click()
});