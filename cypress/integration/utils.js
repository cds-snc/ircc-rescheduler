// pretier-ignore
/* eslint-disable no-undef */

// Check the Header for Canada wordmark and French/English language link
export const headerImg = () => cy.get('.svg-container').eq(0);


export const footerImg = () => cy.get('.svg-container').eq(1);

export const langLink = () => cy.get('#language-toggle');

export const homeLink = () => cy.get('[style="margin-left:4.5rem"]').eq(0);

// Check the footer for links and Canada wordmark
export const aboutCA = () => cy.get('#footer a').eq(0);
export const sMedia = () => cy.get('#footer a').eq(1);
export const mobileApp = () => cy.get('#footer a').eq(2);
export const tocLink = () => cy.get('#footer a').eq(3);
export const privacyLink = () => cy.get('#footer a').eq(4);

export const aboutCAHref = () => cy.get('#footer div a').eq(0);
export const sMediaHref = () => cy.get('#footer div a').eq(1);
export const mobileHref = () => cy.get('#footer div a').eq(2);
export const tocHref = () => cy.get('#footer div a').eq(3);
export const privacyHref = () =>cy.get('#footer div a').eq(4);
// todo, check the privacy link text once complete


// export const enterButton = () => cy.get('.css-arysfy-govuk_button-button-mediaQuery-button')
export const enterButton = () => cy.get('button[type="submit"')
export const nextButton = () => cy.get('#nextButton')


//need the link for the terms and conditions
//  cy.get('#footer div a')
//    .eq(2).should('have.attr', 'href', '/termsandconditions')
