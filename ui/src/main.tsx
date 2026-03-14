import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { injectStyles } from "@a2ui/react/styles";
import { initializeDefaultCatalog } from "@a2ui/react";
import { registerShadcnCatalog } from "./components/a2ui/registerShadcnCatalog";
import "./index.css";
import App from "./App.tsx";

// Initialize @a2ui/react once at startup, then override with shadcn components
injectStyles();
initializeDefaultCatalog();
registerShadcnCatalog();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
