import { ComponentRegistry } from "@a2ui/react";
import { A2UIText } from "./A2UIText";
import { A2UIButton } from "./A2UIButton";
import { A2UICard } from "./A2UICard";
import { A2UIRow } from "./A2UIRow";
import { A2UIColumn } from "./A2UIColumn";
import { A2UIList } from "./A2UIList";
import { A2UITextField } from "./A2UITextField";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = { component: any };

/**
 * Override the default A2UI component registry with shadcn-based implementations.
 * Call this after initializeDefaultCatalog() so these registrations take precedence.
 */
export function registerShadcnCatalog(): void {
  const registry = ComponentRegistry.getInstance();

  registry.register("Text", { component: A2UIText } as AnyComponent);
  registry.register("Button", { component: A2UIButton } as AnyComponent);
  registry.register("Card", { component: A2UICard } as AnyComponent);
  registry.register("Row", { component: A2UIRow } as AnyComponent);
  registry.register("Column", { component: A2UIColumn } as AnyComponent);
  registry.register("List", { component: A2UIList } as AnyComponent);
  registry.register("TextField", { component: A2UITextField } as AnyComponent);
}
