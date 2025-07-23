import Link from "next/link";

/**
 * Footer-Komponent
 * Zeigt den Fußbereich der Seite mit Projektinformationen und Navigation an.
 *
 * @param {Object} props
 * @param {Object} props.dict - Übersetzungsobjekt für statische Texte im Footer.
 * @param {string} props.dict.about - Text für den Link "About".
 * @param {string} props.dict.join - Text für den Link "Join".
 * @param {string} props.dict.impressum - Text für den Link "Impressum".
 * @param {string} props.dict.copyright - Text für den Copyright-Hinweis.
 * @param {Object} props.project - Projektinformationen.
 * @param {string} props.project.projectName - Name des Projekts.
 * @param {string} props.project.projectSlogan - Slogan des Projekts.
 *
 * @returns {JSX.Element} JSX für den Footer.
 */
export default function Footer({ dict, project }) {
  return (
    <div className="z-30 relative">
      <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10 z-50">
        <aside>
          <p className="font-bold">
            {project.projectName}
            <br />
            {project.projectSlogan}
          </p>
          <p>
            © {new Date().getFullYear()} {project.projectName} –{" "}
            {dict.copyright}
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link href="/about" className="hover:underline">
              {dict.about}
            </Link>
            <Link href="/join" className="hover:underline">
              {dict.join}
            </Link>
            <Link href="/impressum" className="hover:underline">
              {dict.impressum}
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
}
