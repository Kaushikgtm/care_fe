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
  
switchLanguageAndVerifyButtonText(languageMappings: { [key: string]: string }) {
    Object.entries(languageMappings).forEach(([languageCode, expectedText]) => {
      cy.get(this.languageSelector)
        .find(`option[value="${languageCode}"]`)
        .should("exist");

      cy.get(this.languageSelector).select(languageCode);

      cy.get("button")
        .contains("login", { timeout: 10000 }) // Direct interaction
        .should("be.visible")
        .and("have.text", expectedText);
    });
  }

switchLanguageAndVerifySidebars(languageMappings: {
  [key: string]: { care: string; goal: string; footer_body: string };
}) {
  Object.entries(languageMappings).forEach(([languageCode, expectedSidebarText]) => {
    cy.get(this.languageSelector)
      .find(`option[value="${languageCode}"]`)
      .should("exist")
      .select(languageCode);

    cy.get("#care", { timeout: 10000 })
      .should("be.visible")
      .and("have.text", expectedSidebarText.care);

    cy.get("#goal", { timeout: 10000 })
      .should("be.visible")
      .and("have.text", expectedSidebarText.goal);

    cy.get("#footer_body", { timeout: 10000 })
      .should("be.visible")
      .and("have.text", expectedSidebarText.footer_body);
  });
}

}

export default LoginPage;
