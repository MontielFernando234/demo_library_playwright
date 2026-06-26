import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/bddFixtures';
import { DataGenerator } from '../../support/DataGenerator';

// Desestructuramos Given, When, Then inyectando nuestras fixtures customizadas
const { Given, When, Then } = createBdd(test);

Given('que soy un visitante en la página de registro', async ({ registroActions }) => {
  await registroActions.navegarARegistro();
});

When('completo el formulario de registro con datos obligatorios válidos dinámicos', async ({ registroActions, scenarioContext }) => {
  const user = DataGenerator.generateRandomUser();
  scenarioContext.user = user;
  scenarioContext.email = user.Email;
  await registroActions.completarFormulario(user);
});

When('completo el formulario de registro con todos los campos válidos dinámicos', async ({ registroActions, scenarioContext }) => {
  const user = DataGenerator.generateRandomUser();
  user['Fecha de nacimiento'] = '1990-05-15';
  user['Dirección'] = 'Av. Corrientes 1234, CABA';
  scenarioContext.user = user;
  scenarioContext.email = user.Email;
  await registroActions.completarFormulario(user);
});

When('completo el formulario con los siguientes datos obligatorios:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario(datos);
});

When('completo el formulario con los siguientes datos:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario(datos);
});

When('presiono el botón {string}', async ({ registroActions }, boton: string) => {
  if (boton === 'Registrarme') {
    await registroActions.enviarFormulario();
  }
});

Then('el sistema crea la cuenta exitosamente', async ({ registroQuestions }) => {
  await registroQuestions.verificarCuentaCreadaExitosamente();
});

Then('se muestra un mensaje indicando que revise su email para confirmar la cuenta', async ({ registroQuestions }) => {
  await registroQuestions.verificarMensajeConfirmacionEmail();
});

// Steps negativos y validaciones de campo
When('completo el formulario dejando el campo Nombre vacío:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario({ ...datos, Nombre: '' });
});

Then('el campo Nombre muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

When('completo el formulario dejando el campo Apellido vacío:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario({ ...datos, Apellido: '' });
});

Then('el campo Apellido muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

When('completo el formulario dejando el campo Email vacío:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario({ ...datos, Email: '' });
});

Then('el campo Email muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

When('completo el formulario dejando el campo Contraseña vacío:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario({ ...datos, Contraseña: '' });
});

Then('el campo Contraseña muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

When('completo el formulario dejando el campo Confirmar contraseña vacío:', async ({ registroActions }, dataTable) => {
  const datos = dataTable.hashes()[0];
  await registroActions.completarFormulario({ ...datos, Confirmar: '' });
});

Then('el campo Confirmar contraseña muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

When('dejo todos los campos del formulario vacíos', async ({ registroActions }) => {
  await registroActions.completarFormulario({ Nombre: '', Apellido: '', Email: '', Contraseña: '', Confirmar: '' });
});

Then('todos los campos obligatorios muestran el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  // Al menos 5 campos vacíos deberían generar el mensaje
  await registroQuestions.verificarMultiplesMensajesError(mensaje, 5);
});

When('quito el foco del campo Email', async ({ registroActions }) => {
  await registroActions.quitarFocoDeEmail();
});

Given('un email dinámico ya registrado en el sistema', async ({ page, registroActions, scenarioContext }) => {
  const user = DataGenerator.generateRandomUser();
  scenarioContext.precondicionUser = user;
  scenarioContext.email = user.Email;
  await registroActions.completarFormulario(user);
  await registroActions.enviarFormulario();
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(2000);
  await registroActions.navegarARegistro();
});

When('completo el formulario de registro usando el mismo email registrado', async ({ registroActions, scenarioContext }) => {
  const registeredUser = scenarioContext.precondicionUser;
  const user = DataGenerator.generateRandomUser();
  user.Email = registeredUser.Email;
  scenarioContext.user = user;
  await registroActions.completarFormulario(user);
});

Then('el campo {string} mantiene el valor de la precondición', async ({ registroQuestions, scenarioContext }, campo: string) => {
  const user = scenarioContext.user;
  let valor : string;
  if (campo === 'Nombre') valor = user.Nombre;
  else if (campo === 'Apellido') valor = user.Apellido;
  else if (campo === 'Email') valor = user.Email;
  else throw new Error(`Campo desconocido: ${campo}`);
  await registroQuestions.verificarValorCampo(campo, valor);
});

Then('el sistema muestra el mensaje de error {string}', async ({ registroQuestions }, mensaje: string) => {
  await registroQuestions.verificarMensajeErrorVisible(mensaje);
});

Then('el campo {string} mantiene el valor {string}', async ({ registroQuestions }, campo: string, valor: string) => {
  await registroQuestions.verificarValorCampo(campo, valor);
});

When('quito el foco del campo Contraseña', async ({ registroPage }) => {
  await registroPage.passwordInput.blur();
});

When('quito el foco del campo Confirmar contraseña', async ({ registroPage }) => {
  await registroPage.confirmarPasswordInput.blur();
});

Then('el indicador del requisito {string} se muestra como cumplido', async ({ registroQuestions }, requisito: string) => {
  await registroQuestions.verificarRequisitoContrasena(requisito, true);
});

Then('el indicador del requisito {string} se muestra como no cumplido', async ({ registroQuestions }, requisito: string) => {
  await registroQuestions.verificarRequisitoContrasena(requisito, false);
});
