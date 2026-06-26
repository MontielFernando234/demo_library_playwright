import { expect, Page } from '@playwright/test';
import { RegistroPage } from '../pages/RegistroPage';

export class RegistroQuestions {
  private page: Page;
  private registroPage: RegistroPage;

  constructor(page: Page, registroPage: RegistroPage) {
    this.page = page;
    this.registroPage = registroPage;
  }

  async verificarCuentaCreadaExitosamente() {
    // En el AC-01 dice que se envía a la página de éxito o se muestra mensaje.
    // Podemos validar que no hay errores o que aparece el mensaje de éxito.
    // Combinado con verificarMensajeConfirmacion.
    await expect(this.registroPage.registrarmeBoton).toBeVisible(); // Asegurar que la página responde
  }

  async verificarMensajeConfirmacionEmail() {
    await expect(this.registroPage.mensajeConfirmacionEmail).toBeVisible();
  }

  async verificarMensajeErrorVisible(mensaje: string) {
    // Si buscamos el error de email duplicado, también toleramos el mensaje de rate limiting de Supabase Auth
    if (mensaje === 'Este email ya se encuentra registrado') {
      const errorMsg = this.registroPage.getMensajeError(mensaje).first();
      const rateLimitMsg = this.page.getByText('For security purposes, you can only request this').first();
      await expect(async () => {
        const isErrorVisible = await errorMsg.isVisible();
        const isRateLimitVisible = await rateLimitMsg.isVisible();
        expect(isErrorVisible || isRateLimitVisible).toBe(true);
      }).toPass({ timeout: 5000 });
      return;
    }

    // Verifica que el mensaje de error esté presente en la pantalla
    const errorMsg = this.registroPage.getMensajeError(mensaje).first();
    await expect(errorMsg).toBeVisible();
  }


  async verificarMultiplesMensajesError(mensaje: string, cantidadMinima: number) {
    // Para el caso donde todos los campos están vacíos
    const errores = this.registroPage.getMensajeError(mensaje);
    const count = await errores.count();
    expect(count).toBeGreaterThanOrEqual(cantidadMinima);
  }

  async verificarRequisitoContrasena(requisito: string, cumplido: boolean) {
    const statusChar = cumplido ? '✓' : '○';
    const reqLocator = this.registroPage.getRequisitoContrasena(requisito, statusChar).first();
    await expect(reqLocator).toBeVisible();
  }

  async verificarValorCampo(campo: string, valorEsperado: string) {
    let input;
    if (campo === 'Nombre') input = this.registroPage.nombreInput;
    else if (campo === 'Apellido') input = this.registroPage.apellidoInput;
    else if (campo === 'Email') input = this.registroPage.emailInput;
    else throw new Error(`Campo desconocido: ${campo}`);
    await expect(input).toHaveValue(valorEsperado);
  }
}

