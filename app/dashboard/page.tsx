import { fetchLiveDashboardData } from "./github";
import { DashboardClient } from "./DashboardClient";

const isProduction = process.env.NEXT_PUBLIC_STAGE === "production";

export default async function DashboardPage() {
  if (isProduction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Not found</p>
      </div>
    );
  }

  const liveData = await fetchLiveDashboardData();

  return <DashboardClient liveData={liveData} />;
}
