import { faker } from '@faker-js/faker';

export interface UserData {
  Nombre: string;
  Apellido: string;
  Email: string;
  Contraseña: string;
  Confirmar: string;
  [key: string]: string;
}

export class DataGenerator {
  static generateRandomName(): string {
    // Retorna un primer nombre
    return faker.person.firstName();
  }

  static generateRandomLastname(): string {
    // Retorna un apellido
    return faker.person.lastName();
  }

  static generateRandomEmail(firstName?: string, lastName?: string): string {
    const fn = (firstName || faker.person.firstName())
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
    const ln = (lastName || faker.person.lastName())
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
    const randomNum = faker.number.int({ min: 100, max: 99999 });
    return `${fn}.${ln}.${randomNum}@yopmail.com`;
  }

  static generateRandomUser(): UserData {
    const Nombre = this.generateRandomName();
    const Apellido = this.generateRandomLastname();
    const Email = this.generateRandomEmail(Nombre, Apellido);
    // Generar contraseña válida que cumpla con los requisitos (longitud >= 8, al menos 1 mayúscula, al menos 1 número)
    const Contraseña = 'Clave' + faker.string.alphanumeric(4) + faker.number.int({ min: 1, max: 9 });
    return {
      Nombre,
      Apellido,
      Email,
      Contraseña,
      Confirmar: Contraseña
    };
  }
}
