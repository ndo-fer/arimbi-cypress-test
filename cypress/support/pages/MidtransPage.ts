import { expect } from 'chai';

class MidtransPage {
  private readonly origin = 'https://simulator.sandbox.midtrans.com';

  /**
   * Helper to handle cy.origin wrapper and avoid code duplication.
   * @param path The path to visit inside the simulator.
   * @param args Arguments to pass to the origin callback.
   * @param callback The callback function to execute inside the simulator origin.
   */
  private runInSimulator(path: string, args: any, callback: (args: any) => void) {
    cy.origin(this.origin, { args: { ...args, path } }, callback);
  }

  payGeneralVA(bank: 'bni' | 'bca' | 'bri', vaNumber: string) {
    let path = '';
    if (bank === 'bni') path = '/bni/va/index';
    else if (bank === 'bca') path = '/bca/va/index';
    else if (bank === 'bri') path = '/openapi/va/index?bank=bri';

    this.runInSimulator(path, { vaNumber, bank }, ({ path, vaNumber, bank }) => {
      cy.visit(path);
      cy.get('#inputMerchantId').type(vaNumber);
      cy.get('input[value="Inquire"]').click();

      // Jika bank = BCA dan digit lebih dari 18, kita ambil sisanya (substring dari index 5)
      const expectedVaDisplay = (bank === 'bca' && vaNumber.length > 18) 
        ? vaNumber.substring(5) 
        : vaNumber;

      // Validasi bahwa angka yang tampil sesuai (baik yang utuh maupun yang sudah dipotong)
      cy.get('.inputed-form', { timeout: 10000 })
        .should('be.visible')
        .and('contain', expectedVaDisplay);
      
      // // Verify VA (Assert it exists in disabled field)
      // cy.get('.inputed-form').should('contain', vaNumber);
      
      cy.get('input[value="Pay"]').click();
      // Verify Success
      cy.get('.success').should('contain', 'successful');
    });
  }

  payIndomaret(paymentCode: string, merchantId: string) {
    const path = '/indomaret/phoenix/index';
    this.runInSimulator(path, { paymentCode, merchantId }, ({ path, paymentCode, merchantId }) => {
      cy.visit(path);
      cy.get('#payment_code').type(paymentCode);
      cy.get('#product_code').type(merchantId);
      
      cy.get('input[value="Inquire"]').click();
      cy.get('input[value="Pay"]').click();
      cy.get('.success').should('contain', 'successful');
    });
  }

  payAlfamart(paymentCode: string) {
    const path = '/alfamart/index';
    this.runInSimulator(path, { paymentCode }, ({ path, paymentCode }) => {
      cy.visit(path);
      // Payment Code Input: input[name="payment_code"] (or fallback to #inputMerchantId)
      cy.get('body').then(($body) => {
        if ($body.find('input[name="payment_code"]').length > 0) {
          cy.get('input[name="payment_code"]').type(paymentCode);
        } else {
          cy.get('#inputMerchantId').type(paymentCode);
        }
      });

      cy.get('input[value="Inquire"]').click();
      cy.get('input[value="Pay"]').click();
      cy.get('.success').should('contain', 'successful');
    });
  }

  payMandiri(billKey: string, billerCode: string) {
    const path = '/mandiri/bill/index';
    this.runInSimulator(path, { billKey, billerCode }, ({ path, billKey, billerCode }) => {
      cy.visit(path);
      cy.get('#bill_key').type(billKey);
      cy.get('#biller_code').type(billerCode);
      cy.get('input[value="Inquire"]').click();
      cy.get('input[value="Pay"]').click();
      cy.get('.success').should('contain', 'successful');
    });
  }
}

export default new MidtransPage();
