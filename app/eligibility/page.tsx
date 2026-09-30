import { getAllSchemes } from "../../lib/schemes";
import EligibilityClient from "./EligibilityClient";

export default async function EligibilityPage() {
  const schemes = await getAllSchemes();

  return <EligibilityClient schemes={schemes} />;
}