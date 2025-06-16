Cypress.Commands.add('loginSSO', () => {
  cy.origin('https://sso-suporte.tjce.jus.br', () => {
    cy.get('#username').type('75693151115');
    cy.get('#kc-login').click();
  });
});