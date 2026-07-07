import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav adminName={admin.name} />
      <main className="mx-auto max-w-[1280px] px-6 py-10">{children}</main>
    </div>
  );
}
