/**
 * Universal Data Record Blueprint
 * Transforms raw user inputs into the minimal universal row model.
 */
export function createUniversalRecord(data = {}) {
    return {
        // Core Context Metadata
        uid: data.uid || crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
        timestamp: data.timestamp || new Date().toISOString(),
        facilityName: data.facilityName || "Unassigned Facility",
        facilityGUID: data.facilityGUID || "FAC-GENERIC",
        projectName: data.projectName || "General Portfolio Target",
        projectGUID: data.projectGUID || "PRJ-GENERIC",
        programme: data.programme || "Infrastructure Delivery",
        subProgramme: data.subProgramme || "Capital Works",
        rolloutFY: data.rolloutFY || "2026/2027",
        projectPhase: data.projectPhase || "Execution",

        // Universal Shared Values
        date: data.date || new Date().toISOString().split('T')[0],
        mainCategory: data.mainCategory || "",
        subCategory: data.subCategory || "",
        dataCategory: data.dataCategory || "Unresolved Category", // Resolved via Service Layer
        freeText: data.freeText || "",
        unit: data.unit || "Units",
        quantity: parseFloat(data.quantity) || 0,
        rate: parseFloat(data.rate) || 0,
        amount: parseFloat(data.amount) || (parseFloat(data.quantity) * parseFloat(data.rate)) || 0,

        // Operational System Management Flags
        auditLog: data.auditLog || `${window.globalUserUid || 'System'} | ${new Date().toISOString()} | Record Provisioned → Created\n`,
        completenessStatus: data.completenessStatus || "Pending Evaluation",
        lastUpdated: data.lastUpdated || new Date().toISOString()
    };
}
