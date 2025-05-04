import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200">
      <div className="hero min-h-screen">
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{dict.home.title}</h1>
            <p className="mb-5">{dict.home.description}</p>
            <Link href={`/${lang}/pro`}>
              <button className="btn btn-primary">Pro Argumente</button>
            </Link>
            <Link href={`/${lang}/contra`} className="ml-2">
              <button className="btn btn-primary">Contra Argumente</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
