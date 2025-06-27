import Link from "next/link";
export default function Footer({ dict }) {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
        <aside>
          <p className="font-bold">
            {dict.name}
            <br />
            {dict.description}
          </p>
          <p>
            © {new Date().getFullYear()} {dict.name} – {dict.copyright}
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
