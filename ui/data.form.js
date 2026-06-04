import { createUniversalRecord } from "../core/data.model.js";
import { categoryService } from "../services/category.service.js";
import { firebaseService } from "../services/firebase.service.js";
import { store } from "../core/state.store.js";

/**
 * Data Capture Engine User Interface Module
 * Renders data validation forms mapping input choices to system paths.
 */
export function mountDataCaptureForm(targetParentContainerId) {
    const target = document.getElementById(targetParentContainerId);
    
    target.innerHTML = `
        <div class="bg-[#001a33] border border-[#002b54] rounded p-5 max-w-2xl shadow-xl">
            <h3 class="text-sm font-mono font-bold uppercase tracking-wider text-sky-400 mb-4 border-b border-[#002b54] pb-2">
                <i class="fa-solid fa-square-plus mr-1"></i> Data Log Transaction Form
            </h3>
            
            <form id="universal-capture-form" class="space-y-4 text-xs font-mono">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Main Classification Category</label>
                        <select id="form-main-cat" class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors" required>
                            <option value="">-- Choose Category --</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Sub Classification Mapping</label>
                        <select id="form-sub-cat" class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors" disabled required>
                            <option value="">-- Awaiting Selection --</option>
                        </select>
                    </div>
                </div>

                <div class="bg-[#001122] border border-[#002244] p-2 rounded flex items-center justify-between">
                    <span class="text-slate-400 text-[10px]">Resolved Data Schema Pointer:</span>
                    <span id="form-resolved-badge" class="bg-[#002b54] text-sky-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono border border-[#004488]">SYS-AWAITING-INPUT</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Quantity Metric</label>
                        <input type="number" id="form-qty" step="any" value="0" class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors" required />
                    </div>
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Rate Factor Matrix (ZAR)</label>
                        <input type="number" id="form-rate" step="any" value="0" class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors" required />
                    </div>
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Calculated Extended Amount</label>
                        <input type="text" id="form-amount" value="0.00" class="w-full bg-[#000d1a] border border-[#002244] rounded p-2 text-amber-400 font-bold outline-none" readonly />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Log Action Operational Date</label>
                        <input type="date" id="form-date" class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors" required />
                    </div>
                    <div>
                        <label class="block text-slate-400 font-semibold mb-1">Standard Measurement Unit</label>
                        <input type="text" id="form-unit" class="w-full bg-[#000d1a] border border-[#002244] rounded p-2 text-slate-400 outline-none" readonly />
                    </div>
                </div>

                <div>
                    <label class="block text-slate-400 font-semibold mb-1">FreeText Documentation Notes Narrative</label>
                    <textarea id="form-text" rows="2" placeholder="Provide annotations or references explaining transaction variances..." class="w-full bg-[#001122] border border-[#003366] rounded p-2 text-slate-200 outline-none focus:border-sky-500 transition-colors"></textarea>
                </div>

                <button type="submit" class="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded transition-colors uppercase tracking-wider text-xs shadow-md">
                    <i class="fa-solid fa-cloud-arrow-up mr-1"></i> File Document Stream to Ledger
                </button>
            </form>
        </div>
    `;

    bindFormEngineLogicFlows();
}

function bindFormEngineLogicFlows() {
    const mainSelect = document.getElementById("form-main-cat");
    const subSelect = document.getElementById("form-sub-cat");
    const badge = document.getElementById("form-resolved-badge");
    const qtyInput = document.getElementById("form-qty");
    const rateInput = document.getElementById("form-rate");
    const amtInput = document.getElementById("form-amount");
    const unitInput = document.getElementById("form-unit");
    const dateInput = document.getElementById("form-date");
    const formElement = document.getElementById("universal-capture-form");

    // Default current operational standard date value element parameters
    dateInput.value = new Date().toISOString().split('T')[0];

    // Populate the dropdown choices
    categoryService.getMainCategories().forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.innerText = cat;
        mainSelect.appendChild(opt);
    });

    // Primary filter monitoring cascade sequence
    mainSelect.onchange = () => {
        const selectedMain = mainSelect.value;
        subSelect.innerHTML = '<option value="">-- Choose SubCategory --</option>';
        
        if (!selectedMain) {
            subSelect.disabled = true;
            badge.innerText = "SYS-AWAITING-INPUT";
            return;
        }

        categoryService.getSubCategories(selectedMain).forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub;
            opt.innerText = sub;
            subSelect.appendChild(opt);
        });
        subSelect.disabled = false;
    };

    // Sub-select change engine handler logic connection string
    subSelect.onchange = () => {
        const mainVal = mainSelect.value;
        const subVal = subSelect.value;
        if (!mainVal || !subVal) return;

        const dynamicResolutionObj = categoryService.resolveMapping(mainVal, subVal);
        badge.innerText = dynamicResolutionObj.category;
        unitInput.value = dynamicResolutionObj.unit;
        rateInput.value = dynamicResolutionObj.rate;
        calculateExtendedValues();
    };

    // Calculate sums dynamically based on keyboard event inputs
    const calculateExtendedValues = () => {
        const qty = parseFloat(qtyInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        amtInput.value = (qty * rate).toFixed(2);
    };

    qtyInput.oninput = calculateExtendedValues;
    rateInput.oninput = calculateExtendedValues;

    // Intercept form submission and redirect to data pipelines
    formElement.onsubmit = async (e) => {
        e.preventDefault();
        const activeProject = store.getState().projects[store.getState().selectedProjectId];

        const payloadStructure = createUniversalRecord({
            projectName: activeProject.name,
            projectGUID: activeProject.id,
            mainCategory: mainSelect.value,
            subCategory: subSelect.value,
            dataCategory: badge.innerText,
            quantity: parseFloat(qtyInput.value),
            rate: parseFloat(rateInput.value),
            amount: parseFloat(amtInput.value),
            date: dateInput.value,
            unit: unitInput.value,
            freeText: document.getElementById("form-text").value
        });

        try {
            await firebaseService.saveRecord(payloadStructure);
            formElement.reset();
            dateInput.value = new Date().toISOString().split('T')[0];
            badge.innerText = "SYS-AWAITING-INPUT";
            subSelect.disabled = true;
        } catch (err) {
            console.error("Form transmission fault block intercept handled.", err);
        }
    };
}
