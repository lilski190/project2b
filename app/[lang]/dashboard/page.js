import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.dashboard.title}</h1>
      <h1>
        {dict.dashboard.welcome} : {user.email}
      </h1>
    </div>
  );
}
