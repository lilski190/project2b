/**
 * Footer Komponent
 * Dieser Komponent ist ein Footer, der am unteren Ende der Seite angezeigt wird.
 * Das Styling erfolgt über Tailwind CSS-Klassen und DaisyUI-Klassen.
 * @param {String} lang - Die aktuelle Sprache der Anwendung, die in der URL verwendet wird.
 */
export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="inline-block fill-current"
        >
          <path d="M22.672 15.226l-2.432.811..."></path>
        </svg>
        <p className="font-bold">
          Footer Title
          <br />
          So nen Untertitel mit evtl contact info?
        </p>
        <p>Copyright © {new Date().getFullYear()} - Oder so was</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">{/* Social icons */}</div>
      </nav>
    </footer>
  );
}
