import { memo } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent } from "@a2ui/react";
import { cn } from "@/lib/utils";

const usageHintClasses: Record<string, string> = {
	h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
	h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
	h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
	h4: "scroll-m-20 text-xl font-semibold tracking-tight",
	h5: "scroll-m-20 text-lg font-medium tracking-tight",
	caption: "text-sm text-muted-foreground",
	body: "leading-7 text-foreground",
};

const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	caption: "p",
	body: "p",
};

export const A2UIText = memo(function A2UIText({ node, surfaceId }: A2UIComponentProps<Types.TextNode>) {
	const { resolveString } = useA2UIComponent(node, surfaceId);
	const props = node.properties;

	const textValue = resolveString(props.text);
	const usageHint = props.usageHint ?? "body";

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	if (!textValue) return null;

	const Tag = tagMap[usageHint] ?? "p";

	return (
		<div className="a2ui-text" style={hostStyle}>
			<Tag className={cn(usageHintClasses[usageHint] ?? usageHintClasses.body)}>{textValue}</Tag>
		</div>
	);
});

export default A2UIText;
