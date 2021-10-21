/// <reference types="Cypress" />

import { registerPage } from '../../Page_objects/register';
 const faker = require('faker');

describe('register page', ()=>{

    let userNumber = 8;
    let incorrectUserNumber= 11;
    let randomEmail= faker.internet.email();
    let randomPassword= faker.internet.password();
    let randomFirstName= faker.name.firstName();
    let randomLastName= faker.name.lastName();
    let randomCompanyName= faker.company.companyName();
    let randomOrganizationName= faker.commerce.department();
    let incorrectEmail= 'abcdabc.com';
    let incorrectEmail2= 'abcd@abccom';
    let incorrectEmail3= 'abcd@abc.';
    let incorrectEmail4= 'abcd@abc.123';
    let existingEmail= 'abcd@abcd.com';
    let existingPassword= '12341234';
    let incorrectPassword= '1234';
    

    before('visit url', () => {
        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
    })

    it('get free trial', ()=>{
        registerPage.freeSignUpButton.click({ force: true });
        cy.url().should('contain', '/sign-up');
    })

    it('register without email', ()=>{
        registerPage.noEmail(randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('be.visible');
        registerPage.emailErrorMessageField.should('have.text', 'The email field must be a valid email');
        registerPage.emailAdressInputField.should('not.have.text');
    })

    it('register without password', ()=>{
        registerPage.noPassword(randomEmail, userNumber);
        registerPage.submit();
        registerPage.passwordErrorMessageField.should('be.visible');
        registerPage.passwordErrorMessageField.should('have.text', 'The password field is required');
        registerPage.passwordInputField.should('not.have.text');
    })

    it('register without userNumber', ()=>{
        registerPage.noUsers(randomEmail, randomPassword);
        registerPage.submit();
        registerPage.userNumberErrorMessageField1.should('be.visible');
        registerPage.userNumberErrorMessageField1.should('have.text', 'The number of users field is required');
        registerPage.numberOfUsersInputField.should('not.have.text');
    })

    it('reister without "@" in email', ()=>{
        registerPage.register(incorrectEmail, randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('be.visible');
        registerPage.emailErrorMessageField.should('have.text', 'The email field must be a valid email');
    })

    it('reister without "." in email', ()=>{
        registerPage.register(incorrectEmail2, randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('have.text', 'The email field must be a valid email');
        registerPage.submitButton.should('be.visible');
    })

    it('reister without "com" in email', ()=>{
        registerPage.register(incorrectEmail3, randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('have.text', 'The email field must be a valid email');
        registerPage.submitButton.should('be.visible');
    })

    it('reister with digits insted of "com" in email', ()=>{
        registerPage.register(incorrectEmail4, randomPassword, userNumber);
        registerPage.submit();
        registerPage.emailErrorMessageField.should('have.text', 'The email field must be a valid email');
        registerPage.submitButton.should('be.visible');
    })

    it('reister with already existing email', ()=>{
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/register', (req) =>{}).as('existingEmail');

        registerPage.register(existingEmail, existingPassword, userNumber);
        registerPage.submit();

        cy.wait('@existingEmail').then((intercept) =>{
            expect(intercept.response.statusCode).eq(401);
        })
        registerPage.submitButton.should('be.visible');
    })

    it('register with 4 digit password', ()=>{
        registerPage.register(randomEmail, incorrectPassword, userNumber);
        registerPage.submit();
        registerPage.passwordErrorMessageField.should('be.visible');
        registerPage.passwordErrorMessageField.should('have.text', 'The password field must be at least 5 characters');
    })

    it('register with 11 users', ()=>{
        registerPage.register(randomEmail, randomPassword, incorrectUserNumber);
        registerPage.submit();
        registerPage.userNumberErrorMessageField2.should('be.visible');
        registerPage.userNumberErrorMessageField2.should('have.text', 'The number of users must be between 1 and 10');
    })

    it('register without checbox', ()=>{
        registerPage.register(randomEmail, randomPassword, userNumber);
        registerPage.checkTermsButton.click();
        registerPage.submit();
        registerPage.checkBoxErrorMessageField.should('be.visible');
        registerPage.checkBoxErrorMessageField.should('have.text', 'The agree to terms and privacy policy field is required');
    })

    it('enter random credentials', ()=>{
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/register', (req) =>{}).as('validRegister');
       
        registerPage.register(randomEmail, randomPassword, userNumber);
        registerPage.checkTermsButton.click();
        registerPage.submit();
        
        cy.wait('@validRegister').then((intercept) =>{
            expect(intercept.response.statusCode).eq(200);
        })
        
        cy.url().should('contain', '/my-organizations');
        registerPage.submitButton.should('not.exist');
    })

    it('finalize registration', ()=>{
        registerPage.profileField.click(); 
        registerPage.finishRegistration(randomFirstName, randomLastName, randomCompanyName, randomOrganizationName);
        registerPage.finishRegisterButton.click()    
    })

    it('logout', ()=>{
        registerPage.accountSettingsField.click();
        registerPage.cancelButton.click();

        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/logout', (req) =>{}).as('logOut');

        registerPage.logOutButton.click();

        cy.wait('@logOut').then((intercept) =>{
            expect(intercept.response.statusCode).eq(201);
            expect(intercept.response.body.message).eq('Successfully logged out');
        })
        cy.url().should('contain', '/login');
    })
})