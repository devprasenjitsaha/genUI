import { memo } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent, ComponentNode } from "@a2ui/react";
import { cn } from "@/lib/utils";

const distributionClass: Record<string, string> = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	spaceBetween: "justify-between",
	spaceAround: "justify-around",
	spaceEvenly: "justify-evenly",
};

const alignmentClass: Record<string, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
};

export const A2UIRow = memo(function A2UIRow({ node, surfaceId }: A2UIComponentProps<Types.RowNode>) {
	useA2UIComponent(node, surfaceId);
	const props = node.properties;

	const distribution = props.distribution ?? "start";
	const alignment = props.alignment ?? "stretch";
	const children = Array.isArray(props.children) ? props.children : [];

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	return (
		<div className="a2ui-row" style={hostStyle}>
			<div className={cn("flex flex-row gap-3 flex-wrap", distributionClass[distribution] ?? "justify-start", alignmentClass[alignment] ?? "items-stretch")}>
				{children.map((child, index) => {
					const childId = typeof child === "object" && child !== null && "id" in child ? (child as Types.AnyComponentNode).id : `child-${index}`;
					const childNode = typeof child === "object" && child !== null && "type" in child ? (child as Types.AnyComponentNode) : null;
					return <ComponentNode key={childId} node={childNode} surfaceId={surfaceId} />;
				})}
			</div>
		</div>
	);
});

export default A2UIRow;
