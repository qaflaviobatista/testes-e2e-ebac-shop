///<reference types="cypress"/>

describe('funcionalidade login',() => {

    it('deve fazer login com sucesso', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('usuarioteste2000@teste.com.br')
        cy.get('#password').type('lis050717')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá')
    })
})