import SavedClient from "./SavedClient";
import { getAllSchemes } from "../../lib/schemes";

export default async function SavedPage() {
  const schemes = await getAllSchemes();

  return <SavedClient schemes={schemes} />;
}