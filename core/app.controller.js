import { initializeAuthentication } from "../auth/auth.firebase.js";
import { firebaseService } from "../services/firebase.service.js";
import { initLayoutShell } from "../ui/layout.shell.js";
import { eventBus } from "./event.bus.js";
import { store } from "./state.store.js";

/**
 * Master Application Controller
 * Orchestrates cross-functional lifecycle dependencies.
 */
export class AppController {
    constructor() {
        this.modules = {};
    }

    async init() {
        console.log("Booting Framework Systems...");
        
        // 1. Initialise baseline global visual UI layers
        initLayoutShell();

        // 2. Wire communication routing links
        this.bindSystemEvents();

        // 3. Authenticate with the data infrastructure layers
        initializeAuthentication((user) => {
            console.log("Access Granted. Establishing Database Connections...");
            firebaseService.init();
            this.loadActiveContextModule();
        });
    }

    bindSystemEvents() {
        // Monitor mutations across system contexts
        eventBus.on("nav:modeChanged", (newMode) => {
            store.set("currentMode", newMode);
            store.set("activeModule", "overview"); // Reset workspace view defaults
            this.loadActiveContextModule();
        });

        eventBus.on("nav:viewChanged", (viewTarget) => {
            store.set("activeModule", viewTarget);
            this.loadActiveContextModule();
        });
        
        eventBus.on("notification:success", (msg) => this.showToast(msg, "bg-emerald-600"));
        eventBus.on("notification:error", (msg) => this.showToast(msg, "bg-rose-600"));
    }

    /**
     * Resolves and mounts dynamic modules into the view container layout frame based on state
     */
    async loadActiveContextModule() {
        const state = store.getState();
        let targetModulePath = "";

        if (state.currentMode === "PROJECT") {
            targetModulePath = "../modules/project/project.module.js";
        } else {
            targetModulePath = "../modules/programme/programme.module.js";
        }

        try {
            const moduleInstance = await import(targetModulePath);
            moduleInstance.renderWorkspaceContent(state.activeModule);
        } catch (error) {
            console.error(`Failed to load target module path context: ${targetModulePath}`, error);
        }
    }

    showToast(message, colorClass) {
        const container = document.getElementById("toast-container");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `${colorClass} text-white px-3 py-1.5 rounded text-xs shadow-lg font-mono transition-opacity duration-300`;
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => { toast.classList.add("opacity-0"); setTimeout(() => toast.remove(), 300); }, 3000);
    }
}
