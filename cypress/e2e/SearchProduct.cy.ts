import homePage from '../support/pages/HomePage';

describe('Search Functionality', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should find and display results for a specific keyword', () => {
        const keyword = 'Sam';
        homePage.search(keyword);

        cy.url().should('include', '/search-page');

        homePage.elements.searchResults()
            .should('have.length.greaterThan', 0)
            .first()
            .find('.title, h4')
            .invoke('text')
            .then((text: string) => {
                expect(text.toLowerCase()).to.contain(keyword.toLowerCase());
            });
    });

    it('should display multiple results for a broad keyword', () => {
        const keyword = 'Nike';
        homePage.search(keyword);

        cy.url().should('include', '/search-page');
        homePage.elements.searchResults().should('have.length.greaterThan', 1);

        homePage.elements.searchResults().each(($el: JQuery<HTMLElement>, index: number) => {
            if (index < 3) {
                cy.wrap($el)
                    .find('.title, h4')
                    .invoke('text')
                    .then((text: string) => {
                        expect(text.toLowerCase()).to.contain(keyword.toLowerCase());
                    });
            }
        });
    });

    it('should show an empty state when no results are found', () => {
        const keyword = 'XJXKZXKZ';
        homePage.search(keyword);

        cy.url().should('include', '/search-page');
        homePage.elements.searchResults().should('not.exist');
        cy.contains('Produk tidak ditemukan').should('be.visible');
    });
});
