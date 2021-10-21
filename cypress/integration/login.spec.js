/// <reference types="Cypress" />

import { loginPage } from '../../Page_objects/login';

 const faker = require('faker');

describe('login', () => {

    let existingEmail= 'abcd@abcd.com';
    let existingPassword= '12341234';
    let randomEmail= faker.internet.email();
    let randomPassword= faker.internet.password();
    let incorrectPassword= '1234';

    before('visit url', ()=>{
        cy.visit('https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('contain', '/login');
    })

    it('register without email', ()=>{
        loginPage.passwordField.type(randomPassword);
        loginPage.submit();
        loginPage.emailErrorMessage.should('be.visible');
        loginPage.emailErrorMessage.should('have.text', 'The email field must be a valid email');
        loginPage.emailAdressField.should('not.have.text');
    })

    it('register without password', ()=>{
        loginPage.noPassword(randomEmail);
        loginPage.submit();
        loginPage.passwordErrorMessage.should('be.visible');
        loginPage.passwordErrorMessage.should('have.text', 'The password field is required');
        loginPage.passwordField.should('not.have.text');
    })

    it('register with 4 digit password', ()=>{
        loginPage.login(randomEmail, incorrectPassword);
        loginPage.submit();
        loginPage.passwordErrorMessage.should('be.visible');
        loginPage.passwordErrorMessage.should('have.text', 'The password field must be at least 5 characters');
    })

    it('register with random credentials', ()=>{
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login', (req) =>{}).as('randomLogin');

        loginPage.login(randomEmail, randomPassword);
        loginPage.submit();

        cy.wait('@randomLogin').then((intercept) =>{
            expect(intercept.response.statusCode).eq(401);
            expect(intercept.response.body.message).eq('Unauthenticated.')
        })

        loginPage.incorrectCredentialsErrorMessage.should('have.text', 'Oops! Your email/password combination is incorrect');
        loginPage.loginButton.should('be.visible');
    })

    it('register with valid credentials', ()=>{
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login', (req) =>{}).as('validLogin');

        loginPage.login(existingEmail, existingPassword);
        loginPage.submit();

        cy.wait('@validLogin').then((intercept) =>{
            expect(intercept.response.statusCode).eq(200);
        })
        
        cy.url().should('contain', '/my-organizations');
    })
})