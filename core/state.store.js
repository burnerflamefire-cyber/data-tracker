import { eventBus } from "./event.bus.js";

/**
 * StateStore Engine
 * Holds state and manages mutations.
 */
class StateStore {
    constructor() {
        this.state = {
            currentMode: "PROJECT",    // Options: "PROJECT" | "PROGRAMME"
            activeModule: "overview",  // Navigation view within modules
            selectedProjectId: "PRJ-001", // Sample target project
            projects: {
                "PRJ-001": { id: "PRJ-001", name: "Cape Town Clinic Expansion", type: "Health Facility", sector: "Health" },
                "PRJ-002": { id: "PRJ-002", name: "Stellenbosch Road Upgrade", type: "Civil Infrastructure", sector: "Transport" }
            },
            records: [] // Active universal records synchronized from Firebase
        };
    }

    getState() {
        return this.state;
    }

    /**
     * Mutates state parameters safely and fires system-wide change signals
     */
    set(key, value) {
        this.state[key] = value;
        eventBus.emit("state:changed", this.state);
    }

    /**
     * Dedicated method to assign records array
     */
    setRecords(recordsArray) {
        this.state.records = recordsArray;
        eventBus.emit("state:recordsUpdated", this.state.records);
    }
}

export const store = new StateStore();
