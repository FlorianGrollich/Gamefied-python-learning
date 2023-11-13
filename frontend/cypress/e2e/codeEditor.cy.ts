describe('Code Editor', () => {
  beforeEach(() => {
    // Mock user data
    const user = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser'
    };

    // Set user data in local storage to simulate a logged-in user
    localStorage.setItem('user', JSON.stringify(user));
    cy.visit('http://localhost:3000/editor');
    cy.get('.monaco-editor').type('import ', { delay: 100 });
    cy.get('.monaco-editor').should('contain', 'import');
    cy.get('.monaco-editor').type('{enter}', { delay: 100 });
    cy.get('.monaco-editor').type('im', { delay: 100 });
    cy.wait(500);
    cy.get('.suggest-widget').should('be.visible');
    cy.get('.suggest-widget .monaco-list-row').contains('import').click();
    cy.get('.monaco-editor').should('contain.text', 'import');
  });

  it('should display autocomplete suggestions', () => {
    cy.get('.monaco-editor').type('{enter}', { delay: 100 });
    cy.get('.monaco-editor').type('import ', { delay: 100 });
    cy.get('.monaco-editor').should('contain', 'import');
    cy.get('.monaco-editor').type('{enter}', { delay: 100 });
    cy.get('.monaco-editor').type('im', { delay: 100 });
    cy.wait(500);
    cy.get('.suggest-widget').should('be.visible');
    cy.get('.suggest-widget .monaco-list-row').contains('import').click();
    cy.get('.monaco-editor').should('contain.text', 'import');
  });
});
