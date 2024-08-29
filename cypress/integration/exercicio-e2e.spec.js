/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Escolher 4 produtos
        cy.get('.products > .row').eq(0).click(); // Seleciona o primeiro produto
        cy.get('.add-to-cart').click(); // Adiciona o produto ao carrinho

        cy.get('.product').eq(1).click(); // Seleciona o segundo produto
        cy.get('.add-to-cart').click(); // Adiciona o produto ao carrinho

        cy.get('.product').eq(2).click(); // Seleciona o terceiro produto
        cy.get('.add-to-cart').click(); // Adiciona o produto ao carrinho

        cy.get('.product').eq(3).click(); // Seleciona o quarto produto
        cy.get('.add-to-cart').click(); // Adiciona o produto ao carrinho

        // Ir para o carrinho
        cy.get('.cart-icon').click(); // Ícone ou link para o carrinho
        
        // Verificar se os produtos estão no carrinho
        cy.get('.cart-item').should('have.length', 4);

        // Proceder para o checkout
        cy.get('.checkout-button').click(); // Botão para iniciar o checkout
        
        // Preencher detalhes no checkout
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="address"]').type('123 Main St');
        cy.get('input[name="city"]').type('Anytown');
        cy.get('input[name="zip"]').type('12345');
        cy.get('select[name="country"]').select('United States');
        cy.get('input[name="phone"]').type('555-1234');

        // Submeter o pedido
        cy.get('.submit-order-button').click(); // Botão para enviar o pedido

        // Validar a compra
        cy.get('.order-confirmation').should('contain', 'Obrigado por sua compra!');
        cy.get('.order-summary').should('contain', '4 produtos');
    });
});
