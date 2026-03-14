import { useRef, useState } from "react";
import type { ChatMessage } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

interface Props {
	messages: ChatMessage[];
	onSend: (text: string) => void;
	isLoading: boolean;
}

export default function Chat({ messages, onSend, isLoading }: Props) {
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const text = input.trim();
		if (!text || isLoading) return;
		setInput("");
		onSend(text);
		setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
	};

	return (
		<div className="chat-panel">
			<div className="chat-history">
				{messages.length === 0 && <p className="text-sm text-muted-foreground text-center mt-10">Ask me to find restaurants!</p>}
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={cn(
							"max-w-[88%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap",
							msg.role === "user"
								? "self-end bg-primary text-primary-foreground rounded-br-sm ml-auto"
								: "self-start bg-muted text-foreground border border-border rounded-bl-sm",
						)}
					>
						{msg.text || (msg.isStreaming ? "…" : "")}
					</div>
				))}
				<div ref={bottomRef} />
			</div>

			<form className="flex gap-2 p-3 border-t border-border shrink-0" onSubmit={handleSubmit}>
				<Input placeholder="e.g. Show me top 3 Chinese restaurants" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} />
				<Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
					<SendHorizonal className="h-4 w-4" />
				</Button>
			</form>
		</div>
	);
}
