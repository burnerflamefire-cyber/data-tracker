import { store } from "../../core/state.store.js";
import { mountDataCaptureForm } from "../../ui/data.form.js";
import { mountLedgerTableGrid } from "../../ui/data.table.js";
import { mountCompletenessEngineWidget } from "../../ui/completeness.widget.js";

/**
 * Facility-Specific Asset Context Management Module
 */
export function renderWorkspaceContent(viewIdentifierMode) {
    const workspace = document.getElementById("main-workspace");
    const activeProject = store.getState().projects[store.getState().selectedProjectId];

    // Build the structural shell header canvas area frames layout pattern wrapper
    workspace.innerHTML = `
        <div class="mb-6 shrink-0">
            <div class="text-[10px] uppercase font-bold tracking-widest text-sky-400 font-mono mb-1">Active Project Focus Workspace</div>
            <h2 class="text-xl font-bold font-sans text-white tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-map-location-dot text-slate-400"></i> ${activeProject.name} 
                <span class="text-xs bg-[#002244] border border-[#004488] px-2 py-0.5 rounded text-slate-300 font-mono ml-2 font-normal">${activeProject.id}</span>
            </h2>
        </div>
        
        <div id="project-module-workspace-canvas" class="flex-1 flex flex-col gap-6"></div>
    `;

    const canvas = document.getElementById("project-module-workspace-canvas");

    switch (viewIdentifierMode) {
        case "overview":
            canvas.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 bg-[#001a33] border border-[#002b54] rounded p-4 font-mono text-xs space-y-2">
                        <h4 class="text-sm font-bold text-sky-400 uppercase tracking-wider border-b border-[#002b54] pb-1">Asset Operational Inventory Identity Metrics</h4>
                        <p><span class="text-slate-400 inline-block w-32">Facility Type:</span> <span class="text-slate-200">${activeProject.type}</span></p>
                        <p><span class="text-slate-400 inline-block w-32">Sector Mapping:</span> <span class="text-slate-200">${activeProject.sector}</span></p>
                        <p><span class="text-slate-400 inline-block w-32">Funding Matrix:</span> <span class="text-slate-200">WCG Capital Apportionment Framework</span></p>
                    </div>
                    <div id="completeness-widget-placement-target"></div>
                </div>
            `;
            mountCompletenessEngineWidget("completeness-widget-placement-target");
            break;

        case "capture":
            canvas.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div id="form-insertion-placement-target" class="lg:col-span-2"></div>
                    <div id="completeness-widget-placement-target"></div>
                </div>
            `;
            mountDataCaptureForm("form-insertion-placement-target");
            mountCompletenessEngineWidget("completeness-widget-placement-target");
            break;

        case "tables":
            canvas.innerHTML = `<div id="table-grid-insertion-placement-target" class="flex flex-col flex-1"></div>`;
            mountLedgerTableGrid("table-grid-insertion-placement-target");
            break;

        default:
            canvas.innerHTML = `<p class="text-xs font-mono text-rose-400">Encountered an unrecognized inner execution view configuration context pointer target boundary.</p>`;
    }
}
