/**
 * MCNP Material Card Converter
 * Converts elemental cross sections to isotopic cross sections
 */

// DOM Elements
const inputCard = document.getElementById('inputCard');
const outputCard = document.getElementById('outputCard');
const convertBtn = document.getElementById('convertBtn');
const loadExampleBtn = document.getElementById('loadExample');
const clearInputBtn = document.getElementById('clearInput');
const copyOutputBtn = document.getElementById('copyOutput');
const downloadOutputBtn = document.getElementById('downloadOutput');
const inputCount = document.getElementById('inputCount');
const outputCount = document.getElementById('outputCount');
const statusIndicator = document.getElementById('statusIndicator');
const conversionInfo = document.getElementById('conversionInfo');
const infoGrid = document.getElementById('infoGrid');
const roundFractionsCheckbox = document.getElementById('roundFractions');
const addCommentsCheckbox = document.getElementById('addComments');
const preserveLibraryCheckbox = document.getElementById('preserveLibrary');
const overrideLibraryCheckbox = document.getElementById('overrideLibrary');
const newLibraryInput = document.getElementById('newLibrary');


// Modal Elements
const abundanceModal = document.getElementById('abundanceModal');
const showAbundancesLink = document.getElementById('showAbundances');
const closeModalBtn = document.getElementById('closeModal');
const searchElement = document.getElementById('searchElement');
const abundanceTable = document.getElementById('abundanceTable');

// Example material card
const EXAMPLE_CARD = `c Air at sea level (dry)
M1    6000.70c  -0.000124    $ Carbon
      7000.70c  -0.755268    $ Nitrogen
      8000.70c  -0.231781    $ Oxygen
      18000.70c -0.012827    $ Argon`;

/**
 * Parse MCNP material card into structured data
 */
function parseMaterialCard(input) {
    const lines = input.split('\n');
    const materials = [];
    let currentMaterial = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Skip empty lines
        if (!trimmedLine) continue;

        // Check for comment lines (start with 'c' or 'C')
        if (trimmedLine.match(/^[cC]\s/)) {
            if (currentMaterial) {
                currentMaterial.comments.push(line);
            } else {
                materials.push({ type: 'comment', content: line });
            }
            continue;
        }

        // Check for material card start (M followed by number)
        const materialMatch = trimmedLine.match(/^[mM](\d+)\s+(.*)$/);
        if (materialMatch) {
            if (currentMaterial) {
                materials.push(currentMaterial);
            }
            currentMaterial = {
                type: 'material',
                number: materialMatch[1],
                entries: [],
                comments: [],
                originalLines: [line]
            };
            // Parse the rest of the line
            const entries = parseEntries(materialMatch[2]);
            currentMaterial.entries.push(...entries);
            continue;
        }

        // Continuation line (starts with whitespace)
        if (currentMaterial && line.match(/^\s/)) {
            currentMaterial.originalLines.push(line);
            const entries = parseEntries(trimmedLine);
            currentMaterial.entries.push(...entries);
            continue;
        }
    }

    if (currentMaterial) {
        materials.push(currentMaterial);
    }

    return materials;
}

/**
 * Parse entries from a line (ZAID fraction pairs)
 */
function parseEntries(line) {
    const entries = [];

    // Remove inline comments
    const commentIndex = line.indexOf('$');
    let dataLine = commentIndex >= 0 ? line.substring(0, commentIndex) : line;
    let comment = commentIndex >= 0 ? line.substring(commentIndex) : '';

    // Split by whitespace
    const tokens = dataLine.trim().split(/\s+/).filter(t => t);

    for (let i = 0; i < tokens.length; i += 2) {
        if (i + 1 < tokens.length) {
            const zaidRaw = tokens[i];
            const fraction = tokens[i + 1];

            // Parse ZAID (format: ZZZAAA.XXL or ZZZAAA)
            const zaidMatch = zaidRaw.match(/^(\d+)(\.(\w+))?$/);
            if (zaidMatch) {
                const zaid = parseInt(zaidMatch[1]);
                const library = zaidMatch[3] || null;

                entries.push({
                    zaid: zaid,
                    library: library,
                    fraction: parseFloat(fraction),
                    fractionStr: fraction,
                    comment: i === 0 ? comment : '',
                    isElemental: isElementalZAID(zaid)
                });
            }
        }
    }

    return entries;
}

/**
 * Convert elemental entries to isotopic entries
 */
function convertToIsotopic(materials, options) {
    const { roundFractions, addComments, preserveLibrary, overrideLibrary, newLibrary } = options;

    const converted = [];
    let elementsConverted = 0;
    let isotopesGenerated = 0;

    for (const item of materials) {
        if (item.type === 'comment') {
            converted.push(item);
            continue;
        }

        const newEntries = [];

        for (const entry of item.entries) {
            if (!entry.isElemental) {
                // Already isotopic, keep as-is
                newEntries.push({
                    ...entry,
                    originalElement: null
                });
            } else {
                // Convert elemental to isotopic
                const z = getZFromZAID(entry.zaid);
                const element = getElementByZ(z);

                if (!element) {
                    // Element not found in database, keep original
                    newEntries.push({
                        ...entry,
                        originalElement: null,
                        warning: `Element Z=${z} not found in database`
                    });
                    continue;
                }

                elementsConverted++;

                for (const isotope of element.isotopes) {
                    const newFraction = entry.fraction * isotope.abundance;

                    // Skip negligible isotopes
                    if (Math.abs(newFraction) < 1e-12) continue;

                    isotopesGenerated++;

                    let fractionStr;
                    if (roundFractions) {
                        fractionStr = formatFraction(newFraction);
                    } else {
                        fractionStr = newFraction.toExponential(6);
                    }

                    // Determine library suffix
                    let finalLibrary = null;
                    if (overrideLibrary) {
                        finalLibrary = newLibrary.startsWith('.') ? newLibrary.substring(1) : newLibrary;
                    } else if (preserveLibrary) {
                        finalLibrary = entry.library;
                    }

                    newEntries.push({
                        zaid: isotope.zaid,
                        library: finalLibrary,

                        fraction: newFraction,
                        fractionStr: fractionStr,
                        comment: addComments ? `$ ${element.symbol}-${isotope.mass}` : '',
                        isElemental: false,
                        originalElement: element.symbol,
                        originalFraction: entry.fraction,
                        abundance: isotope.abundance
                    });
                }
            }
        }

        converted.push({
            ...item,
            entries: newEntries
        });
    }

    return {
        materials: converted,
        stats: {
            elementsConverted,
            isotopesGenerated
        }
    };
}

/**
 * Format fraction for output
 */
function formatFraction(value) {
    if (value === 0) return '0.0';

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 0.0001 && absValue < 1000) {
        // Use fixed notation for reasonable ranges
        return sign + absValue.toFixed(6);
    } else {
        // Use scientific notation for very small or large values
        return value.toExponential(6);
    }
}

/**
 * Generate output material card
 */
function generateOutput(convertedMaterials) {
    let output = '';

    for (const item of convertedMaterials) {
        if (item.type === 'comment') {
            output += item.content + '\n';
            continue;
        }

        // Material header
        const firstEntry = item.entries[0];
        if (!firstEntry) continue;

        const zaidStr = firstEntry.library
            ? `${firstEntry.zaid}.${firstEntry.library}`
            : `${firstEntry.zaid}`;

        output += `M${item.number}    ${zaidStr.padEnd(12)} ${firstEntry.fractionStr.padStart(12)}`;
        if (firstEntry.comment) {
            output += `    ${firstEntry.comment}`;
        }
        output += '\n';

        // Continuation entries
        for (let i = 1; i < item.entries.length; i++) {
            const entry = item.entries[i];
            const zaidStr = entry.library
                ? `${entry.zaid}.${entry.library}`
                : `${entry.zaid}`;

            output += `      ${zaidStr.padEnd(12)} ${entry.fractionStr.padStart(12)}`;
            if (entry.comment) {
                output += `    ${entry.comment}`;
            }
            output += '\n';
        }
    }

    return output.trim();
}

/**
 * Main conversion function
 */
function convert() {
    const input = inputCard.value.trim();

    if (!input) {
        showStatus('No input provided', 'error');
        return;
    }

    try {
        const materials = parseMaterialCard(input);

        if (materials.length === 0) {
            showStatus('No valid material cards found', 'error');
            return;
        }

        const options = {
            roundFractions: roundFractionsCheckbox.checked,
            addComments: addCommentsCheckbox.checked,
            preserveLibrary: preserveLibraryCheckbox.checked,
            overrideLibrary: overrideLibraryCheckbox.checked,
            newLibrary: newLibraryInput.value.trim()
        };


        const { materials: converted, stats } = convertToIsotopic(materials, options);
        const output = generateOutput(converted);

        outputCard.value = output;
        updateCharCount(outputCount, output.length);

        // Enable output buttons
        copyOutputBtn.disabled = false;
        downloadOutputBtn.disabled = false;

        // Show conversion info
        showConversionInfo(stats);
        showStatus('Conversion successful', 'success');

    } catch (error) {
        console.error('Conversion error:', error);
        showStatus('Error: ' + error.message, 'error');
    }
}

/**
 * Show conversion statistics
 */
function showConversionInfo(stats) {
    conversionInfo.style.display = 'block';

    infoGrid.innerHTML = `
        <div class="info-item">
            <div class="label">Elements Converted</div>
            <div class="value highlight">${stats.elementsConverted}</div>
        </div>
        <div class="info-item">
            <div class="label">Isotopes Generated</div>
            <div class="value highlight">${stats.isotopesGenerated}</div>
        </div>
        <div class="info-item">
            <div class="label">Output Lines</div>
            <div class="value">${outputCard.value.split('\n').length}</div>
        </div>
    `;
}

/**
 * Show status message
 */
function showStatus(message, type) {
    statusIndicator.textContent = message;
    statusIndicator.className = 'status-indicator ' + type;

    setTimeout(() => {
        statusIndicator.textContent = '';
        statusIndicator.className = 'status-indicator';
    }, 3000);
}

/**
 * Update character count
 */
function updateCharCount(element, count) {
    element.textContent = `${count} character${count !== 1 ? 's' : ''}`;
}

/**
 * Copy to clipboard
 */
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(outputCard.value);
        showStatus('Copied to clipboard!', 'success');
    } catch (error) {
        // Fallback for older browsers
        outputCard.select();
        document.execCommand('copy');
        showStatus('Copied to clipboard!', 'success');
    }
}

/**
 * Download output
 */
function downloadOutput() {
    const blob = new Blob([outputCard.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'material_card_isotopic.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Downloaded!', 'success');
}

/**
 * Render abundance table in modal
 */
function renderAbundanceTable(filter = '') {
    const filterLower = filter.toLowerCase();
    let html = '';

    const sortedKeys = Object.keys(NATURAL_ABUNDANCES).sort((a, b) => parseInt(a) - parseInt(b));

    for (const z of sortedKeys) {
        const element = NATURAL_ABUNDANCES[z];

        // Apply filter
        if (filter &&
            !element.name.toLowerCase().includes(filterLower) &&
            !element.symbol.toLowerCase().includes(filterLower) &&
            !z.includes(filter)) {
            continue;
        }

        html += `
            <div class="element-card" data-z="${z}">
                <div class="element-header" onclick="toggleElement(${z})">
                    <div class="element-symbol">${element.symbol}</div>
                    <div class="element-info">
                        <div class="element-name">${element.name}</div>
                        <div class="element-z">Z = ${z} • ${element.isotopes.length} isotope${element.isotopes.length > 1 ? 's' : ''}</div>
                    </div>
                </div>
                <div class="element-isotopes">
                    <table class="isotope-table">
                        <thead>
                            <tr>
                                <th>Mass</th>
                                <th>ZAID</th>
                                <th>Abundance</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${element.isotopes.map(iso => `
                                <tr>
                                    <td>${iso.mass}</td>
                                    <td>${iso.zaid}</td>
                                    <td>${(iso.abundance * 100).toFixed(4)}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    abundanceTable.innerHTML = html || '<p style="text-align: center; color: var(--text-muted);">No elements found</p>';
}

/**
 * Toggle element expansion in modal
 */
function toggleElement(z) {
    const card = document.querySelector(`.element-card[data-z="${z}"]`);
    if (card) {
        card.classList.toggle('expanded');
    }
}

// Make toggleElement available globally
window.toggleElement = toggleElement;

// Event Listeners
inputCard.addEventListener('input', () => {
    updateCharCount(inputCount, inputCard.value.length);
});

convertBtn.addEventListener('click', convert);

loadExampleBtn.addEventListener('click', () => {
    inputCard.value = EXAMPLE_CARD;
    updateCharCount(inputCount, EXAMPLE_CARD.length);
});

clearInputBtn.addEventListener('click', () => {
    inputCard.value = '';
    outputCard.value = '';
    updateCharCount(inputCount, 0);
    updateCharCount(outputCount, 0);
    copyOutputBtn.disabled = true;
    downloadOutputBtn.disabled = true;
    conversionInfo.style.display = 'none';
    statusIndicator.textContent = '';
});

copyOutputBtn.addEventListener('click', copyToClipboard);
downloadOutputBtn.addEventListener('click', downloadOutput);

showAbundancesLink.addEventListener('click', (e) => {
    e.preventDefault();
    abundanceModal.classList.add('active');
    renderAbundanceTable();
});

closeModalBtn.addEventListener('click', () => {
    abundanceModal.classList.remove('active');
});

abundanceModal.addEventListener('click', (e) => {
    if (e.target === abundanceModal) {
        abundanceModal.classList.remove('active');
    }
});

searchElement.addEventListener('input', (e) => {
    renderAbundanceTable(e.target.value);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to convert
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convert();
    }

    // Escape to close modal
    if (e.key === 'Escape' && abundanceModal.classList.contains('active')) {
        abundanceModal.classList.remove('active');
    }
});

// Mutex for library checkboxes
preserveLibraryCheckbox.addEventListener('change', () => {
    if (preserveLibraryCheckbox.checked) overrideLibraryCheckbox.checked = false;
});

overrideLibraryCheckbox.addEventListener('change', () => {
    if (overrideLibraryCheckbox.checked) preserveLibraryCheckbox.checked = false;
});

newLibraryInput.addEventListener('focus', () => {
    overrideLibraryCheckbox.checked = true;
    preserveLibraryCheckbox.checked = false;
});

// Initialize
updateCharCount(inputCount, 0);
updateCharCount(outputCount, 0);

// ==================== MATERIAL LIBRARY ====================

// Material Library DOM Elements
const materialSearch = document.getElementById('materialSearch');
const categoryFilter = document.getElementById('categoryFilter');
const materialList = document.getElementById('materialList');
const materialDetails = document.getElementById('materialDetails');
const materialCount = document.getElementById('materialCount');
const selectedMaterialName = document.getElementById('selectedMaterialName');
const selectedDensity = document.getElementById('selectedDensity');
const matNumberInput = document.getElementById('matNumber');
const generateCardBtn = document.getElementById('generateCardBtn');

// Current selected material
let selectedMaterialId = null;

/**
 * Initialize material library
 */
function initMaterialLibrary() {
    // Check if materials are loaded
    if (!areMaterialsLoaded()) {
        materialList.innerHTML = '<div class="material-list-empty">Loading materials...</div>';
        materialCount.textContent = 'Loading...';
        return;
    }

    // Clear and rebuild category filter
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    const categories = getMaterialCategories();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Initial render
    renderMaterialList();
    updateMaterialCount();
}


/**
 * Update material count display
 */
function updateMaterialCount() {
    const total = Object.keys(PNNL_MATERIALS).length;
    materialCount.textContent = `${total} materials`;
}

/**
 * Render material list based on current filters
 */
function renderMaterialList() {
    const query = materialSearch.value;
    const category = categoryFilter.value || null;
    const results = searchMaterials(query, category);

    if (results.length === 0) {
        materialList.innerHTML = '<div class="material-list-empty">No materials found</div>';
        return;
    }

    let html = '';
    for (const mat of results) {
        const isSelected = mat.id === selectedMaterialId ? 'selected' : '';
        html += `
            <div class="material-item ${isSelected}" data-id="${mat.id}">
                <span class="material-item-name">${mat.name}</span>
                <span class="material-item-category">${mat.category}</span>
            </div>
        `;
    }

    materialList.innerHTML = html;

    // Attach click handlers
    materialList.querySelectorAll('.material-item').forEach(item => {
        item.addEventListener('click', () => selectMaterial(item.dataset.id));
    });
}

/**
 * Select a material and show details
 */
function selectMaterial(materialId) {
    selectedMaterialId = materialId;
    const material = getMaterialById(materialId);

    if (!material) return;

    // Update selection highlight
    materialList.querySelectorAll('.material-item').forEach(item => {
        item.classList.toggle('selected', item.dataset.id === materialId);
    });

    // Show details
    materialDetails.style.display = 'block';
    selectedMaterialName.textContent = material.name;
    selectedDensity.textContent = `ρ = ${material.density} g/cm³`;
}

/**
 * Generate MCNP material card from selected material
 */
function generateMaterialCard() {
    if (!selectedMaterialId) {
        showStatus('No material selected', 'error');
        return;
    }

    const material = getMaterialById(selectedMaterialId);
    if (!material) return;

    const matNum = parseInt(matNumberInput.value) || 1;

    // Determine library suffix
    let librarySuffix = '';
    if (overrideLibraryCheckbox.checked && newLibraryInput.value.trim()) {
        librarySuffix = newLibraryInput.value.trim();
        if (!librarySuffix.startsWith('.')) {
            librarySuffix = '.' + librarySuffix;
        }
    }

    // Build the material card
    let card = `c ${material.name} (density: ${material.density} g/cm3)\n`;

    const entries = material.composition;
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const zaidStr = `${entry.zaid}${librarySuffix}`;
        const fractionStr = formatFraction(entry.fraction);

        // Get element info for comment
        const z = Math.floor(entry.zaid / 1000);
        const element = NATURAL_ABUNDANCES[z];
        const comment = element ? `$ ${element.symbol}` : '';

        if (i === 0) {
            card += `M${matNum}    ${zaidStr.padEnd(12)} ${fractionStr.padStart(12)}    ${comment}\n`;
        } else {
            card += `      ${zaidStr.padEnd(12)} ${fractionStr.padStart(12)}    ${comment}\n`;
        }
    }

    // Put in output area
    outputCard.value = card.trim();
    updateCharCount(outputCount, outputCard.value.length);

    // Enable buttons
    copyOutputBtn.disabled = false;
    downloadOutputBtn.disabled = false;

    // Show info
    conversionInfo.style.display = 'block';
    infoGrid.innerHTML = `
        <div class="info-item">
            <div class="label">Material</div>
            <div class="value highlight">${material.name}</div>
        </div>
        <div class="info-item">
            <div class="label">Density</div>
            <div class="value">${material.density} g/cm³</div>
        </div>
        <div class="info-item">
            <div class="label">Components</div>
            <div class="value">${entries.length}</div>
        </div>
    `;

    showStatus('Material card generated!', 'success');

    // Increment material number for next generation
    matNumberInput.value = matNum + 1;
}

// Material Library Event Listeners
materialSearch.addEventListener('input', renderMaterialList);
categoryFilter.addEventListener('change', renderMaterialList);
generateCardBtn.addEventListener('click', generateMaterialCard);

// Initialize material library on page load
initMaterialLibrary();
