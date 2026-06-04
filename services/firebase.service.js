import { eventBus } from "../core/event.bus.js";
import { store } from "../core/state.store.js";

/**
 * Firebase Integration Service
 * Manages raw read/write synchronization targeting database endpoints.
 */
class FirebaseService {
    constructor() {
        this.dbRef = null;
    }

    init() {
        // Map database reference point to universal records node
        this.dbRef = window.db.ref("universal_records");
        this.listenToRecords();
    }

    /**
     * Opens live listener to stream real-time database modifications directly into State Store
     */
    listenToRecords() {
        this.dbRef.on("value", (snapshot) => {
            const data = snapshot.val();
            const recordsList = [];
            if (data) {
                Object.keys(data).forEach(key => {
                    recordsList.push({ dbKey: key, ...data[key] });
                });
            }
            store.setRecords(recordsList);
        }, (error) => {
            console.error("Firebase Sync Error: ", error);
        });
    }

    /**
     * Persists or overwrites a universal data record
     */
    async saveRecord(record) {
        try {
            if (record.dbKey) {
                const targetKey = record.dbKey;
                const cleanRecord = { ...record };
                delete cleanRecord.dbKey; // Strip temporal database pointer before transaction
                await this.dbRef.child(targetKey).set(cleanRecord);
            } else {
                await this.dbRef.push(record);
            }
            eventBus.emit("notification:success", "Database updated successfully.");
        } catch (error) {
            console.error("Save Operation Failure", error);
            eventBus.emit("notification:error", "Database write rejected.");
            throw error;
        }
    }
}

export const firebaseService = new FirebaseService();
