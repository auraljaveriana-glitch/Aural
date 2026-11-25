import styles from "./BotonWhatsapp.module.css";

/* Botón flotante de WhatsApp que abre el chat con Amanda (Jean, 25-nov-2026), en todas las páginas. */
const NUMERO = "573161154783";
const MENSAJE = "Hola, vengo de la página web de Aural y quiero más información.";

export default function BotonWhatsapp() {
  return (
    <a
      className={styles.boton}
      href={`https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.78c-2.02 0-4-.54-5.73-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.73 10.73 0 0 1 5.28 16c0-5.94 4.83-10.77 10.76-10.77S26.79 10.06 26.79 16s-4.82 10.78-10.75 10.78Zm5.9-8.07c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.52-.16-.73.16-.22.33-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.33-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.33-.02-.5.14-.66.15-.14.33-.38.49-.57.16-.19.21-.33.32-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.91-.78 2.18-1.53.27-.76.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z"
        />
      </svg>
    </a>
  );
}
