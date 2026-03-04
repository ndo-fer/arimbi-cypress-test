class MidtransPage {
    private readonly origin = 'https://simulator.sandbox.midtrans.com';

    private runInSimulator<T extends object>(path: string, args: T, callback: (args: T & { path: string }) => void) {
        cy.origin(this.origin, { args: { ...args, path } }, callback);
    }

    // --- PAYMENT ACTIONS ---

    payGeneralVA(bank: 'bni' | 'bca' | 'bri', vaNumber: string) {
        Cypress.log({
            displayName: 'PAYMENT',
            message: `Paying with ${bank.toUpperCase()} Virtual Account`,
        });

        let path = '';
        if (bank === 'bni') path = '/bni/va/index';
        else if (bank === 'bca') path = '/bca/va/index';
        else if (bank === 'bri') path = '/openapi/va/index?bank=bri';

        this.runInSimulator(path, { vaNumber, bank }, ({ path, vaNumber, bank }) => {
            cy.visit(path);
            cy.get('#inputMerchantId').type(vaNumber, { log: false });
            cy.get('input[value="Inquire"]').click({ log: false });

            const expectedVaDisplay = (bank === 'bca' && vaNumber.length > 18)
                ? vaNumber.substring(5)
                : vaNumber;

            cy.get('.inputed-form', { timeout: 10000 })
                .should('be.visible')
                .and('contain', expectedVaDisplay);

            cy.get('input[value="Pay"]').click({ log: false });
            cy.get('.success').should('contain', 'successful');
        });
    }

    payIndomaret(paymentCode: string, merchantId: string) {
        Cypress.log({
            displayName: 'PAYMENT',
            message: `Paying at Indomaret`,
        });
        const path = '/indomaret/phoenix/index';
        this.runInSimulator(path, { paymentCode, merchantId }, ({ path, paymentCode, merchantId }) => {
            cy.visit(path);
            cy.get('#payment_code').type(paymentCode, { log: false });
            cy.get('#product_code').type(merchantId, { log: false });
            cy.get('input[value="Inquire"]').click({ log: false });
            cy.get('input[value="Pay"]').click({ log: false });
            cy.get('.success').should('contain', 'successful');
        });
    }

    payAlfamart(paymentCode: string) {
        Cypress.log({
            displayName: 'PAYMENT',
            message: `Paying at Alfamart`,
        });
        const path = '/alfamart/index';
        this.runInSimulator(path, { paymentCode }, ({ path, paymentCode }) => {
            cy.visit(path);
            cy.get('body').then(($body) => {
                if ($body.find('input[name="payment_code"]').length > 0) {
                    cy.get('input[name="payment_code"]').type(paymentCode, { log: false });
                } else {
                    cy.get('#inputMerchantId').type(paymentCode, { log: false });
                }
            });

            cy.get('input[value="Inquire"]').click({ log: false });
            cy.get('input[value="Pay"]').click({ log: false });
            cy.get('.success').should('contain', 'successful');
        });
    }

    payMandiri(billKey: string, billerCode: string) {
        Cypress.log({
            displayName: 'PAYMENT',
            message: `Paying with Mandiri Bill Payment`,
        });
        const path = '/mandiri/bill/index';
        this.runInSimulator(path, { billKey, billerCode }, ({ path, billKey, billerCode }) => {
            cy.visit(path);
            cy.get('#bill_key').type(billKey, { log: false });
            cy.get('#biller_code').type(billerCode, { log: false });
            cy.get('input[value="Inquire"]').click({ log: false });
            cy.get('input[value="Pay"]').click({ log: false });
            cy.get('.success').should('contain', 'successful');
        });
    }
}

export default new MidtransPage();
