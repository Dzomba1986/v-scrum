export default class RegisterPage{
    get freeSignUpButton(){
        return cy.get('a[title="Starter"]').eq(0);
    }

    get emailAdressInputField(){
        return cy.get('input[type="email"]');
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
        return cy.contains('The password field is required');
    }

    get userNumberErrorMessageField(){
        return cy.contains('The number of users field is required');
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