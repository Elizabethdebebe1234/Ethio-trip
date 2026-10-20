
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import SignOutButton from "../../components/SignOutButton";
import GuideTripRequests from "../../components/GuideTripRequests";


const preparationTasks = [
  {
    title: "Review destination details",
    description: "Check highlights, suggested durations, and travel tips.",
  },
  {
    title: "Prepare guest activities",
    description: "Plan suitable activities for the selected destinations.",
  },
  {
    title: "Check trip arrangements",
    description: "Review transport, accommodation, and local arrangements.",
  },
];

export default async function GuidePage() {
  const session = await getSession();

  if (!session) redirect("/signin");
  if (session.role !== "guide") redirect("/customer");

  return (
    <main className="dashboard-page">
      <section className="dashboard-card guide-dashboard">
        <p className="auth-eyebrow">TRIP GUIDE WORKSPACE</p>
        <h1>Welcome, {session.username}!</h1>
        <p>
          Prepare for upcoming journeys by reviewing destinations and
          organizing guest activities.
        </p>

        <h2>Preparation checklist</h2>

        <div className="guide-task-list">
          {preparationTasks.map((task) => (
            <article className="guide-task" key={task.title}>
              <span aria-hidden="true">✓</span>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="dashboard-actions">
          <Link href="/destinations" className="dashboard-link">
            Review destinations
          </Link>
          <Link href="/itinerary" className="dashboard-link">
            View trip planner
          </Link>
        </div>

        <SignOutButton />
        <GuideTripRequests />
      </section>
    </main>
  );
}
