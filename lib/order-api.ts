// API client for back-office
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:3004';

export const orderApi = {
    async getRestaurantOrders(shopId: string) {
        // En préprod/dev avec certificats auto-signés, on doit ignorer l'erreur SSL côté serveur Node
        const isServer = typeof window === 'undefined';
        let agent;

        if (isServer) {
            const { Agent } = await import('https');
            agent = new Agent({ rejectUnauthorized: false });
        }

        const response = await fetch(`${ORDER_API_URL}/orders/restaurant/${shopId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            ...(isServer && { agent } as any),
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async updateOrderStatus(orderId: string, status: string) {
        const isServer = typeof window === 'undefined';
        let agent;

        if (isServer) {
            const { Agent } = await import('https');
            agent = new Agent({ rejectUnauthorized: false });
        }

        const response = await fetch(`${ORDER_API_URL}/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            ...(isServer && { agent } as any),
        });
        if (!response.ok) throw new Error('Failed to update order');
        return response.json();
    },
};
