import { eventBus } from "../core/event.bus.js";
import { store } from "../core/state.store.js";

/**
 * Top-Level Shell Frame Blueprint
 * Implements rigid tripartite workspace navigation divisions.
 */
export function initLayoutShell() {
    const root = document.getElementById("app-root");
    
    root.innerHTML = `
        <header class="h-12 bg-[#00152b] border-b border-[#002d5c] flex items-center justify-between px-4 z-10 shrink-0">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-chart-network text-sky-400 text-lg"></i>
                <h1 class="font-semibold tracking-wide text-sm text-slate-200 uppercase font-mono">Infrastructure Data Tracker</h1>
            </div>
            
            <div id="toast-container" class="fixed top-2 right-4 flex flex-col gap-1 z-50"></div>

            <div class="flex items-center gap-3">
                <div id="authStatusPanel" class="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                    <span id="authStatusText">Connecting...</span>
                </div>
                <div id="authUidDisplay" class="hidden text-slate-400 text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded"></div>
                <div id="userBadge" class="text-xs text-slate-300 border-l border-[#002d5c] pl-3"></div>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">
            <nav id="nav-primary" class="w-16 bg-[#002244] border-r border-[#003366] flex flex-col items-center py-4 gap-6 shrink-0 transition-all duration-200"></nav>
            
            <nav id="nav-secondary" class="w-48 bg-[#001a33] border-r border-[#002b54] flex flex-col p-3 gap-1 shrink-0 transition-all duration-200"></nav>
            
            <main id="main-workspace" class="flex-1 bg-[#001122] flex flex-col overflow-y-auto p-6"></main>
        </div>
    `;

    renderPrimaryNavigationLinks();
    listenToStateModifications();
}

function renderPrimaryNavigationLinks() {
    const primaryNavContainer = document.getElementById("nav-primary");
    const activeMode = store.getState().currentMode;

    primaryNavContainer.innerHTML = `
        <button id="btn-mode-project" class="group flex flex-col items-center justify-center p-2 rounded transition-all w-12 h-12 ${activeMode === 'PROJECT' ? 'bg-[#003366] text-white shadow-inner border-l-4 border-sky-400' : 'text-slate-400 hover:bg-[#002d5c] hover:text-white'}">
            <i class="fa-solid fa-building-columns text-base"></i>
            <span class="text-[8px] tracking-tight mt-1 uppercase font-semibold">Project</span>
        </button>
        <button id="btn-mode-programme" class="group flex flex-col items-center justify-center p-2 rounded transition-all w-12 h-12 ${activeMode === 'PROGRAMME' ? 'bg-[#003366] text-white shadow-inner border-l-4 border-sky-400' : 'text-slate-400 hover:bg-[#002d5c] hover:text-white'}">
            <i class="fa-solid fa-folder-tree text-base"></i>
            <span class="text-[8px] tracking-tight mt-1 uppercase font-semibold">Prog</span>
        </button>
    `;

    document.getElementById("btn-mode-project").onclick = () => eventBus.emit("nav:modeChanged", "PROJECT");
    document.getElementById("btn-mode-programme").onclick = () => eventBus.emit("nav:modeChanged", "PROGRAMME");
}

function listenToStateModifications() {
    eventBus.on("state:changed", (state) => {
        renderPrimaryNavigationLinks();
        renderSecondaryNavigationLinks(state);
    });
    // Prime setup execution cycle pass manually once initialized
    renderSecondaryNavigationLinks(store.getState());
}

function renderSecondaryNavigationLinks(state) {
    const secNavContainer = document.getElementById("nav-secondary");
    const mode = state.currentMode;
    const currentView = state.activeModule;

    let itemsHtml = "";
    if (mode === "PROJECT") {
        itemsHtml = `
            <div class="text-[9px] text-sky-400 tracking-wider font-bold uppercase mb-2 px-2 font-mono">Project Navigation</div>
            ${createSecondaryNavBtn("overview", "fa-circle-info", "Project Overview", currentView)}
            ${createSecondaryNavBtn("capture", "fa-pen-to-square", "Data Capture Engine", currentView)}
            ${createSecondaryNavBtn("tables", "fa-table-cells", "Data Ledger Grid", currentView)}
        `;
    } else {
        itemsHtml = `
            <div class="text-[9px] text-purple-400 tracking-wider font-bold uppercase mb-2 px-2 font-mono">Programme Core</div>
            ${createSecondaryNavBtn("overview", "fa-chart-pie", "Portfolio Summary", currentView)}
            ${createSecondaryNavBtn("aggregation", "fa-layer-group", "Rollup Matrices", currentView)}
        `;
    }

    secNavContainer.innerHTML = itemsHtml;

    // Attach click events to nav options dynamically
    secNavContainer.querySelectorAll("[data-target-view]").forEach(button => {
        button.onclick = () => {
            eventBus.emit("nav:viewChanged", button.getAttribute("data-target-view"));
        };
    });
}

function createSecondaryNavBtn(targetId, iconClass, labelText, currentActiveView) {
    const isActive = targetId === currentActiveView;
    return `
        <button data-target-view="${targetId}" class="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-all text-left font-mono ${isActive ? 'bg-[#002b54] text-white border-r-2 border-sky-400 font-semibold shadow-sm' : 'text-slate-400 hover:bg-[#002244] hover:text-slate-200'}">
            <i class="fa-solid ${iconClass} w-4 text-center text-[11px] ${isActive ? 'text-sky-400' : 'text-slate-500'}"></i>
            <span>${labelText}</span>
        </button>
    `;
}
