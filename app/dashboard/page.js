import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>FamiliePlan Dashboard</h1>
      <p>Du er logget inn.</p>

      <div style={{ marginTop: 24 }}>
        <p><strong>Navn:</strong> {user.name}</p>
        <p><strong>E-post:</strong> {user.email}</p>
        <p><strong>Rolle:</strong> {user.role}</p>
      </div>
    </main>
  );
}
