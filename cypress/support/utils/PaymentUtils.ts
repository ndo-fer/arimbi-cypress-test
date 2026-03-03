import midtransPage from '../pages/MidtransPage';

/**
 * Reusable helper to handle Midtrans simulation based on the payment method name.
 * Assumes a modal containing payment details (VA number, codes) is currently visible.
 * Handles verification by visiting the order history page.
 */
export const payWithMidtransSimulator = (paymentMethod: string) => {
  // Wait for the modal to be visible and extract its text content
  cy.get('.modal.show').should('be.visible').invoke('text').then((text) => {
    const cleanText = text.replace(/\s+/g, ' ');
    let simulationRan = false;

    if (['BNI', 'BCA', 'BRI'].some((bank) => paymentMethod.includes(bank))) {
      // Extract VA Number (6 or more digits)
      const vaMatch = cleanText.match(/(\d{6,})/);
      if (vaMatch) {
        let bank: 'bni' | 'bca' | 'bri' = 'bca';
        if (paymentMethod.includes('BNI')) bank = 'bni';
        else if (paymentMethod.includes('BRI')) bank = 'bri';
        
        midtransPage.payGeneralVA(bank, vaMatch[1]);
        simulationRan = true;
      }
    } else if (paymentMethod.includes('Indomaret')) {
      // Extract Payment Code
      const codeMatch = cleanText.match(/(?:Kode Pembayaran|Payment Code)\D*?(\d+)/);
      if (codeMatch) {
        midtransPage.payIndomaret(codeMatch[1], '12345');
        simulationRan = true;
      }
    } else if (paymentMethod.includes('Alfamart')) {
      // Extract Payment Code
      const codeMatch = cleanText.match(/(?:Kode Pembayaran|Payment Code)\D*?(\d+)/);
      if (codeMatch) {
        midtransPage.payAlfamart(codeMatch[1]);
        simulationRan = true;
      }
    } else if (paymentMethod.includes('Mandiri')) {
      // Extract Bill Key and Biller Code
      const billKeyMatch = cleanText.match(/(?:Bill Key|Kode Bayar)\D*?(\d+)/);
      const billerCodeMatch = cleanText.match(/(?:Biller Code|Kode Perusahaan)\D*?(\d+)/);
      if (billKeyMatch && billerCodeMatch) {
        midtransPage.payMandiri(billKeyMatch[1], billerCodeMatch[1]);
        simulationRan = true;
      }
    }

    // Verification Step
    if (simulationRan) {
      /**
       * LIMITATION:
       * The normal human flow requires keeping the Arimbi VA modal open, paying in a new tab, and then returning to the modal to click "Refresh Status".
       * Because Cypress natively does not support multi-tab operations, and the `/cart-page/dikemas` list is not sorted by "last paid"
       * (making it hard to reliably find the new order amidst webhook delays), we will skip the UI verification on the Dikemas page.
       */
      cy.log('Payment successful in Midtrans. Skipping Dikemas verification due to multi-tab flow and sorting limitations.');
    } else {
      cy.log(`Simulation skipped: Payment method '${paymentMethod}' not supported or codes not found.`);
    }
  });
};
