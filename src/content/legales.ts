/**
 * Páginas legales (diseños de Jean "TERMINOS Y CONDICIONES", "politica de privacidad" y
 * "politica de privacidad (1)" = Política de Cookies, 25-nov-2026). Textos tal como vienen en el diseño.
 * En los textos, **así** va en negrita y [texto](/ruta) es un enlace.
 */

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "tabla"; filas: [string, string][] }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "grupos"; grupos: { nombre: string; items: string[] }[] }
  | { tipo: "tipos"; tipos: { nombre: string; bloques: Bloque[] }[] };

export type SeccionLegal = { titulo: string; bloques: Bloque[] };

export type PaginaLegal = {
  slug: string;
  /** título de la pestaña del navegador */
  nombre: string;
  titulo: string[];
  intro: string[];
  secciones: SeccionLegal[];
};

const p = (texto: string): Bloque => ({ tipo: "parrafo", texto });
const l = (...items: string[]): Bloque => ({ tipo: "lista", items });

const titular: Bloque = {
  tipo: "tabla",
  filas: [
    ["Razón social", "AURAL COLOMBIA S.A.S"],
    ["NIT", "901.271.670-5"],
    ["Domicilio principal", "Bogotá D.C. Colombia"],
  ],
};

export const terminos: PaginaLegal = {
  slug: "terminos-y-condiciones",
  nombre: "Términos y Condiciones de Uso",
  titulo: ["Términos y", "condiciones de uso"],
  intro: [
    "El presente documento regula el acceso y uso del sitio web operado por AURAL COLOMBIA S.A.S. Al navegar, acceder o utilizar este sitio web, el usuario acepta expresamente los siguientes Términos y Condiciones. Si no está de acuerdo con ellos, deberá abstenerse de utilizar el sitio.",
  ],
  secciones: [
    {
      titulo: "Identificación del titular del sitio",
      bloques: [
        titular,
        { tipo: "subtitulo", texto: "Actividad" },
        p("Prestación de servicios de salud auditiva, comercialización de dispositivos médicos auditivos, audífonos y soluciones relacionadas con la audición."),
      ],
    },
    {
      titulo: "Objeto del sitio web",
      bloques: [
        p("El sitio web de Aural Colombia tiene como finalidad:"),
        l(
          "Brindar información institucional sobre la empresa, sus servicios y productos.",
          "Facilitar el contacto con usuarios, pacientes y clientes.",
          "Permitir el agendamiento de citas y solicitudes de información.",
          "Difundir contenidos educativos, informativos y comerciales relacionados con la salud auditiva.",
        ),
        p("La información publicada **no sustituye** la valoración clínica, diagnóstico ni tratamiento profesional."),
      ],
    },
    {
      titulo: "Condición de usuario",
      bloques: [
        p("La persona que accede al sitio adquiere la condición de usuario, comprometiéndose a hacer un uso adecuado, lícito y responsable del contenido y servicios ofrecidos."),
        p("El usuario declara ser mayor de edad o contar con la autorización de su representante legal."),
      ],
    },
    {
      titulo: "Uso adecuado del sitio",
      bloques: [
        p("El usuario se obliga a:"),
        l(
          "Utilizar el sitio conforme a la ley colombiana y la buena fe.",
          "No realizar actividades que afecten la seguridad, funcionamiento o disponibilidad del sitio.",
          "No introducir virus, malware o cualquier elemento tecnológico dañino.",
          "No utilizar el sitio para fines fraudulentos, ilegales o no autorizados.",
          "Proporcionar información veraz en formularios y canales de contacto.",
        ),
        p("Aural Colombia se reserva el derecho de restringir el acceso al sitio ante usos indebidos."),
      ],
    },
    {
      titulo: "Contenido médico y responsabilidad",
      bloques: [
        p("El contenido del sitio web es **informativo y educativo.** No constituye asesoría médica ni reemplaza la consulta con un audiólogo, fonoaudiólogo u otorrinolaringólogo."),
        p("Aural Colombia no será responsable por decisiones tomadas por el usuario basadas únicamente en la información publicada en el sitio."),
      ],
    },
    {
      titulo: "Agendamiento de citas",
      bloques: [
        p("El agendamiento de citas a través del sitio web:"),
        l(
          "Está sujeto a disponibilidad de agenda y confirmación.",
          "Puede ser modificado o cancelado por razones operativas o de fuerza mayor.",
          "No constituye una atención médica automática ni inmediata.",
        ),
        p("Aural Colombia se reserva el derecho de reprogramar citas informando oportunamente al usuario."),
      ],
    },
    {
      titulo: "Propiedad intelectual",
      bloques: [
        p("Todos los contenidos del sitio web (textos, imágenes, logotipos, marcas, diseños, videos y demás elementos) son propiedad de Aural Colombia o de terceros autorizados. Queda prohibida su reproducción, distribución, modificación o uso comercial sin autorización previa y expresa."),
      ],
    },
    {
      titulo: "Protección de datos personales",
      bloques: [
        p("El tratamiento de datos personales se realiza conforme a la **Ley 1581 de 2012**, el **Decreto 1377 de 2013** y demás normas aplicables. El usuario puede consultar la [**Política de Privacidad y Tratamiento de Datos Personales**](/politica-de-privacidad) disponible en el sitio web."),
      ],
    },
    {
      titulo: "Uso de cookies",
      bloques: [
        p("Este sitio utiliza cookies propias y de terceros para mejorar la experiencia del usuario, analizar la navegación y apoyar estrategias de comunicación. El uso de cookies se regula conforme a la [**Política de Cookies**](/politica-de-cookies), la cual el usuario puede consultar y configurar en cualquier momento."),
      ],
    },
    {
      titulo: "Enlaces a terceros",
      bloques: [
        p("El sitio puede contener enlaces a páginas de terceros. AURAL COLOMBIA no se responsabiliza por el contenido, políticas o prácticas de dichos sitios externos."),
        p("El acceso a enlaces de terceros se realiza bajo responsabilidad del usuario."),
      ],
    },
    {
      titulo: "Limitación de responsabilidad",
      bloques: [
        p("Aural Colombia no garantiza que el sitio esté libre de errores, interrupciones o fallas técnicas. No será responsable por daños directos o indirectos derivados del uso o imposibilidad de uso del sitio web."),
      ],
    },
    {
      titulo: "Modificaciones",
      bloques: [
        p("Aural Colombia podrá modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en el sitio web."),
      ],
    },
    {
      titulo: "Legislación aplicable y jurisdicción",
      bloques: [
        p("Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta ante los jueces competentes del territorio colombiano."),
      ],
    },
    {
      titulo: "Contacto",
      bloques: [
        p("Para consultas relacionadas con estos Términos y Condiciones, el usuario podrá comunicarse a través de los canales oficiales publicados en el sitio web de Aural Colombia."),
      ],
    },
  ],
};

export const privacidad: PaginaLegal = {
  slug: "politica-de-privacidad",
  nombre: "Política de Privacidad y Tratamiento de Datos Personales",
  titulo: ["Política de privacidad y", "tratamiento de datos", "personales"],
  intro: [
    "En AURAL COLOMBIA S.A.S, valoramos la privacidad y protegemos los datos personales de nuestros usuarios, pacientes, clientes, proveedores y aliados. Esta Política establece la forma en que recolectamos, usamos, almacenamos y protegemos la información personal, en cumplimiento de la legislación colombiana vigente.",
  ],
  secciones: [
    {
      titulo: "Responsable del tratamiento de los datos",
      bloques: [
        titular,
        { tipo: "subtitulo", texto: "Actividad" },
        p("Prestación de servicios de salud auditiva y comercialización de dispositivos médicos auditivos."),
        p("Aural Colombia actúa como responsable del tratamiento de los datos personales conforme a la Ley 1581 de 2012."),
      ],
    },
    {
      titulo: "Marco legal",
      bloques: [
        p("Esta Política se rige por:"),
        l(
          "Ley 1581 de 2012 – Protección de Datos Personales",
          "Decreto 1377 de 2013",
          "Decreto 1074 de 2015",
          "Normatividad vigente aplicable al sector salud en Colombia.",
        ),
      ],
    },
    {
      titulo: "Principios para el tratamiento de datos",
      bloques: [
        p("Aural Colombia aplica los principios de:"),
        l(
          "Legalidad",
          "Finalidad",
          "Libertad",
          "Veracidad o calidad",
          "Transparencia",
          "Acceso y circulación restringida",
          "Seguridad",
          "Confidencialidad",
        ),
      ],
    },
    {
      titulo: "Datos personales recolectados",
      bloques: [
        p("Aural Colombia podrá recolectar, entre otros, los siguientes datos:"),
        {
          tipo: "grupos",
          grupos: [
            { nombre: "Datos de identificación", items: ["Nombre y apellidos", "Documento de identidad", "Fecha de nacimiento"] },
            { nombre: "Datos de contacto", items: ["Teléfono", "Correo electrónico", "Dirección"] },
            {
              nombre: "Datos administrativos y comerciales",
              items: ["Información de citas, cotizaciones y seguimiento", "Canales de contacto utilizados (Web, WhatsApp, llamadas)."],
            },
            { nombre: "Datos sensibles", items: ["Información relacionada con la salud auditiva y procesos clínicos."] },
          ],
        },
      ],
    },
    {
      titulo: "Finalidades del tratamiento",
      bloques: [
        p("Los datos personales serán tratados para:"),
        l(
          "Agendar, confirmar y gestionar citas audiológicas",
          "Prestar servicios de salud auditiva y seguimiento posatención",
          "Gestionar historias clínicas conforme a la ley",
          "Contactar al titular para fines asistenciales, informativos o administrativos",
          "Enviar recordatorios, recomendaciones y comunicaciones relacionadas con el servicio",
          "Gestionar procesos comerciales y de atención al usuario",
          "Cumplir obligaciones legales y regulatorias",
          "Realizar análisis internos de calidad y mejora del servicio (sin divulgación pública).",
        ),
      ],
    },
    {
      // en el diseño esta sección se llama "Derechos del titular" y la siguiente "Propiedad intelectual";
      // se corrigieron para que el título coincida con el texto (pendiente de confirmar con Jean)
      titulo: "Datos sensibles",
      bloques: [
        p("Aural Colombia podrá tratar datos sensibles, especialmente información de salud, **únicamente con autorización previa, expresa e informada del titular** y solo para fines asistenciales y clínicos. El titular no está obligado a autorizar el tratamiento de datos sensibles; sin embargo, su no autorización puede limitar la prestación del servicio de salud."),
      ],
    },
    {
      titulo: "Derechos del titular",
      bloques: [
        p("El titular de los datos personales tiene derecho a:"),
        l(
          "Conocer, actualizar y rectificar sus datos.",
          "Solicitar prueba de la autorización otorgada.",
          "Ser informado sobre el uso de sus datos.",
          "Revocar la autorización o solicitar la supresión del dato cuando sea procedente.",
          "Acceder gratuitamente a sus datos personales.",
        ),
      ],
    },
    {
      titulo: "Canales para ejercer derechos",
      bloques: [
        p("El titular podrá ejercer sus derechos mediante solicitud escrita a través de los canales oficiales de contacto publicados en el sitio web de Aural Colombia."),
        p("Las solicitudes serán atendidas dentro de los términos establecidos por la ley."),
      ],
    },
    {
      titulo: "Seguridad de la información",
      bloques: [
        p("Aural Colombia adopta medidas técnicas, humanas y administrativas razonables para proteger los datos personales contra acceso no autorizado, pérdida, alteración o uso indebido. El acceso a la información está restringido exclusivamente a personal autorizado."),
      ],
    },
    {
      titulo: "Transferencia y transmisión de datos",
      bloques: [
        p("Los datos personales podrán ser compartidos con:"),
        l(
          "Profesionales de la salud vinculados a la atención del paciente.",
          "Proveedores tecnológicos (CRM, plataformas de agendamiento, automatización).",
          "Autoridades competentes cuando sea requerido por ley.",
        ),
        p("En ningún caso Aural Colombia venderá o comercializará datos personales."),
      ],
    },
    {
      titulo: "Conservación de la información",
      bloques: [
        p("Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades del tratamiento y las obligaciones legales, especialmente las relacionadas con historias clínicas y normatividad en salud."),
      ],
    },
    {
      titulo: "Uso de cookies y tecnologías similares",
      bloques: [
        p("El sitio web utiliza cookies conforme a lo establecido en la [Política de Cookies](/politica-de-cookies), la cual el usuario puede consultar y configurar en cualquier momento."),
      ],
    },
    {
      titulo: "Modificaciones a la política",
      bloques: [
        p("AURAL COLOMBIA se reserva el derecho de modificar esta Política de Privacidad en cualquier momento."),
        p("Las modificaciones serán publicadas en el sitio web y entrarán en vigencia desde su publicación."),
      ],
    },
    {
      titulo: "Vigencia",
      bloques: [
        p("La presente Política de Privacidad rige a partir de su publicación y permanecerá vigente mientras se mantenga la finalidad del tratamiento de los datos."),
      ],
    },
  ],
};

export const cookies: PaginaLegal = {
  slug: "politica-de-cookies",
  nombre: "Política de Cookies",
  titulo: ["Política de cookies"],
  intro: [
    "En **AURAL COLOMBIA S.A.S** utilizamos cookies y tecnologías similares para garantizar el correcto funcionamiento del sitio web, mejorar la experiencia de navegación, analizar el uso del sitio y apoyar nuestras estrategias de comunicación, respetando siempre la privacidad de los usuarios.",
    "Al acceder y navegar por este sitio web, el usuario podrá aceptar, rechazar o configurar el uso de cookies conforme a la presente Política.",
  ],
  secciones: [
    {
      titulo: "¿Qué son las cookies?",
      bloques: [
        p("Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario (computador, tablet o teléfono móvil) al visitar un sitio web. Estas permiten reconocer el dispositivo, recordar preferencias y recopilar información sobre la navegación."),
      ],
    },
    {
      titulo: "¿Qué tipos de cookies utiliza Aural Colombia?",
      bloques: [
        {
          tipo: "tipos",
          tipos: [
            {
              // así viene en el diseño (¿"Cookies necesarias"?): pendiente de confirmar con Jean
              nombre: "Datos de identificación",
              bloques: [
                p("Son esenciales para el funcionamiento del sitio web y no requieren consentimiento previo. Permiten:"),
                l("Navegar de forma segura por el sitio", "Acceder a formularios y funcionalidades básicas", "Recordar decisiones relacionadas con el uso de cookies"),
              ],
            },
            {
              nombre: "Cookies analíticas",
              bloques: [
                p("Permiten recopilar información estadística y anónima sobre el uso del sitio web, como:"),
                l("Páginas visitadas", "Tiempo de permanencia", "Tipo de dispositivo y navegador"),
                p("Aural Colombia utiliza herramientas como **Google Analytics** para estos fines."),
              ],
            },
            {
              nombre: "Cookies de funcionalidad",
              bloques: [
                p("Permiten recordar preferencias del usuario, tales como:"),
                l("Idioma", "Datos previamente ingresados en formularios", "Configuraciones básicas del sitio"),
              ],
            },
            {
              nombre: "Cookies de marketing y publicidad",
              bloques: [
                p("Permiten medir la efectividad de campañas y mostrar contenidos relacionados con los intereses del usuario."),
                p("Estas cookies pueden ser propias o de terceros, como **Meta Pixel (Facebook e Instagram).**"),
              ],
            },
            {
              nombre: "Cookies de comunicación",
              bloques: [
                p("El sitio puede integrar botones o enlaces de contacto a **WhatsApp**, los cuales permiten iniciar conversaciones directas. Al utilizar este canal, el usuario acepta las condiciones propias de dicha plataforma."),
              ],
            },
          ],
        },
      ],
    },
    {
      titulo: "Cookies de terceros",
      bloques: [
        p("El sitio web puede utilizar cookies de terceros, tales como:"),
        l("Google Analytics", "Meta (Facebook / Instagram)", "Plataformas de automatización y CRM"),
        p("Aural Colombia no controla directamente estas cookies, por lo que se recomienda consultar las políticas de privacidad de dichos terceros."),
      ],
    },
    {
      titulo: "Gestión del consentimiento",
      bloques: [
        p("Al ingresar al sitio web, el usuario podrá:"),
        l("Aceptar todas las cookies", "Rechazar las cookies no necesarias", "Configurar sus preferencias"),
        p("Las cookies analíticas y de marketing **solo se activarán con el consentimiento del usuario.**"),
      ],
    },
    {
      titulo: "Desactivación de cookies",
      bloques: [
        p("El usuario puede desactivar o eliminar cookies en cualquier momento a través de:"),
        l("La configuración del navegador", "El panel de configuración de cookies del sitio web"),
        p("La desactivación de algunas cookies puede afectar el correcto funcionamiento del sitio."),
      ],
    },
    {
      titulo: "Protección de datos personales",
      bloques: [
        p("El uso de cookies que implique tratamiento de datos personales se realiza conforme a la [**Política de Privacidad y Tratamiento de Datos Personales**](/politica-de-privacidad) de Aural Colombia y la legislación colombiana vigente."),
      ],
    },
    {
      titulo: "No uso de datos sensibles",
      bloques: [
        p("Aural Colombia **no utiliza cookies para recolectar datos clínicos, diagnósticos o información sensible de salud.** Los datos de salud solo se recolectan por canales asistenciales autorizados y con consentimiento expreso."),
      ],
    },
    {
      titulo: "Transferencia internacional de datos",
      bloques: [
        p("Algunas cookies pueden implicar transferencia internacional de datos. Estas transferencias se realizan conforme a estándares adecuados de seguridad y a las políticas de los proveedores tecnológicos utilizados."),
      ],
    },
    {
      titulo: "Modificaciones a la política de cookies",
      bloques: [
        p("Aural Colombia se reserva el derecho de modificar la presente Política de Cookies en cualquier momento."),
        p("Las modificaciones entrarán en vigencia desde su publicación en el sitio web."),
      ],
    },
    {
      titulo: "Contacto",
      bloques: [
        p("Para cualquier duda relacionada con el uso de cookies, el usuario podrá comunicarse a través de los canales oficiales publicados en el sitio web de **AURAL COLOMBIA.**"),
      ],
    },
  ],
};

export const paginasLegales = [terminos, privacidad, cookies];
