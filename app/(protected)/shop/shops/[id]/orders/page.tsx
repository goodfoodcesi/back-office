"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { orderApi } from "@/lib/order-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrderWebSocket } from "@/hooks/useOrderWebSocket";

const STATUS_COLORS = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    prepared: "bg-green-500",
    picked_up: "bg-purple-500",
    delivered: "bg-gray-500",
    cancelled: "bg-red-500",
};

const STATUS_LABELS = {
    pending: "En attente",
    confirmed: "Confirmée",
    prepared: "Prête",
    picked_up: "En livraison",
    delivered: "Livrée",
    cancelled: "Annulée",
};

export default function OrdersPage() {
    const params = useParams();
    const shopId = params.id as string;
    const [loading, setLoading] = useState(true);

    // WebSocket hook for real-time updates
    const { orders: wsOrders, connected, setOrders } = useOrderWebSocket(shopId);

    useEffect(() => {
        if (shopId) {
            loadOrders();
        }
    }, [shopId]);

    const loadOrders = async () => {
        try {
            const data = await orderApi.getRestaurantOrders(shopId);
            setOrders(data);
        } catch (error) {
            console.error("Error loading orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await orderApi.updateOrderStatus(orderId, newStatus);
            await loadOrders(); // Refresh (will also update via WebSocket)
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading) {
        return <div className="p-8">Chargement...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Commandes</h1>
                <div className="flex items-center gap-2">
                    {connected ? (
                        <Badge className="bg-green-500">🟢 Temps réel actif</Badge>
                    ) : (
                        <Badge className="bg-gray-500">⚫ Déconnecté</Badge>
                    )}
                </div>
            </div>

            <div className="grid gap-4">
                {wsOrders.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                Aucune commande
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    wsOrders.map((order) => (
                        <Card key={order._id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Commande #{order._id.slice(-6)}
                                    </CardTitle>
                                    <Badge className={STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]}>
                                        {STATUS_LABELS[order.status as keyof typeof STATUS_LABELS]}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium">Articles:</p>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                            {order.items.map((item: any, idx: number) => (
                                                <li key={idx}>{item.name || `Article ${idx + 1}`}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-2">
                                        {order.status === "pending" && (
                                            <Button
                                                onClick={() => handleStatusUpdate(order._id, "confirmed")}
                                                className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                                            >
                                                Accepter
                                            </Button>
                                        )}
                                        {order.status === "confirmed" && (
                                            <Button
                                                onClick={() => handleStatusUpdate(order._id, "prepared")}
                                                className="cursor-pointer bg-green-600 hover:bg-green-700"
                                            >
                                                Marquer comme prête
                                            </Button>
                                        )}
                                        {["pending", "confirmed"].includes(order.status) && (
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleStatusUpdate(order._id, "cancelled")}
                                                className="cursor-pointer"
                                            >
                                                Annuler
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
