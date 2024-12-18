import { users } from "../utils/userConfig";

interface LanguageMapping {
  [key: string]: {
    login: string;
    care: string;
    goal: string;
    footer_body: string;
  };
}

class LoginPage {
  languageSelector = "#language-selector";
  submitButtonSelector: string = "#login-button"; 
  loginByRole(role: keyof typeof users): void {
    const user = users[role];
    if (!user) {
      throw new Error(`Role "${role}" is not defined in userConfig`);
    }
    cy.loginByApi(user.username, user.password);
  }

  loginManuallyAsDistrictAdmin(isCorrectCredentials: boolean = true): void {
    cy.get("input[id='username']").type("devdistrictadmin");
    if (isCorrectCredentials) {
      cy.get("input[id='password']").type("Coronasafe@123");
    } else {
      cy.get("input[id='password']").type("Corona");
    }
    cy.clickSubmitButton("Login");
  }

  loginManuallyAsNurse(password?: string): void {
    cy.get("input[id='username']").click().type("dummynurse1");
    cy.get("input[id='password']")
      .click()
      .type(password || "Coronasafe@123");
    cy.clickSubmitButton("Login");
  }

  ensureLoggedIn(): void {
    cy.get("#user-profile-name").click();
    cy.get("#sign-out-button").scrollIntoView();
    cy.get("#sign-out-button").contains("Sign Out").should("exist");
  }

  clickSignOutBtn(): void {
    cy.verifyAndClickElement("#sign-out-button", "Sign Out");
  }

  fillUserNameInForgotPasswordForm(userName: string): void {
    cy.get("#forgot_username").type(userName);
  }

  clickSendResetLinkBtn(): void {
    cy.verifyAndClickElement("#send-reset-link-btn", "Send Reset Link");
  }

  verifyLoginPageUrl(): void {
    cy.url().should("include", "/");
  }

  clickBackButton(): void {
    cy.verifyAndClickElement("#back-to-login-btn", "Back to login");
  }

  clickForgotPasswordButton(text: string): void {
    cy.verifyAndClickElement("#forgot-pass-btn", text);
  }

  interceptFacilityReq(): void {
    cy.intercept("GET", "**/api/v1/facility/**").as("getFacilities");
  }

  verifyFacilityReq(): void {
    cy.wait("@getFacilities").its("response.statusCode").should("eq", 200);
  }

  interceptLoginReq(): void {
    cy.intercept("POST", "**/api/v1/auth/login").as("userLogin");
  }

  verifyLoginReq(): void {
    cy.wait("@userLogin").its("response.statusCode").should("eq", 401);
  }

  interceptResetLinkReq(): void {
    cy.intercept("POST", "**/api/v1/password_reset").as("resetLink");
  }

  verifyResetLinkReq(): void {
    cy.wait("@resetLink").its("response.statusCode").should("eq", 200);
  }

  verifyLoginButtonPresence(): void {
    cy.verifyContentPresence("#login-button", ["Login"]);
  }

  verifyForgotPasswordHeading(text: string[]): void {
    cy.verifyContentPresence("#forgot-password-heading", text);
  }
    clickContributeOnGitHub(): void {
    cy.get('a[href="https://github.com/ohcnetwork"]').scrollIntoView().click();
  }

  clickThirdPartyLicense(): void {
    cy.get('a[href="/licenses"]').scrollIntoView().click();
  }
    selectLanguage(languageCode: string): void {
    cy.get(this.languageSelector).select(languageCode);
  }
    switchLanguageAndVerifyButtonText(languageMappings: LanguageMapping): void {
    Object.entries(languageMappings).forEach(([languageCode, texts]) => {
      cy.get(this.languageSelector)
        .find(`option[value="${languageCode}"]`)
        .should("exist")
        .then(($option) => {
          if ($option.length === 0) {
            throw new Error(`Language option ${languageCode} not found`);
          }
          this.selectLanguage(languageCode);
          cy.get(this.submitButtonSelector, { timeout: 10000 })
            .should("be.visible")
            .should("have.text", texts.login)
            .should("not.be.disabled");
        });
    });
  }
   private verifySidebarElement(selector: string, expectedText: string): void {
    cy.get(selector, { timeout: 10000 })
      .should("be.visible")
      .should("have.text", expectedText)
      .should("not.be.disabled");
  }
   switchLanguageAndVerifySidebars(languageMappings: LanguageMapping): void {
    Object.entries(languageMappings).forEach(([languageCode, texts]) => {
      cy.get(this.languageSelector)
        .find(`option[value="${languageCode}"]`)
        .should("exist")
        .then(($option) => {
          if ($option.length === 0) {
            throw new Error(`Language option ${languageCode} not found`);
          }
          this.selectLanguage(languageCode);
          this.verifySidebarElement("#care", texts.care);
          this.verifySidebarElement("#goal", texts.goal);
          this.verifySidebarElement("#footer_body", texts.footer_body);
        });
    });
  }
}

export default LoginPage;
