# language: es
@US01 @registro
Característica: Registro de Usuario
  Como visitante
  Quiero registrarme proporcionando mis datos personales
  Para poder acceder al sistema como lector y consultar el catálogo de libros

  Antecedentes:
    Dado que soy un visitante en la página de registro

  @TC-REG-001 @smoke @Alta @Positivo
  Escenario: Registro exitoso con todos los campos obligatorios válidos
    Cuando completo el formulario de registro con datos obligatorios válidos dinámicos
    Y presiono el botón "Registrarme"
    Entonces el sistema crea la cuenta exitosamente
    Y se muestra un mensaje indicando que revise su email para confirmar la cuenta

  @TC-REG-002 @regression @Alta @Positivo
  Escenario: Registro exitoso con todos los campos (obligatorios y opcionales)
    Cuando completo el formulario de registro con todos los campos válidos dinámicos
    Y presiono el botón "Registrarme"
    Entonces el sistema crea la cuenta exitosamente
    Y se muestra un mensaje indicando que revise su email para confirmar la cuenta

  @TC-REG-003 @regression @Alta @Negativo
  Escenario: Validación campo Nombre vacío
    Cuando completo el formulario dejando el campo Nombre vacío:
      | Apellido | Email            | Contraseña   | Confirmar |
      | García   | test@yopmail.com | Valida#1pwd  | Valida#1pwd |
    Y presiono el botón "Registrarme"
    Entonces el campo Nombre muestra el mensaje de error "Este campo es obligatorio"

  @TC-REG-004 @regression @Alta @Negativo
  Escenario: Validación campo Apellido vacío
    Cuando completo el formulario dejando el campo Apellido vacío:
      | Nombre | Email             | Contraseña   | Confirmar |
      | Juan   | test2@yopmail.com | Valida#1pwd  | Valida#1pwd |
    Y presiono el botón "Registrarme"
    Entonces el campo Apellido muestra el mensaje de error "Este campo es obligatorio"

  @TC-REG-005 @regression @Alta @Negativo
  Escenario: Validación campo Email vacío
    Cuando completo el formulario dejando el campo Email vacío:
      | Nombre | Apellido | Contraseña   | Confirmar |
      | Laura  | Martínez | Valida#1pwd  | Valida#1pwd |
    Y presiono el botón "Registrarme"
    Entonces el campo Email muestra el mensaje de error "Este campo es obligatorio"

  @TC-REG-006 @regression @Alta @Negativo
  Escenario: Validación campo Contraseña vacío
    Cuando completo el formulario dejando el campo Contraseña vacío:
      | Nombre | Apellido | Email             | Confirmar |
      | Pedro  | Sánchez  | pedro@yopmail.com |           |
    Y presiono el botón "Registrarme"
    Entonces el campo Contraseña muestra el mensaje de error "Este campo es obligatorio"

  @TC-REG-007 @regression @Alta @Negativo
  Escenario: Validación campo Confirmar contraseña vacío
    Cuando completo el formulario dejando el campo Confirmar contraseña vacío:
      | Nombre | Apellido | Email                  | Contraseña   |
      | Ana    | Torres   | ana.torres@yopmail.com | Segura#1pass |
    Y presiono el botón "Registrarme"
    Entonces el campo Confirmar contraseña muestra el mensaje de error "Este campo es obligatorio"

  @TC-REG-008 @regression @Alta @Negativo
  Escenario: Validación todos los campos obligatorios vacíos
    Cuando dejo todos los campos del formulario vacíos
    Y presiono el botón "Registrarme"
    Entonces todos los campos obligatorios muestran el mensaje de error "Este campo es obligatorio"

  @TC-REG-009 @regression @Alta @Negativo
  Escenario: Email con formato inválido - sin arroba
    Cuando completo el formulario con los siguientes datos:
      | Nombre  | Apellido | Email           |
      | Roberto | Díaz     | robertodiaz.com |
    Y quito el foco del campo Email
    Entonces el campo Email muestra el mensaje de error "Ingresa un email válido"

  @TC-REG-010 @regression @Alta @Negativo
  Escenario: Email con formato inválido - sin dominio
    Cuando completo el formulario con los siguientes datos:
      | Nombre  | Apellido | Email    |
      | Roberto | Díaz     | roberto@ |
    Y quito el foco del campo Email
    Entonces el campo Email muestra el mensaje de error "Ingresa un email válido"

  @TC-REG-011 @regression @Media @Negativo
  Escenario: Email con formato inválido - sin extensión de dominio
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email         |
      | Sofía  | Vega     | sofia@dominio |
    Y quito el foco del campo Email
    Entonces el campo Email muestra el mensaje de error "Ingresa un email válido"

  @TC-REG-012 @regression @Media @Negativo
  Escenario: Email con formato inválido - espacios en el email
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email                      |
      | Luis   | Fernández| luis fernandez@yopmail.com |
    Y quito el foco del campo Email
    Entonces el campo Email muestra el mensaje de error "Ingresa un email válido"

  @TC-REG-013 @regression @Alta @Negativo
  Escenario: Email duplicado ya registrado
    Dado un email dinámico ya registrado en el sistema
    Cuando completo el formulario de registro usando el mismo email registrado
    Y presiono el botón "Registrarme"
    Entonces el sistema muestra el mensaje de error "Este email ya se encuentra registrado"
    Y el campo "Nombre" mantiene el valor de la precondición
    Y el campo "Apellido" mantiene el valor de la precondición
    Y el campo "Email" mantiene el valor de la precondición

  @TC-REG-014 @regression @Alta @Negativo
  Escenario: Contraseña sin mayúscula
    Cuando completo el formulario con los siguientes datos:
      | Nombre  | Apellido | Email               | Contraseña   |
      | Valeria | Ríos     | valeria@yopmail.com | segura#1pass |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como no cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como cumplido

  @TC-REG-015 @regression @Alta @Negativo
  Escenario: Contraseña sin número
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email              | Contraseña  |
      | Camila | Herrera  | camila@yopmail.com | Segura#pass |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como no cumplido

  @TC-REG-016 @regression @Alta @Negativo
  Escenario: Contraseña sin carácter especial
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email             | Contraseña  |
      | Tomás  | Navarro  | tomas@yopmail.com | Segura1pass |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como cumplido

  @TC-REG-017 @regression @Alta @Negativo
  Escenario: Contraseña con menos de 8 caracteres
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email             | Contraseña |
      | Elena  | Castro   | elena@yopmail.com | Se#1pas    |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como no cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como cumplido

  @TC-REG-018 @regression @Alta @Borde
  Escenario: Contraseña con exactamente 8 caracteres (límite inferior)
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email             | Contraseña |
      | Lucía  | Ramos    | lucia@yopmail.com | Clave#1a   |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como cumplido

  @TC-REG-019 @regression @Alta @Negativo
  Escenario: Contraseña sin ningún requisito cumplido
    Cuando completo el formulario con los siguientes datos:
      | Nombre | Apellido | Email             | Contraseña |
      | Pablo  | Romero   | pablo@yopmail.com | abc        |
    Y quito el foco del campo Contraseña
    Entonces el indicador del requisito "Mínimo 8 caracteres" se muestra como no cumplido
    Y el indicador del requisito "Al menos 1 mayúscula" se muestra como no cumplido
    Y el indicador del requisito "Al menos 1 número" se muestra como no cumplido

  @TC-REG-020 @regression @Alta @Negativo
  Escenario: Contraseñas no coinciden
    Cuando completo el formulario con los siguientes datos obligatorios:
      | Nombre   | Apellido | Email                | Contraseña   | Confirmar       |
      | Fernando | Álvarez  | fernando@yopmail.com | Segura#1pass | Diferente#2pass |
    Y quito el foco del campo Confirmar contraseña
    Y presiono el botón "Registrarme"
    Entonces el campo Confirmar contraseña muestra el mensaje de error "Las contraseñas no coinciden"
