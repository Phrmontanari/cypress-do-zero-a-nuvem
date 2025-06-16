describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('https://laura-tst.tjce.jus.br/');
  });

  it('Verifica o título da aplicação e realiza login', () => {
    cy.url().should('include', 'laura');

    cy.contains('button', 'Entrar').click();

    cy.loginSSO();

    cy.contains('button', 'Cálculo Cível').click();

    cy.get('[data-cy="entityCreateButton"]').click();

    cy.get('input[placeholder="NPU do processo"]').type('39248781920098060174');

    cy.contains('button', 'Criar cálculo').click();

    cy.contains('button', 'Criar novo cálculo').click()

    cy.contains('Erro interno do servidor.').should('be.visible')
  });
});
