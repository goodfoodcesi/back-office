"use client";

import { useEffect, useRef, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws";

interface WebSocketMessage {
    type: string;
    order?: any;
    message?: string;
}

export function useOrderWebSocket(shopId: string) {
    const [orders, setOrders] = useState<any[]>([]);
    const [connected, setConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!shopId) return;

        // Connect to WebSocket with role=shop
        const ws = new WebSocket(`${WS_URL}?role=shop`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("✅ WebSocket connected");
            setConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data);
                console.log("📩 WebSocket message:", data);

                if (data.type === "order.created" && data.order) {
                    // Only add if it's for this shop
                    if (data.order.shopId === shopId) {
                        setOrders((prev) => [data.order, ...prev]);
                    }
                } else if (data.type === "order.updated" && data.order) {
                    // Update existing order
                    if (data.order.shopId === shopId) {
                        setOrders((prev) =>
                            prev.map((o) => (o._id === data.order._id ? data.order : o))
                        );
                    }
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnected(false);
        };

        ws.onclose = () => {
            console.log("🔌 WebSocket disconnected");
            setConnected(false);
        };

        return () => {
            ws.close();
        };
    }, [shopId]);

    return { orders, connected, setOrders };
}
