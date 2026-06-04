/**
 * Category Engine Service
 * Resolves [Main Category + Sub Category] pairings into a system-validated dynamic DataCategory tag.
 * Replaces hardcoded values with configuration lookup rules.
 */
class CategoryService {
    constructor() {
        // Implements a JSON structure modeling configuration layouts
        this.matrix = {
            "Financials": {
                "Capital Expenditure": { category: "FIN-CAPEX", unit: "ZAR", rate: 1 },
                "Operational Maintenance": { category: "FIN-OPEX", unit: "ZAR", rate: 1 },
                "Professional Fees": { category: "FIN-PROF", unit: "Hours", rate: 850 }
            },
            "Milestones": {
                "Site Handover": { category: "MILE-START", unit: "Days", rate: 0 },
                "Practical Completion": { category: "MILE-PRACT", unit: "Days", rate: 0 },
                "Final Handover": { category: "MILE-FINAL", unit: "Days", rate: 0 }
            },
            "Resources": {
                "Local Labor Force": { category: "RES-LABOR", unit: "People", rate: 220 },
                "Structural Steel": { category: "RES-STEEL", unit: "Tons", rate: 18500 },
                "Portland Cement": { category: "RES-CEMENT", unit: "Bags", rate: 95 }
            }
        };
    }

    getMainCategories() {
        return Object.keys(this.matrix);
    }

    getSubCategories(mainCat) {
        if (!mainCat || !this.matrix[mainCat]) return [];
        return Object.keys(this.matrix[mainCat]);
    }

    /**
     * Core resolution mapping logic rule engine
     */
    resolveMapping(mainCat, subCat) {
        if (this.matrix[mainCat] && this.matrix[mainCat][subCat]) {
            return this.matrix[mainCat][subCat];
        }
        return { category: "SYS-UNRESOLVED", unit: "Generic Units", rate: 0 };
    }

    /**
     * Ingestion rule matching configuration metrics required for specific target project models
     */
    getRequiredCategoriesForProject(projectId) {
        // Enforces expected schema parameters per configuration blueprint mapping
        return ["FIN-CAPEX", "FIN-OPEX", "MILE-START", "MILE-PRACT", "RES-LABOR"];
    }
}

export const categoryService = new CategoryService();
