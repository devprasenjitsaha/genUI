import { memo } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent, ComponentNode } from "@a2ui/react";
import { Card, CardContent } from "@/components/ui/card";

export const A2UICard = memo(function A2UICard({ node, surfaceId }: A2UIComponentProps<Types.CardNode>) {
	useA2UIComponent(node, surfaceId);
	const props = node.properties;

	// Card can have either a single child or multiple children
	const rawChildren = props.children ?? (props.child ? [props.child] : []);
	const children = Array.isArray(rawChildren) ? rawChildren : [];

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	return (
		<div className="a2ui-card" style={hostStyle}>
			<Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<CardContent className="p-4 flex flex-col gap-3">
					{children.map((child, index) => {
						const childId = typeof child === "object" && child !== null && "id" in child ? (child as Types.AnyComponentNode).id : `child-${index}`;
						const childNode = typeof child === "object" && child !== null && "type" in child ? (child as Types.AnyComponentNode) : null;
						return <ComponentNode key={childId} node={childNode} surfaceId={surfaceId} />;
					})}
				</CardContent>
			</Card>
		</div>
	);
});

export default A2UICard;
