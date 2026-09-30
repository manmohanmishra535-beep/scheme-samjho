import { getAllSchemes } from "../../lib/schemes";
import CompareClient from "./CompareClient";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const schemes = await getAllSchemes();

  return <CompareClient schemes={schemes} />;
}