describe('Multi-Turn Conversational AI & Intent Validation', () => {
  beforeEach(() => {
    // Navigate to the support portal and open the AI chat widget
    cy.visit('/support');
    cy.get('[data-testid="chat-widget-trigger"]').click();
    
    // Intercept the LLM backend to ensure deterministic, fast NLP testing
    cy.intercept('POST', '/api/v1/chat/completions').as('chatInference');
  });

  it('Should retain session context and handle mid-conversation intent switches', () => {
    
    // ==========================================
    // TURN 1: Initial Intent (Order Status)
    // ==========================================
    cy.get('[data-testid="chat-input"]').type('I need help finding my recent order{enter}');
    cy.wait('@chatInference').its('response.statusCode').should('eq', 200);
    
    cy.get('[data-testid="chat-message-bot"]').last()
      .should('contain.text', 'I can help with that. Could you please provide your order number?');

    // ==========================================
    // TURN 2: Entity Extraction & State Building
    // ==========================================
    cy.get('[data-testid="chat-input"]').type('Sure, it is ORD-998877{enter}');
    cy.wait('@chatInference');
    
    // Verify the bot extracted the entity (ORD-998877) and mapped the correct state
    cy.get('[data-testid="chat-message-bot"]').last()
      .should('contain.text', 'Thank you. I see order ORD-998877 is currently being packed.');

    // ==========================================
    // TURN 3: Intent Switch & Context Retention
    // ==========================================
    // The user suddenly changes their mind. The bot must recognize the new intent (Cancellation) 
    // while remembering the context (ORD-998877) from Turn 2.
    cy.get('[data-testid="chat-input"]').type('Actually, cancel that order instead.{enter}');
    cy.wait('@chatInference');
    
    cy.get('[data-testid="chat-message-bot"]').last().within(() => {
      // Validates Intent Recognition has switched to 'Order_Cancellation'
      cy.contains('Are you sure you want to cancel'); 
      // Validates Session Memory retained the entity from the previous turn
      cy.contains('ORD-998877'); 
    });

    // Verify the UI rendered the correct dynamic action buttons based on the new intent
    cy.get('[data-testid="action-btn-confirm-cancel"]').should('be.visible');
    cy.get('[data-testid="action-btn-keep-order"]').should('be.visible');
  });
});
