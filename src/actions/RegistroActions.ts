import { Page } from '@playwright/test';
import { RegistroPage } from '../pages/RegistroPage';

export class RegistroActions {
  private page: Page;
  private registroPage: RegistroPage;

  constructor(page: Page, registroPage: RegistroPage) {
    this.page = page;
    this.registroPage = registroPage;
  }

  async navegarARegistro() {
    // Navegamos al root (que redirige a /login) y hacemos clic en "Regístrate"
    // Esto es necesario porque Netlify no tiene configurado el fallback de SPA y da 404 al ir directo a /register
    await this.page.goto('/');
    await this.page.waitForURL(url => url.pathname.includes('/login') || url.pathname.includes('/register'));
    if (this.page.url().includes('/login')) {
      await this.page.locator('text="Regístrate"').click();
    }
  }

  async completarFormulario(datos: Record<string, string>) {
    // Se mapean los datos del DataTable a los inputs correspondientes
    if (datos.Nombre) await this.registroPage.nombreInput.fill(datos.Nombre);
    if (datos.Apellido) await this.registroPage.apellidoInput.fill(datos.Apellido);
    if (datos.Email) await this.registroPage.emailInput.fill(datos.Email);
    if (datos.Contraseña) await this.registroPage.passwordInput.fill(datos.Contraseña);
    if (datos.Confirmar) await this.registroPage.confirmarPasswordInput.fill(datos.Confirmar);
    
    if (datos['Fecha de nacimiento'] || datos.Dirección) {
      const isExpanded = await this.registroPage.camposOpcionalesToggle.evaluate((el: HTMLElement) => {
        const details = el.closest('details');
        return details ? details.open : false;
      });
      if (!isExpanded) {
        await this.registroPage.camposOpcionalesToggle.click();
      }
    }

    if (datos['Fecha de nacimiento']) {
      await this.registroPage.fechaNacimientoInput.fill(datos['Fecha de nacimiento']);
    }
    if (datos.Dirección) {
      await this.registroPage.direccionInput.fill(datos.Dirección);
    }
  }

  async enviarFormulario() {
    await this.registroPage.registrarmeBoton.click();
  }

  async quitarFocoDeEmail() {
    await this.registroPage.emailInput.blur();
    // Forzar validación de formulario para que se muestren los errores en el frontend real
    await this.enviarFormulario();
  }
}
