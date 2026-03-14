import { memo, useCallback } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent, ComponentNode } from "@a2ui/react";
import { Button } from "@/components/ui/button";

export const A2UIButton = memo(function A2UIButton({ node, surfaceId }: A2UIComponentProps<Types.ButtonNode>) {
	const { sendAction } = useA2UIComponent(node, surfaceId);
	const props = node.properties;

	const handleClick = useCallback(() => {
		if (props.action) {
			sendAction(props.action);
		}
	}, [props.action, sendAction]);

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	return (
		<div className="a2ui-button" style={hostStyle}>
			<Button onClick={handleClick} variant="default" className="w-full">
				<ComponentNode node={props.child} surfaceId={surfaceId} />
			</Button>
		</div>
	);
});

export default A2UIButton;
