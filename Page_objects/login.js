export default class LoginPage{
    get loginButton(){
        return cy.get('button[type="submit"]');
    }

    get backHomeButton(){
        return cy.contains('Back to home');
    }

    get emailAdressField(){
        return cy.get('input[name="email"]');
    }

    get passwordField(){
        return cy.get('input[type="password"]');
    }

    get emailErrorMessage(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"]').first();
    }

    get passwordErrorMessage(){
        return cy.get('span[class="el-form-item__error el-form-item-error--top"]').last();
        }

    get incorrectCredentialsErrorMessage(){
        return cy.get('span[class="el-form-item__error"]');
    }
    
    noPassword (email){
    this.emailAdressField.type(email);
    this.passwordField.clear();
    }
     
    login (email, password){
    this.emailAdressField.clear();  
    this.emailAdressField.type(email);
    this.passwordField.clear(); 
    this.passwordField.type(password);
    }

    submit (){
        this.loginButton.click();
    }
}
export const loginPage = new LoginPage();