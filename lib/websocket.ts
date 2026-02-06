// WebSocket client for real-time order notifications (back-office)
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';

export class OrderWebSocket {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  connect(role: string = 'restaurant') {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected (back-office)');
      return;
    }

    try {
      const url = `${WS_URL}?role=${role}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('🔌 Back-office WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📩 Back-office WebSocket message:', data);

          const eventType = data.type;
          if (eventType && this.listeners.has(eventType)) {
            this.listeners.get(eventType)?.forEach((callback) => callback(data));
          }
        } catch (error) {
          console.error('Error parsing back-office WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('Back-office WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('🔌 Back-office WebSocket disconnected');
        this.ws = null;

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Back-office WS reconnecting... Attempt ${this.reconnectAttempts}`);
          setTimeout(() => this.connect(role), this.reconnectDelay);
        }
      };
    } catch (error) {
      console.error('Back-office WebSocket connection error:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  on(eventType: string, callback: (data: any) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)?.add(callback);

    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('Back-office WebSocket not connected');
    }
  }
}

export const orderWs = new OrderWebSocket();

