// API client for back-office
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:3004';

export const orderApi = {
    async getRestaurantOrders(shopId: string) {
        const response = await fetch(`${ORDER_API_URL}/orders/restaurant/${shopId}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async updateOrderStatus(orderId: string, status: string) {
        const response = await fetch(`${ORDER_API_URL}/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update order');
        return response.json();
    },
};
