/**
 * TURKEY 2038 - CUSTOM HTML5 CANVAS TELEMETRY CHART
 */

export function renderHistoryChart(canvasId, historyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 20, bottom: 25, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const dataPoints = historyData.turns.length;
    if (dataPoints < 2) {
        // Draw waiting placeholder
        ctx.fillStyle = "var(--text-secondary)";
        ctx.font = "11px var(--font-header)";
        ctx.textAlign = "center";
        ctx.fillText("WAITING FOR HISTORICAL TELEMETRY...", width / 2, height / 2);
        return;
    }

    // Grid Setup (4 intervals: 0, 25, 50, 75, 100)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(148, 163, 184, 0.5)"; // text-secondary with transparency
    ctx.font = "8px var(--font-header)";
    ctx.textAlign = "right";

    const yIntervals = [0, 25, 50, 75, 100];
    yIntervals.forEach(val => {
        const y = padding.top + chartHeight - (val / 100) * chartHeight;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();

        // Draw label
        ctx.fillText(`${val}%`, padding.left - 8, y + 3);
    });

    // Draw Vertical Turn Grid
    ctx.textAlign = "center";
    const xInterval = Math.max(1, Math.floor(dataPoints / 6)); // limit labels on x-axis
    for (let i = 0; i < dataPoints; i++) {
        const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
        
        // Draw vertical ticks
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();

        // Draw X-axis label
        if (i % xInterval === 0 || i === dataPoints - 1) {
            ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
            ctx.fillText(historyData.turns[i], x, padding.top + chartHeight + 15);
        }
    }

    // Colors mapping
    const lines = [
        { data: historyData.happiness, color: "#4FA286", label: "Happiness" }, // Muted Green
        { data: historyData.economy, color: "#5395E2", label: "Economy" },     // Muted Navy
        { data: historyData.inflation, color: "#E35E6D", label: "Inflation" }, // Muted Burgundy
        { data: historyData.playerPoll, color: "#E5B85C", label: "Approval" }  // Muted Gold
    ];

    // Plot Lines
    lines.forEach(line => {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        for (let i = 0; i < dataPoints; i++) {
            const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
            const y = padding.top + chartHeight - (line.data[i] / 100) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw Area Fill Gradient (no shadow for fills)
        ctx.shadowBlur = 0;
        const fillGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
        fillGradient.addColorStop(0, `${line.color}15`); // very low opacity
        fillGradient.addColorStop(1, `${line.color}00`);

        ctx.fillStyle = fillGradient;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top + chartHeight);
        for (let i = 0; i < dataPoints; i++) {
            const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
            const y = padding.top + chartHeight - (line.data[i] / 100) * chartHeight;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
        ctx.closePath();
        ctx.fill();
    });

    // Draw Chart Border
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(56, 63, 76, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(padding.left, padding.top, chartWidth, chartHeight);
    ctx.stroke();
}
