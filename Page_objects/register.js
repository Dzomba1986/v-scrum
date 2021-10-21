export default class RegisterPage{
    get freeSignUpButton(){
        return cy.get('a[title="Starter"]').eq(0);
    }

    get emailAdressInputField(){
        return cy.get('input[name="email"]');
    }

    get passwordInputField(){
        return cy.get('input[type="password"]');
    }

    get numberOfUsersInputField (){
       return cy.get ('input[name="number_of_users"]');
    }

    get checkTermsButton (){
        return cy.get('.vs-c-checkbox-check');
    }

    get submitButton (){
        return cy.get('button[type="submit"]');
    }

    get emailErrorMessageField(){
        return cy.contains('The email field must be a valid email');
    }

    get passwordErrorMessageField(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"').eq(1);
    }

    get userNumberErrorMessageField1(){
        return cy.contains('The number of users field is required');
    }

    get userNumberErrorMessageField2(){
        return cy.contains('The number of users must be between 1 and 10');
    }

    get emailAlereadyExistErrorMessageFiled(){
        return cy.contains('User with that email already exists');
    }

    get checkBoxErrorMessageField (){
        return cy.contains('terms and privacy policy');
    }

    get profileField(){
        return cy.get('img[class="vs-u-img--round vs-c-user-avatar"]');
    }

    get accountSettingsField(){
        return cy.get('a[href="/account/settings"]');
    }

    get logOutButton(){
        return cy.contains('Log Out');
    }

    get firstNameInputField(){
        return cy.get('input[name="first_name"]');
    }

    get lastNameInputField(){
        return cy.get('input[name="last_name"]');
    }

    get companyNameInputField(){
        return cy.get('input[name="company_name"]');
    }

    get organizationNameInputField(){
        return cy.get('input[name="organization_name"]');
    }

    get finishRegisterButton(){
        return cy.get('button[type="submit"]');
    }

    get cancelButton(){
        return cy.contains('Cancel');
    }

    finishRegistration(firstName, lastName, companyName, organizationName){
        this.firstNameInputField.type(firstName);
        this.lastNameInputField.type(lastName);
        this.companyNameInputField.type(companyName);
        this.organizationNameInputField.type(organizationName);
    }

    noEmail(password, users){
        this.passwordInputField.type(password);
        this.numberOfUsersInputField.type(users);
    }

    noPassword (email, users){
        this.emailAdressInputField.type(email);
        this.passwordInputField.clear();
        this.numberOfUsersInputField.clear();
        this.numberOfUsersInputField.type(users);
     }

    noUsers (email, password){
        this.emailAdressInputField.clear();
        this.emailAdressInputField.type(email);
        this.numberOfUsersInputField.clear();
        this.passwordInputField.type(password);
    }
     
    register (email, password, users){
        this.emailAdressInputField.clear();  
        this.emailAdressInputField.type(email);
        this.passwordInputField.clear(); 
        this.passwordInputField.type(password); 
        this.numberOfUsersInputField.clear();   
        this.numberOfUsersInputField.type(users);
    }

    submit (){
        this.submitButton.click();
    }
}
export const registerPage = new RegisterPage();