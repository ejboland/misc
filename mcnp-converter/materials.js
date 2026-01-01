/**
 * PNNL-15870 Rev.2 Material Compendium Database
 * Data from: Pacific Northwest National Laboratory (PNNL) via PyNE
 * Source: https://github.com/pyne/materials-compendium
 * 
 * This module processes the embedded MaterialsCompendiumData.js
 * and provides helper functions for accessing material data.
 */

// Global materials data
let PNNL_MATERIALS = {};
let MATERIALS_LOADED = false;

/**
 * Process embedded materials compendium data
 * Called after MaterialsCompendiumData.js is loaded
 */
function processMaterialsCompendium() {
    if (typeof MATERIALS_COMPENDIUM_DATA === 'undefined') {
        console.error('MaterialsCompendiumData.js not loaded');
        return false;
    }

    const data = MATERIALS_COMPENDIUM_DATA;

    // Transform the data into our format
    for (const mat of data.data) {
        const id = createMaterialId(mat.Name);

        // Extract isotopic composition from Elements
        const composition = [];
        if (mat.Elements) {
            for (const elem of mat.Elements) {
                if (elem.Isotopes) {
                    // Use isotopic breakdown
                    for (const iso of elem.Isotopes) {
                        composition.push({
                            zaid: parseInt(iso.ZAID),
                            fraction: iso.AtomFraction_whole || iso.AtomFraction,
                            symbol: iso.Isotope
                        });
                    }
                } else {
                    // Just elemental (e.g., 1000, 6000)
                    composition.push({
                        zaid: parseInt(elem.ZAID),
                        fraction: elem.AtomFraction_whole || elem.AtomFraction,
                        symbol: elem.Element
                    });
                }
            }
        }

        // Determine category from material name
        const category = categorize(mat.Name);

        PNNL_MATERIALS[id] = {
            name: mat.Name,
            category: category,
            density: mat.Density,
            composition: composition,
            acronym: mat.Acronym ? mat.Acronym[0] : null,
            matNum: mat.MatNum,
            source: mat.Source,
            references: mat.References,
            comments: mat.Comment
        };
    }

    MATERIALS_LOADED = true;
    console.log(`Loaded ${Object.keys(PNNL_MATERIALS).length} materials from PNNL compendium`);

    return true;
}

/**
 * Create a URL-safe ID from material name
 */
function createMaterialId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Categorize material based on name
 */
function categorize(name) {
    const nameLower = name.toLowerCase();

    // Define category patterns
    const categories = {
        'Gases': [/\bair\b/, /\bgas\b/, /\bargon\b/, /\bhelium\b/, /\bneon\b/, /\bxenon\b/, /\bkrypton\b/, /co2/, /\bmethane\b/, /\bethane\b/, /\bpropane\b/],
        'Water': [/\bwater\b/, /\bh2o\b/, /\bice\b/, /\bseawater\b/, /\bheavy water\b/, /\bd2o\b/],
        'Concrete': [/\bconcrete\b/],
        'Metals': [/\baluminum\b/, /\biron\b/, /\bcopper\b/, /\blead\b/, /\btungsten\b/, /\bgold\b/, /\bsilver\b/, /\bnickel\b/, /\btitanium\b/, /\buranium\b/, /\bplutonium\b/, /\bzirconium\b/, /\bcadmium\b/, /\bzinc\b/, /\bmanganese\b/, /\bberyllium\b/, /\bmolybdenum\b/, /\btantalum\b/, /\bbismuth\b/],
        'Steel': [/\bsteel\b/, /\bstainless\b/],
        'Shielding': [/\bpolyethylene\b/, /\bparaffin\b/, /\bboron\b/, /\bshield\b/, /\bgraphite\b/, /\bcarbide\b/],
        'Detectors': [/\bscintill/, /\bdetector\b/, /\bnai\b/, /\bcsi\b/, /\bbgo\b/, /\blso\b/, /\blyso\b/, /\bgermanium\b/, /\bczt\b/, /\bhe-?3\b/, /\bbf3\b/],
        'Biological': [/\btissue\b/, /\bbone\b/, /\bmuscle\b/, /\bblood\b/, /\bbrain\b/, /\blung\b/, /\badipose\b/, /\bskin\b/, /\bcartilage\b/, /\bliver\b/, /\bkidney\b/, /\bheart\b/, /\bphantom\b/, /\bicru\b/, /\bicrp\b/],
        'Plastics': [/\bplastic\b/, /\bpolymer\b/, /\bpmma\b/, /\bpvc\b/, /\bteflon\b/, /\bnylon\b/, /\bpolystyrene\b/, /\bpolypropylene\b/, /\bepoxy\b/, /\bkapton\b/, /\bplexi/, /\blucite\b/, /\bmylar\b/, /\blexan\b/],
        'Explosives': [/\btnt\b/, /\brdx\b/, /\bpetn\b/, /\bhmx\b/, /\bexplosive\b/, /\bpropellant\b/],
        'Fuels': [/\bfuel\b/, /\bgasoline\b/, /\bdiesel\b/, /\bjet\b/, /\boil\b/, /\bpetroleum\b/],
        'Glass': [/\bglass\b/, /\bpyrex\b/, /\bsilica\b/],
        'Soil & Rock': [/\bsoil\b/, /\brock\b/, /\bearth\b/, /ite\b/]
    };

    for (const [category, patterns] of Object.entries(categories)) {
        for (const pattern of patterns) {
            if (pattern.test(nameLower)) {
                return category;
            }
        }
    }

    return 'Other';
}

/**
 * Get all unique categories
 */
function getMaterialCategories() {
    const categories = new Set();
    for (const key in PNNL_MATERIALS) {
        categories.add(PNNL_MATERIALS[key].category);
    }
    return Array.from(categories).sort();
}

/**
 * Search materials by name
 */
function searchMaterials(query, category = null) {
    const results = [];
    const queryLower = query.toLowerCase();

    for (const key in PNNL_MATERIALS) {
        const material = PNNL_MATERIALS[key];

        // Category filter
        if (category && material.category !== category) continue;

        // Name search (also search acronym)
        const nameMatch = material.name.toLowerCase().includes(queryLower);
        const acronymMatch = material.acronym && material.acronym.toLowerCase().includes(queryLower);

        if (nameMatch || acronymMatch) {
            results.push({ id: key, ...material });
        }
    }

    return results.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get material by ID
 */
function getMaterialById(id) {
    return PNNL_MATERIALS[id] || null;
}

/**
 * Check if materials are loaded
 */
function areMaterialsLoaded() {
    return MATERIALS_LOADED;
}

// Process materials once the data script is loaded
// This is called from main page after both scripts load
