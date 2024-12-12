// LoginPage.ts

class LoginPage {
  languageSelector = "#language-selector";

  loginAsDisctrictAdmin(): void {
    cy.loginByApi("devdistrictadmin", "Coronasafe@123");
  }

  loginAsDevDoctor(): void {
    cy.loginByApi("devdoctor", "Coronasafe@123");
  }

  loginAsStaff(): void {
    cy.loginByApi("staffdev", "Coronasafe@123");
  }

  loginManuallyAsDistrictAdmin(): void {
    cy.get("input[id='username']").type("devdistrictadmin");
    cy.get("input[id='password']").type("Coronasafe@123");
    cy.get("button").contains("Login").click();
  }

  loginManuallyAsNurse(): void {
    cy.get("input[id='username']").click().type("dummynurse1");
    cy.get("input[id='password']").click().type("Coronasafe@123");
    cy.get("button").contains("Login").click();
  }

  login(username: string, password: string): void {
    cy.loginByApi(username, password);
  }

  ensureLoggedIn(): void {
    cy.get("#user-profile-name").click();
    cy.get("#sign-out-button").scrollIntoView();
    cy.get("#sign-out-button").contains("Sign Out").should("exist");
  }
  
  ensurePageLoaded() {
+    cy.get(this.submitButtonSelector).should("be.visible");
+    cy.get(this.languageSelector).should("be.visible");
+    cy.get("input[id='username']").should("be.visible");
+    cy.get("input[id='password']").should("be.visible");
  }

  clickContributeOnGitHub() {
     cy.get('a[href="https://github.com/ohcnetwork"]').scrollIntoView().click();
  }

  clickThirdPartyLicense() {
     cy.get('a[href="/licenses"]').scrollIntoView().click();
  }

 interface LanguageMapping {
  [key: string]: {
    login: string;
    care: string;
    goal: string;
    footer_body: string;
  };
}

switchLanguageAndVerifyButtonText(languageMappings: LanguageMapping) {
  Object.entries(languageMappings).forEach(([languageCode, texts]) => {
    cy.get(this.languageSelector)
      .find(`option[value="${languageCode}"]`)
      .should("exist")
      .then($option => {
        if ($option.length === 0) {
          throw new Error(`Language option ${languageCode} not found`);
        }
        this.selectLanguage(languageCode);
        cy.get(this.submitButtonSelector, { timeout: 10000 })
          .should("be.visible")
          .and("have.text", texts.login);
      });
  });
}

private verifySidebarElement(selector: string, expectedText: string) {
return cy.get(selector, { timeout: 10000 })
    .should("be.visible")
    .and("have.text", expectedText);
}
  
switchLanguageAndVerifySidebars(languageMappings: LanguageMapping) {
  Object.entries(languageMappings).forEach(([languageCode, texts]) => {
    cy.get(this.languageSelector)
      .find(`option[value="${languageCode}"]`)
      .should("exist")
      .then($option => {
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

export default LoginPage;
