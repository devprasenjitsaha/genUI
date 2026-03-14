import { memo } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent, ComponentNode } from "@a2ui/react";
import { cn } from "@/lib/utils";

const alignmentClass: Record<string, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
};

export const A2UIList = memo(function A2UIList({ node, surfaceId }: A2UIComponentProps<Types.ListNode>) {
	useA2UIComponent(node, surfaceId);
	const props = node.properties;

	const direction = props.direction ?? "vertical";
	const alignment = props.alignment ?? "stretch";
	const children = Array.isArray(props.children) ? props.children : [];

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	const isHorizontal = direction === "horizontal";

	return (
		<div className="a2ui-list" style={hostStyle}>
			<div className={cn("flex gap-4", isHorizontal ? "flex-row flex-wrap overflow-x-auto" : "flex-col", alignmentClass[alignment] ?? "items-stretch")}>
				{children.map((child, index) => {
					const childId = typeof child === "object" && child !== null && "id" in child ? (child as Types.AnyComponentNode).id : `child-${index}`;
					const childNode = typeof child === "object" && child !== null && "type" in child ? (child as Types.AnyComponentNode) : null;
					return <ComponentNode key={childId} node={childNode} surfaceId={surfaceId} />;
				})}
			</div>
		</div>
	);
});

export default A2UIList;
