import { store } from "../core/state.store.js";
import { categoryService } from "../services/category.service.js";

/**
 * Completeness Engine Metric Calculation Widget Component Module
 * Computes completeness scores based on configuration lookup rules.
 */
export function mountCompletenessEngineWidget(targetParentContainerId) {
    const target = document.getElementById(targetParentContainerId);
    const activeStateSnapshot = store.getState();
    const activeProjectId = activeStateSnapshot.selectedProjectId;
    const targetProjectData = activeStateSnapshot.projects[activeProjectId];

    // Compute metrics
    const expectedCategoriesList = categoryService.getRequiredCategoriesForProject(activeProjectId);
    const activeCapturedRecords = activeStateSnapshot.records.filter(r => r.projectGUID === activeProjectId);
    const nonDuplicatedCapturedCodesSet = new Set(activeCapturedRecords.map(record => record.dataCategory));
    
    let completeQuantityCounter = 0;
    const diagnosticsBreakdownListingArray = expectedCategoriesList.map(expectedCategoryCode => {
        const isSatisfied = nonDuplicatedCapturedCodesSet.has(expectedCategoryCode);
        if (isSatisfied) completeQuantityCounter++;
        return {
            code: expectedCategoryCode,
            status: isSatisfied ? 'Satisfied' : 'Deficient'
        };
    });

    const terminalCompletionPercentageRatio = expectedCategoriesList.length > 0 
        ? Math.round((completeQuantityCounter / expectedCategoriesList.length) * 100) 
        : 100;

    target.innerHTML = `
        <div class="bg-[#001a33] border border-[#002b54] rounded p-4 shadow-xl font-mono text-xs max-w-sm">
            <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 border-b border-[#002b54] pb-1.5 flex items-center justify-between">
                <span><i class="fa-solid fa-gauge-high mr-1 text-sky-400"></i> Completeness Metric Engine</span>
                <span class="text-amber-400">${terminalCompletionPercentageRatio}%</span>
            </h4>
            
            <p class="text-[11px] text-slate-400 mb-2 font-sans">Evaluating records metrics configuration for: <strong>${targetProjectData.name}</strong></p>

            <div class="w-full bg-slate-900 rounded-full h-2 mb-4 overflow-hidden border border-slate-800">
                <div class="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500" style="width: ${terminalCompletionPercentageRatio}%"></div>
            </div>

            <div class="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                ${diagnosticsBreakdownListingArray.map(item => `
                    <div class="flex items-center justify-between bg-[#001122] px-2 py-1 rounded text-[11px] border border-[#002244]">
                        <span class="text-slate-300 font-bold">${item.code}</span>
                        <span class="flex items-center gap-1 ${item.status === 'Satisfied' ? 'text-emerald-400' : 'text-rose-400'} font-semibold text-[10px]">
                            <i class="fa-solid ${item.status === 'Satisfied' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                            ${item.status}
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Automatically re-evaluate indices when backing store signals updates occur
eventBus.on("state:recordsUpdated", () => {
    const container = document.getElementById("completeness-widget-placement-target");
    if (container) mountCompletenessEngineWidget("completeness-widget-placement-target");
});
