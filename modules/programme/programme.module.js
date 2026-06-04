import { store } from "../../core/state.store.js";

/**
 * Portfolio Aggregate Management Level Core Context Module
 */
export function renderWorkspaceContent(viewIdentifierMode) {
    const workspace = document.getElementById("main-workspace");
    const records = store.getState().records;

    // Calculate aggregated capital value indicators
    const grossAggregateValueSum = records.reduce((runningSum, record) => runningSum + (parseFloat(record.amount) || 0), 0);
    const individualTransactionVolumeCounter = records.length;

    workspace.innerHTML = `
        <div class="mb-6 shrink-0">
            <div class="text-[10px] uppercase font-bold tracking-widest text-purple-400 font-mono mb-1">Macro Strategic Overview Management Panel</div>
            <h2 class="text-xl font-bold font-sans text-white tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-slate-400"></i> Combined Infrastructure Portfolio Matrix Ledger
            </h2>
        </div>

        <div id="programme-module-workspace-canvas" class="flex-1 flex flex-col gap-6"></div>
    `;

    const canvas = document.getElementById("programme-module-workspace-canvas");

    if (viewIdentifierMode === "overview") {
        canvas.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div class="bg-[#001a33] border border-[#002b54] p-4 rounded shadow-md">
                    <div class="text-slate-400 uppercase font-bold tracking-wider mb-1 text-[10px]">Aggregated Capital Committed Volume Value Index</div>
                    <div class="text-2xl font-bold text-emerald-400 font-sans">ZAR ${grossAggregateValueSum.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div class="bg-[#001a33] border border-[#002b54] p-4 rounded shadow-md">
                    <div class="text-slate-400 uppercase font-bold tracking-wider mb-1 text-[10px]">Active Tracked Registry Transactions Logs</div>
                    <div class="text-2xl font-bold text-sky-400 font-sans">${individualTransactionVolumeCounter} Units Recorded</div>
                </div>
            </div>
            
            <div class="bg-[#001a33] border border-[#002b54] p-4 rounded text-xs font-mono">
                <h4 class="text-purple-400 font-bold uppercase mb-2">Cross-Site Functional Infrastructure Operational Dispatches Node Points Map</h4>
                <p class="text-slate-400 font-sans text-[11px]">Aggregating transaction indicators in real time across active project nodes using unified multi-tenant schema rulesets.</p>
            </div>
        `;
    } else {
        canvas.innerHTML = `
            <div class="bg-[#001a33] border border-[#002b54] p-4 rounded text-xs font-mono text-slate-400 italic">
                <i class="fa-solid fa-sliders mr-1 text-purple-400"></i> Detailed programmatic matrix aggregation grids view layout options are currently awaiting data pipelines modeling passes.
            </div>
        `;
    }
}
