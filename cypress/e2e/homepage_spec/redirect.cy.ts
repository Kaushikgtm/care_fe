import LoginPage from "../../pageobject/Login/LoginPage";
import * as ta from "../../../public/locale/ta.json";
import * as ml from "../../../public/locale/ml.json";
import * as mr from "../../../public/locale/mr.json";
import * as kn from "../../../public/locale/kn.json";
import * as hi from "../../../public/locale/hi.json";

const locales = { hi, ta, ml, mr, kn };

describe("redirect", () => {
  const languageMappings = Object.fromEntries(
    Object.entries(locales).map(([langCode, locale]) => [langCode, {
      login: locale["login"]
    }])
  );

  const languageSidebars = Object.fromEntries(
    Object.entries(locales).map(([langCode, locale]) => [
      langCode,
      { care: locale["care"], goal: locale["goal"], footer_body: locale["footer_body"] },
    ])
  );

  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.awaitUrl("/", true);
    cy.log("Logging in the user devdistrictadmin");
  });

  it("Check if login redirects to the right url", () => {
    cy.awaitUrl("/resource/board", true);
    loginPage.loginManuallyAsDistrictAdmin();
    loginPage.ensureLoggedIn();
    cy.url().should("include", "/resource/board");
  });

  it("Check if the redirect param works", () => {
    const baseUrl = Cypress.config("baseUrl");
    cy.awaitUrl(`login?redirect=${baseUrl}/resource/board`, true);
    loginPage.loginManuallyAsDistrictAdmin();
    loginPage.ensureLoggedIn();
    cy.url().should("include", "/resource/board");
  });

  it("Check to ensure that redirect is the same origin", () => {
    cy.awaitUrl("login?redirect=https://google.com", true);
    loginPage.loginManuallyAsDistrictAdmin();
    loginPage.ensureLoggedIn();
    cy.url().should("include", "/facility");
  });

  it("Verify redirection of 'Contribute on GitHub' link", () => {
    loginPage.clickContributeOnGitHub();
    cy.url({ timeout: 10000 }).should("include", "https://github.com/ohcnetwork");
    cy.get("body", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Contribute on GitHub");
  });

  it("Verify redirection of 'Third Party Software License'", () => {
    loginPage.clickThirdPartyLicense();
    cy.url({ timeout: 10000 }).should("include", "/licenses");
    cy.get("body", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Third Party Software License");
  });

  it("Switch languages and verify login button text", () => {
    loginPage.switchLanguageAndVerifyButtonText(languageMappings);
  });

  it("Switch languages and verify sidebar items", () => {
    loginPage.switchLanguageAndVerifySidebars(languageSidebars);
  });
});
