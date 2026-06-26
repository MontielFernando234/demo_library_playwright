import { Page, Locator } from '@playwright/test';

export class RegistroPage {
  readonly page: Page;

  // Form Inputs
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmarPasswordInput: Locator;
  readonly camposOpcionalesToggle: Locator;
  readonly fechaNacimientoInput: Locator;
  readonly direccionInput: Locator;
  
  // Buttons
  readonly registrarmeBoton: Locator;

  // Mensajes de Éxito / Alertas
  readonly mensajeConfirmacionEmail: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators Nivel 1 (User-facing) según ADR-003
    this.nombreInput = page.getByLabel('Nombre *', { exact: true });
    this.apellidoInput = page.getByLabel('Apellido *', { exact: true });
    this.emailInput = page.getByLabel('Email *', { exact: true });
    this.passwordInput = page.getByLabel('Contraseña *', { exact: true });
    this.confirmarPasswordInput = page.getByLabel('Confirmar contraseña *', { exact: true });
    this.camposOpcionalesToggle = page.locator('summary', { hasText: 'Campos opcionales' });
    this.fechaNacimientoInput = page.getByLabel('Fecha de nacimiento');
    this.direccionInput = page.getByLabel('Dirección');
    
    this.registrarmeBoton = page.getByRole('button', { name: 'Registrarme' });

    // Mensaje estático esperado tras el éxito
    this.mensajeConfirmacionEmail = page.getByText('revise su email para confirmar la cuenta', { exact: false });
  }

  // Método para obtener mensajes dinámicos de error en base al texto
  getMensajeError(texto: string): Locator {
    return this.page.getByText(texto);
  }

  // Método para obtener el indicador de requisito de contraseña
  getRequisitoContrasena(texto: string, statusChar: string): Locator {
    return this.page.locator('div, p, li').filter({ hasText: texto }).filter({ hasText: statusChar });
  }
}

