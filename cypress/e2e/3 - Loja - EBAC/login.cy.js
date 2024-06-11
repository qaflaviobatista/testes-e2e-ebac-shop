///<reference types="cypress"/>

describe('funcionalidade login',() => {

    //Antes de cada cenário o "beforEach" é chamado
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('deve fazer login com sucesso', () => {
        cy.get('#username').type('usuarioteste2000@teste.com.br')
        cy.get('#password').type('lis050717')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá')
    })

    it('deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('dududu@teste.com.br')
        cy.get('#password').type('lis050717')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain','Endereço de e-mail desconhecido')   
    });

    it('deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('usuarioteste2000@teste.com.br')
        cy.get('#password').type('lis0507178')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain','Erro: A senha fornecida para o e-mail')
               

    });
})