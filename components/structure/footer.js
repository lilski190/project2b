import Link from "next/link";
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
