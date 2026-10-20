
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import SignOutButton from "../../components/SignOutButton";

export default async function CustomerPage() {
  const session = await getSession();

  if (!session) redirect("/signin");
  if (session.role !== "customer") redirect("/guide");

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="auth-eyebrow">CUSTOMER DASHBOARD</p>
        <h1>Welcome, {session.username}!</h1>
        <p>
          Your Ethiopian journey starts here. Explore destinations and build
          your travel itinerary.
        </p>

        <div className="dashboard-actions">
          <Link href="/customer/requests" className="dashboard-link">
  My trip requests
</Link>
          <Link href="/itinerary" className="dashboard-link">
            Plan your trip
          </Link>
          <Link href="/hotels" className="dashboard-link">
            Explore stays
          </Link>
        </div>

        <SignOutButton />
      </section>
    </main>
  );
}
