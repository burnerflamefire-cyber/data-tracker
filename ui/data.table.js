import { store } from "../core/state.store.js";
import { firebaseService } from "../services/firebase.service.js";
import { auditService } from "../services/audit.service.js";

/**
 * Ledger Data Grid Engine Component Module
 * Generates interactive data tables with inline editing fields.
 */
export function mountLedgerTableGrid(targetParentContainerId) {
    const target = document.getElementById(targetParentContainerId);
    
    target.innerHTML = `
        <div class="bg-[#001a33] border border-[#002b54] rounded shadow-xl overflow-hidden flex flex-col flex-1">
            <div class="p-3 bg-[#002244] border-b border-[#002b54] flex justify-between items-center shrink-0">
                <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider"><i class="fa-solid fa-table mr-1 text-sky-400"></i> Universal Transaction Ledger Registry Matrix</span>
                <span class="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-400 font-mono">Double-Click Cells to Edit Inline</span>
            </div>
            <div class="flex-1 overflow-auto max-h-[450px]">
                <table class="w-full text-left text-xs font-mono border-collapse whitespace-nowrap">
                    <thead class="bg-[#001122] text-slate-400 sticky top-0 border-b border-[#002b54] z-10">
                        <tr>
                            <th class="p-2 border-r border-[#002b54]">Date</th>
                            <th class="p-2 border-r border-[#002b54]">Data Category</th>
                            <th class="p-2 border-r border-[#002b54]">Free Text Definition Notes</th>
                            <th class="p-2 border-r border-[#002b54]">Unit</th>
                            <th class="p-2 border-r border-[#002b54]">Quantity</th>
                            <th class="p-2 border-r border-[#002b54]">Rate (ZAR)</th>
                            <th class="p-2 border-r border-[#002b54]">Amount (ZAR)</th>
                            <th class="p-2 text-center">Action History</th>
                        </tr>
                    </thead>
                    <tbody id="ledger-grid-rows" class="divide-y divide-[#00264d] text-slate-300">
                        </tbody>
                </table>
            </div>
        </div>
    `;

    renderLiveDatabaseRows();
}

function renderLiveDatabaseRows() {
    const body = document.getElementById("ledger-grid-rows");
    const currentProjectId = store.getState().selectedProjectId;
    const records = store.getState().records.filter(r => r.projectGUID === currentProjectId);

    if (records.length === 0) {
        body.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-500 italic">No transactional record objects discovered mapping within current infrastructure workspace boundaries.</td></tr>`;
        return;
    }

    body.innerHTML = "";
    records.forEach(row => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-[#002244]/40 transition-colors";
        tr.innerHTML = `
            <td class="p-2 border-r border-[#002b54] font-semibold" data-editable-field="date" data-db-key="${row.dbKey}">${row.date}</td>
            <td class="p-2 border-r border-[#002b54] text-sky-400 font-bold">${row.dataCategory}</td>
            <td class="p-2 border-r border-[#002b54] max-w-xs truncate" data-editable-field="freeText" data-db-key="${row.dbKey}">${row.freeText || ''}</td>
            <td class="p-2 border-r border-[#002b54] text-slate-400">${row.unit}</td>
            <td class="p-2 border-r border-[#002b54] text-right" data-editable-field="quantity" data-db-key="${row.dbKey}">${row.quantity}</td>
            <td class="p-2 border-r border-[#002b54] text-right" data-editable-field="rate" data-db-key="${row.dbKey}">${row.rate}</td>
            <td class="p-2 border-r border-[#002b54] text-right text-amber-400 font-bold">${row.amount.toFixed(2)}</td>
            <td class="p-1 text-center">
                <button class="btn-audit-view bg-[#002244] border border-[#004488] hover:bg-[#003366] text-slate-300 text-[10px] px-1.5 py-0.5 rounded transition-all" data-audit-trail="${encodeURIComponent(row.auditLog)}">
                    <i class="fa-solid fa-timeline mr-0.5 text-sky-400"></i> Audit
                </button>
            </td>
        `;
        body.appendChild(tr);
    });

    bindInlineEditingActionTriggers(records);
    bindAuditLogInspectionModals();
}

function bindInlineEditingActionTriggers(originalRecordsSource) {
    const editableCells = document.querySelectorAll("[data-editable-field]");
    
    editableCells.forEach(cell => {
        cell.title = "Double-click element to engage modifications tracking flow mode overrides...";
        cell.ondblclick = () => {
            if (cell.querySelector("input")) return; // Inline text input editor block protection barrier logic line pass
            
            const databaseKeyTarget = cell.getAttribute("data-db-key");
            const structuralFieldKey = cell.getAttribute("data-editable-field");
            const evaluationRecordObj = originalRecordsSource.find(r => r.dbKey === databaseKeyTarget);
            const ongoingSnapshotVal = cell.innerText;
            
            cell.className = "p-1 border-r border-[#002b54] bg-[#001122]";
            const input = document.createElement("input");
            input.type = (structuralFieldKey === "quantity" || structuralFieldKey === "rate") ? "number" : (structuralFieldKey === "date" ? "date" : "text");
            input.value = ongoingSnapshotVal;
            input.className = "w-full bg-[#002244] text-white border border-sky-500 rounded px-1 py-0.5 text-xs font-mono outline-none";
            
            cell.innerHTML = "";
            cell.appendChild(input);
            input.focus();

            const executeCommitmentWorkflow = async () => {
                const terminalInputValue = input.value;
                if (terminalInputValue === ongoingSnapshotVal) {
                    cell.innerText = ongoingSnapshotVal; // Revert visually with no data mutations incurred
                    return;
                }

                // Compile mutation objects array mapping metrics elements parameters
                const historyAppendageBlock = auditService.stampChange(evaluationRecordObj, structuralFieldKey, terminalInputValue);
                
                const modernizedRecordBlueprint = {
                    ...evaluationRecordObj,
                    [structuralFieldKey]: (structuralFieldKey === "quantity" || structuralFieldKey === "rate") ? parseFloat(terminalInputValue) || 0 : terminalInputValue,
                    auditLog: evaluationRecordObj.auditLog + historyAppendageBlock,
                    lastUpdated: new Date().toISOString()
                };

                // Compute derivative aggregate values dynamically
                modernizedRecordBlueprint.amount = modernizedRecordBlueprint.quantity * modernizedRecordBlueprint.rate;

                try {
                    await firebaseService.saveRecord(modernizedRecordBlueprint);
                } catch (err) {
                    cell.innerText = ongoingSnapshotVal;
                }
            };

            input.onblur = executeCommitmentWorkflow;
            input.onkeydown = (event) => {
                if (event.key === "Enter") input.blur();
                if (event.key === "Escape") { input.value = ongoingSnapshotVal; input.blur(); }
            };
        };
    });
}

function bindAuditLogInspectionModals() {
    document.querySelectorAll("[data-audit-trail]").forEach(button => {
        button.onclick = () => {
            const decodedLogStr = decodeURIComponent(button.getAttribute("data-audit-trail"));
            alert(`--- IMMUTABLE HISTORICAL LEDGER TRACKING RECORDS ---\n\n${decodedLogStr}`);
        };
    });
}

// Keep live visualization data tracking loops matching incoming external changes
store.setRecords = ((originalSetter) => {
    return function(recordsArray) {
        originalSetter.call(store, recordsArray);
        const viewGridContainerNode = document.getElementById("ledger-grid-rows");
        if (viewGridContainerNode) renderLiveDatabaseRows();
    };
})(store.setRecords);
