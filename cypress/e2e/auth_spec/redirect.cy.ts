import LoginPage from "../../pageobject/Login/LoginPage";

describe("redirect", () => {
  const languageMappings = {
  hi: hi["login"],
  ta: ta["login"],
  ml: ml["login"],
  mr: mr["login"],
  kn: kn["login"],
  };
  const languageSidebars = {
    hi: {
      care: hi["care"],
      goal: hi["goal"],
      footer_body: hi["footer_body"],
    },
    ta: {
      care: ta["care"],
      goal: ta["goal"],
      footer_body: ta["footer_body"],
    },
    ml: {
      care: ml["care"],
      goal: ml["goal"],
      footer_body: ml["footer_body"],
    },
    mr: {
      care: mr["care"],
      goal: mr["goal"],
      footer_body: mr["footer_body"],
    },
    kn: {
      care: kn["care"],
      goal: kn["goal"],
      footer_body: kn["footer_body"],
    },
  }

  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.awaitUrl("/",true);
    loginPage.ensurePageLoaded();
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
    cy.url().should("include", "https://github.com/ohcnetwork");
    cy.get("body").contains("Contribute on GitHub")
  });
  
  it("Verify redirection of 'Third Party Software License' ", () => {
    loginPage.clickThirdPartyLicense();
    cy.url().should("include", "/licenses");
    cy.get("body").contains("Third Party Software License");
  });

  it("Switch languages and verify login button text", () => {
    loginPage.switchLanguageAndVerifyButtonText(languageMappings);
  });

  it("Switch languages and verify sidebar items", ()=> {
   loginPage.switchLanguageAndVerifySidebars(languageSidebars);
  });

});
