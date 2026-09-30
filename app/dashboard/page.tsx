import DashboardClient from "./Dashboardclient";
import { getAllSchemes } from "../../lib/schemes";

export default async function DashboardPage() {
  const schemes = await getAllSchemes();

  return <DashboardClient schemes={schemes} />;
}