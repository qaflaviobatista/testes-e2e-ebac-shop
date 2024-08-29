/// <reference types="cypress" />

const dadosUsuario = require('../fixtures/dados-usuario.json');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkoutclear
        E validando minha compra ao final */

    it('Deve selecionar, configurar e inserir 4 produtos no carrinho', () => {
        const adicionarProdutoAoCarrinho = (index) => {
            // Seleciona o produto na posição `index`
            cy.get('.product-block').eq(index).click();
            // Configura o tamanho e a cor do produto
            cy.get('.button-variable-item').first().click();
            cy.get('.button-variable-item').last().click();
            // Adiciona o produto ao carrinho
            cy.get('.single_add_to_cart_button').click();
            // Verifica se o produto foi adicionado
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', `${index + 1}`).then(() => {
                if (index < 3) {
                    cy.visit('/produtos'); // Volta para a página de produtos para adicionar o próximo item
                    adicionarProdutoAoCarrinho(index + 1); // Chama a função novamente para o próximo produto
                } else {
                    // Quando todos os produtos estiverem adicionados, avança para o checkout
                    cy.get('.woocommerce-message > .button').click();
                    cy.get('.checkout-button').click();
                    // Preenche os dados de faturamento
                    cy.get('.woocommerce-billing-fields > h3').should('contain', 'faturamento');
                    cy.get('#billing_first_name').type(dadosUsuario.nome);
                    cy.get('#billing_last_name').type(dadosUsuario.sobrenome);
                    cy.get('#billing_address_1').type(dadosUsuario.endereco);
                    cy.get('#billing_city').type('Rio de Janeiro');
                    cy.get('#select2-billing_state-container').click();
                    cy.get('.select2-dropdown').should('be.visible');
                    cy.get('.select2-search__field').type('Rio de Janeiro').type('{enter}');
                    cy.get('#billing_postcode').type(dadosUsuario.cep);
                    cy.get('#billing_phone').type(dadosUsuario.telefone);
                    cy.get('#billing_email').type(dadosUsuario.email);
                    cy.get('#payment_method_cod').click();
                    cy.get('#terms').click();
                    cy.get('#place_order').click();
                    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
                }
            });
        };

        //cy.visit('/produtos');
        //adicionarProdutoAoCarrinho(0); // Começa com o primeiro produto
    });
});