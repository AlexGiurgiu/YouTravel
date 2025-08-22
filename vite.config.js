import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/<YouTravel>/", // <-- e.g. "/youtravel-site/"
});