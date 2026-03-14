import { memo, useState, useCallback, useEffect, useId } from "react";
import type { A2UIComponentProps, Types } from "@a2ui/react";
import { useA2UIComponent } from "@a2ui/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const A2UITextField = memo(function A2UITextField({ node, surfaceId }: A2UIComponentProps<Types.TextFieldNode>) {
	const { resolveString, setValue, getValue } = useA2UIComponent(node, surfaceId);
	const props = node.properties;
	const id = useId();

	const label = resolveString(props.label);
	const textPath = props.text?.path;
	const initialValue = resolveString(props.text) ?? "";
	const fieldType = props.type;

	const [value, setLocalValue] = useState(initialValue);

	// Sync with external data model changes
	useEffect(() => {
		if (textPath) {
			const externalValue = getValue(textPath);
			if (externalValue !== null && String(externalValue) !== value) {
				setLocalValue(String(externalValue));
			}
		}
	}, [textPath, getValue]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newValue = e.target.value;
			setLocalValue(newValue);
			if (textPath) {
				setValue(textPath, newValue);
			}
		},
		[textPath, setValue],
	);

	const inputType = fieldType === "number" ? "number" : fieldType === "date" ? "date" : "text";
	const isTextArea = fieldType === "longText";

	const hostStyle: React.CSSProperties = node.weight !== undefined ? ({ "--weight": node.weight } as React.CSSProperties) : {};

	return (
		<div className="a2ui-textfield" style={hostStyle}>
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{label}
					</label>
				)}
				{isTextArea ? (
					<textarea
						id={id}
						value={value}
						onChange={handleChange}
						placeholder="Enter a value…"
						className={cn(
							"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
							"placeholder:text-muted-foreground",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							"disabled:cursor-not-allowed disabled:opacity-50",
						)}
					/>
				) : (
					<Input type={inputType} id={id} value={value} onChange={handleChange} placeholder="Enter a value…" />
				)}
			</div>
		</div>
	);
});

export default A2UITextField;
