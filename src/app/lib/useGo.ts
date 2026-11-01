import { useCallback } from "react";
import { useNavigate } from "react-router";
import { pathFor } from "../routes/routeTable";

/** Navigate to a route id ("contact", "products", ...) from any component that has no onNavigate prop. */
export function useGo() {
  const navigate = useNavigate();
  return useCallback((id: string) => navigate(pathFor(id)), [navigate]);
}
