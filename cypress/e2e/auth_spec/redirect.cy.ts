import LoginPage from "../../pageobject/Login/LoginPage";

describe("redirect", () => {
   const languageMappings = {
    hi: "लॉग इन करें", // Hindi
    ta: "உள்நுழை", // Tamil
    ml: "ലോഗിൻ", // Malayalam
    mr: "लॉगिन", // Marathi
    kr: "ಲಾಗಿನ್", // Kannada
  };
  const languageSidebars = {

    hi: "देखभालहमारा लक्ष्य डिजिटल उपकरणों का उपयोग करके सार्वजनिक स्वास्थ्य सेवाओं की गुणवत्ता और पहुंच में निरंतर सुधार करना है। ओपन हेल्थकेयर नेटवर्क एक ओपन-सोर्स पब्लिक यूटिलिटी है जिसे इनोवेटर्स और स्वयंसेवकों की एक बहु-विषयक टीम द्वारा डिज़ाइन किया गया है। ओपन हेल्थकेयर नेटवर्क केयर एक डिजिटल पब्लिक गुड है जिसे संयुक्त राष्ट्र द्वारा मान्यता प्राप्त है।", // Hindi
    ta: "கவனிப்புடிஜிட்டல் கருவிகளைப் பயன்படுத்தி பொது சுகாதார சேவைகளின் தரம் மற்றும் அணுகல்தன்மையை தொடர்ந்து மேம்படுத்துவதே எங்கள் குறிக்கோள் கொரோனா சேஃப் நெட்வொர்க் என்பது ஒரு திறந்த மூல பொது பயன்பாடாகும், இது கேரள அரசாங்கத்தின் முழு புரிதலுடனும் ஆதரவிற்கும் அரசாங்க முயற்சிகளை ஆதரிக்க ஒரு மாதிரியில் பணிபுரியும் புதுமைப்பித்தர்கள் மற்றும் தன்னார்வலர்களின் பல ஒழுக்கக் குழுவால் வடிவமைக்கப்பட்டுள்ளது.", // Tamil
    ml: "കെയർഡിജിറ്റൽ ടൂളുകൾ ഉപയോഗിച്ച് പൊതുജനാരോഗ്യ സേവനങ്ങളുടെ ഗുണനിലവാരവും പ്രവേശനക്ഷമതയും തുടർച്ചയായി മെച്ചപ്പെടുത്തുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം. കേരള സർക്കാറിന്‍റെ പൂർണ്ണമായ ധാരണയോടും പിന്തുണയോടും കൂടി സർക്കാർ ശ്രമങ്ങളെ പിന്തുണയ്ക്കുന്നതിനായി നൂതന പ്രവർത്തകരുടെയും സന്നദ്ധപ്രവർത്തകരുടെയും ഒരു മൾട്ടി-ഡിസിപ്ലിനറി ടീം രൂപകൽപ്പന ചെയ്ത മാതൃകാപരമായ ഒരു ഓപ്പൺ സോഴ്‌സ് പബ്ലിക് യൂട്ടിലിറ്റിയാണ് കൊറോണ സേഫ് നെറ്റ്‌വർക്ക്.", // Malayalam
    mr: "डिजिटल साधनांचा वापर करून सार्वजनिक आरोग्य सेवांची गुणवत्ता आणि सुलभता सतत सुधारणे हे आमचे ध्येय आहे. कोरोनासेफ नेटवर्क ही एक मुक्त-स्त्रोत सार्वजनिक सुविधा आहे जी केरळ सरकारच्या पूर्ण मदतीने आणि समर्थनासह सरकारच्या प्रयत्नांना पाठिंबा देण्यासाठी मॉडेलवर काम करणारे नवीन-स्वयंसेवक आणि स्वयंसेवकांच्या एकाधिक-शिस्तबद्ध टीमद्वारे डिझाइन केलेले आहे.", // Marathi
    kr: "ಕಾಳಜಿಡಿಜಿಟಲ್ ಉಪಕರಣಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಸೇವೆಗಳ ಗುಣಮಟ್ಟ ಮತ್ತು ಪ್ರವೇಶವನ್ನು ನಿರಂತರವಾಗಿ ಸುಧಾರಿಸುವುದು ನಮ್ಮ ಗುರಿಯಾಗಿದೆ ಕೊರೊನಾಸೇಫ್ ನೆಟ್‌ವರ್ಕ್ ಎಂಬುದು ತೆರೆದ ಮೂಲ ಸಾರ್ವಜನಿಕ ಉಪಯುಕ್ತತೆಯಾಗಿದ್ದು, ನಾವೀನ್ಯಕಾರರು ಮತ್ತು ಸ್ವಯಂಸೇವಕರ ಬಹು-ಶಿಸ್ತಿನ ತಂಡದಿಂದ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಕರೋನಾ ಸೇಫ್ ಕೇರ್ ವಿಶ್ವಸಂಸ್ಥೆಯಿಂದ ಗುರುತಿಸಲ್ಪಟ್ಟ ಡಿಜಿಟಲ್ ಸಾರ್ವಜನಿಕ ಸೇವೆಯಾಗಿದೆ." //kannada 
  };

  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.log("Logging in the user devdistrictadmin");
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
