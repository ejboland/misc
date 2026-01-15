# MCNP Material Card Converter

A web-based tool to convert MCNP elemental cross sections to isotopic cross sections using natural abundances.

## Overview

MCNP (Monte Carlo N-Particle) transport code often requires material cards to be specified with isotopic cross sections (e.g., `8016.70c`) rather than elemental ones (e.g., `8000.70c`). This tool automates the process of converting elemental material definitions into their isotopic constituents based on natural abundances.

It also includes a comprehensive library of standard materials derived from PNNL-15870 Rev.2.

## Features

- **Elemental to Isotopic Conversion**: Automatically expands elemental ZAIDs (e.g., `6000`, `26000`) into their naturally occurring isotopes (e.g., `6012`, `6013` and `26054`, `26056`, `26057`, `26058`).
- **Material Library**: Access to hundreds of standard materials from the "Compendium of Material Composition Data for Radiation Transport Modeling" (PNNL-15870 Rev.2).
- **Customizable Output**:
  - Round fractions to 6 decimal places or use scientific notation.
  - Add comments identifying isotopes.
  - Preserve or override library suffixes (e.g., `.70c`, `.80c`).
- **Natural Abundance Data**: Uses IUPAC 2016 recommendations for isotopic abundances.
- **Client-Side Processing**: All processing happens in your browser; no data is sent to a server.

## Usage

1. Clone or download this repository.
2. Navigate to the `mcnp-converter` directory.
3. Open `index.html` in your web browser.

No installation or local server is required as it is a static web application.

## File Structure

- `mcnp-converter/`
  - `index.html`: The main user interface.
  - `converter.js`: Handles parsing of input cards and the logic for converting elemental to isotopic compositions.
  - `materials.js`: Manages the material library interface and searching.
  - `abundances.js`: Contains the natural isotopic abundance database (IUPAC 2016).
  - `MaterialsCompendiumData.js`: Contains the PNNL material compendium database.
  - `styles.css`: Application styling.
  - `MaterialsCompendium.json`: The source JSON data for the material compendium.

## Data Sources

- **Material Compositions**: PNNL-15870 Rev.2 "Compendium of Material Composition Data for Radiation Transport Modeling".
- **Isotopic Abundances**: IUPAC 2016 "Isotopic Compositions of the Elements".

## License

This project is open source.
