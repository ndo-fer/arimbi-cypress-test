// cypress/support/index.d.ts

import { UserFixture } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in via UI, caching the session for performance.
       * Uses the 'validUser' from the users.json fixture by default.
       * @example cy.login()
       */
      login(): Chainable<void>;

      /**
       * Overwrites the cy.fixture command signature for 'users.json' to provide strong type safety.
       * @example cy.fixture('users.json').then(user => ...)
       */
      fixture(path: 'users.json'): Chainable<UserFixture>;
    }
  }
}
