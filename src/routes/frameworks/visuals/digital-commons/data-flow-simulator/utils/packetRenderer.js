// src/routes/frameworks/visuals/digital/data-flow-simulator/utils/packetRenderer.js

// Define shape rendering functions for different packet types
export const packetShapes = {
  Health: (size, context) => {
    // Red cross for health data
    context.fillRect(-size/2, -size/2, size, size);
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(-size/4, 0);
    context.lineTo(size/4, 0);
    context.moveTo(0, -size/4);
    context.lineTo(0, size/4);
    context.stroke();
  },
  
  Climate: (size, context) => {
    // Green leaf shape for climate data
    context.beginPath();
    context.ellipse(-size/4, 0, size/2, size/4, Math.PI/4, 0, Math.PI*2);
    context.fill();
    context.beginPath();
    context.moveTo(-size/4, -size/4);
    context.quadraticCurveTo(size/4, -size/2, size/4, size/4);
    context.quadraticCurveTo(-size/8, 0, -size/4, -size/4);
    context.fill();
  },
  
  Education: (size, context) => {
    // Book shape for education data
    context.fillRect(-size/2, -size/2, size, size);
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, -size/2);
    context.lineTo(0, size/2);
    context.stroke();
    context.strokeRect(-size/2, -size/2, size, size);
  },
  
  Cultural: (size, context) => {
    // Diamond/artifact shape for cultural data
    context.beginPath();
    context.moveTo(0, -size/2);
    context.lineTo(size/2, 0);
    context.lineTo(0, size/2);
    context.lineTo(-size/2, 0);
    context.closePath();
    context.fill();
  }
};

// Draw a glow effect for verified packets
export function drawVerificationGlow(size, context) {
  const gradient = context.createRadialGradient(0, 0, size/2, 0, 0, size*1.5);
  gradient.addColorStop(0, "rgba(16, 185, 129, 0.5)");
  gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
  
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(0, 0, size*1.5, 0, Math.PI*2);
  context.fill();
}
