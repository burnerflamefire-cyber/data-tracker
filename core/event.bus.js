/**
 * EventBus Engine
 * Decouples system components via publish-subscribe pattern.
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }

    /**
     * Subscribe to a targeted event identifier string
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Publish payloads to all registered subscribers
     */
    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (err) {
                console.error(`Error executing listener for event: ${event}`, err);
            }
        });
    }
}

export const eventBus = new EventBus();
