/// <reference types="Cypress" />

import { registerPage } from '../../Page_objects/register'

const faker = require('faker');

describe('register page', ()=>{

    let userNumber = 8;
    let randomEmail= faker.internet.email();
    let randomPassword= faker.internet.password();
    

    before('visit url', () => {
        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
    })

    it('get free trial', ()=>{
        registerPage.freeSignUpButton.click({ force: true });
    })

    it('register without email', ()=>{
        registerPage.noEmail(randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('be.visible');
    })

    it('register without password', ()=>{
        registerPage.noPassword(randomEmail, userNumber);
        registerPage.submit();
        registerPage.passwordErrorMessageField.should('be.visible');
    })

    it('register without userNumber', ()=>{
        registerPage.noUsers(randomEmail, randomPassword);
        registerPage.submit();
        registerPage.userNumberErrorMessageField.should('be.visible');
    })

    it('enter random credentials', ()=>{
        registerPage.register(randomEmail, randomEmail, userNumber)
        registerPage.submit();
    })
})