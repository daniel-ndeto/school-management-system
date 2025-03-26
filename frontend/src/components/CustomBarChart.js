import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import styled from "styled-components";

// Styled component for the tooltip container
const CustomTooltip = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Styled component for the tooltip text
const TooltipText = styled.p`
  margin: 0;
  font-weight: bold;
  color:#1e1e1e;
`;

// Styled component for the main heading in the tooltip
const TooltipMain = styled.h2`
  margin: 0;
  font-weight: bold;
  color:#000000;
`;

// Custom tooltip content component for rendering dynamic tooltip data
const CustomTooltipContent = ({ active, payload, dataKey }) => {
    if (active && payload && payload.length) {
        // Destructuring the data from the payload
        const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

        return (
            <CustomTooltip>
                {dataKey === "attendancePercentage" ? ( // Conditional rendering based on the dataKey
                    <>
                        <TooltipMain>{subject}</TooltipMain>
                        <TooltipText>Attended: ({attendedClasses}/{totalClasses})</TooltipText>
                        <TooltipText>{attendancePercentage}%</TooltipText>
                    </>
                ) : (
                    <>
                        <TooltipMain>{subName.subName}</TooltipMain>
                        <TooltipText>Marks: {marksObtained}</TooltipText>
                    </>
                )}
            </CustomTooltip>
        );
    }

    return null; // Return null if the tooltip is not active
};

// Main component for rendering the custom bar chart
const CustomBarChart = ({ chartData, dataKey }) => {
    // Extracting subjects from the chart data
    const subjects = chartData.map((data) => data.subject);
    // Generating distinct colors for each bar
    const distinctColors = generateDistinctColors(subjects.length);

    return (
        <BarChart width={500} height={500} data={chartData}>
            {/* XAxis dynamically adjusts based on the dataKey */}
            <XAxis dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} />
            <YAxis domain={[0, 100]} /> {/* YAxis is fixed to a range of 0 to 100 */}
            <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} /> {/* Custom tooltip */}
            <Bar dataKey={dataKey}>
                {/* Rendering bars with distinct colors */}
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={distinctColors[index]} />
                ))}
            </Bar>
        </BarChart>
    );
};

// Helper function to generate distinct colors for the bars
const generateDistinctColors = (count) => {
    const colors = [];
    const goldenRatioConjugate = 0.618033988749895; // Constant for generating distinct hues

    for (let i = 0; i < count; i++) {
        const hue = (i * goldenRatioConjugate) % 1; // Calculate hue using golden ratio
        const color = hslToRgb(hue, 0.6, 0.6); // Convert HSL to RGB
        colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`); // Push RGB color to the array
    }

    return colors; // Return the array of colors
};

// Helper function to convert HSL values to RGB
const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic case
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s; // Calculate q
        const p = 2 * l - q; // Calculate p
        r = hue2rgb(p, q, h + 1 / 3); // Red channel
        g = hue2rgb(p, q, h); // Green channel
        b = hue2rgb(p, q, h - 1 / 3); // Blue channel
    }

    // Convert normalized RGB values to 0-255 range
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart; // Export the component as default
