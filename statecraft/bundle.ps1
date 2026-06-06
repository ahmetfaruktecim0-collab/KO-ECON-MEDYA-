$files = @(
    "js/state.js",
    "js/cards.js",
    "js/simulation.js",
    "js/events.js",
    "js/debate.js",
    "js/map.js",
    "js/charts.js",
    "js/ui.js"
)

$combined = @"
/**
 * ============================================================================
 * TURKEY 2038 - MAIN APPLICATION CODE (COMBINED ENGINE)
 * ============================================================================
 * AUTO-GENERATED BUNDLE FROM MODULAR FILES IN js/ SUBDIRECTORY.
 * DO NOT MODIFY THIS FILE DIRECTLY. EDIT THE FILES IN js/ AND RUN bundle.ps1.
 * ============================================================================
 */


"@

foreach ($file in $files) {
    Write-Host "Bundling $file..."
    $content = Get-Content -Encoding utf8 -Path $file -Raw
    
    # Remove imports
    $content = $content -replace "(?m)^import\s+[\s\S]*?from\s+['`"].*?['`"];?", ""
    
    # Remove export keywords from declarations
    $content = $content -replace "(?m)^export\s+(const|let|var|function|class)\s+", "`$1 "
    
    # Remove standalone exports
    $content = $content -replace "(?m)^export\s+\{[\s\S]*?\};?", ""
    
    $combined += "`n// ==============================`n// SECTION: $file`n// ==============================`n`n"
    $combined += $content.Trim() + "`n"
}

Set-Content -Path "app.js" -Value $combined -Encoding utf8
Write-Host "Successfully bundled into app.js!"
