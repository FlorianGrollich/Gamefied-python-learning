describe('Code Editor', () => {
  it('should display autocomplete suggestions', () => {
    cy.visit('http://localhost:3000/editor');
    cy.get('.monaco-editor').type('import ', { delay: 100 });
    cy.get('.monaco-editor').should('contain', 'import');
  });
});