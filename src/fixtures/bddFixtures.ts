import { test as base } from 'playwright-bdd';
import { RegistroPage } from '../pages/RegistroPage';
import { RegistroActions } from '../actions/RegistroActions';
import { RegistroQuestions } from '../questions/RegistroQuestions';

// Definimos el tipo de nuestros custom fixtures
type MyFixtures = {
  registroPage: RegistroPage;
  registroActions: RegistroActions;
  registroQuestions: RegistroQuestions;
  scenarioContext: { email?: string; [key: string]: any };
};

// Extendemos el test base de playwright-bdd
export const test = base.extend<MyFixtures>({
  scenarioContext: async ({}, use) => {
    await use({});
  },
  registroPage: async ({ page }, use) => {
    await use(new RegistroPage(page));
  },
  registroActions: async ({ page, registroPage }, use) => {
    await use(new RegistroActions(page, registroPage));
  },
  registroQuestions: async ({ page, registroPage }, use) => {
    await use(new RegistroQuestions(page, registroPage));
  },
});
