// src/routes/frameworks/visuals/digital/data-flow-simulator/utils/sovereigntyUtils.js

// Check if data transfer is compliant with sovereignty rules
export function checkDataSovereignty(packet, sourceNode, targetNode, sovereigntyMode) {
  // If sovereignty mode is off, always allow
  if (!sovereigntyMode) return true;
  
  // If data doesn't have sovereignty requirements, allow
  if (!packet.data.sovereignty) return true;
  
  // Check if either source or target node supports data sovereignty
  return sourceNode.dataSovereignty || targetNode.dataSovereignty;
}

// Process data through sovereignty protocols
export function processSovereigntyCheck(packet, sovereigntyMode) {
  if (!sovereigntyMode || !packet.data.sovereignty) return packet;
  
  // Simulate sovereignty verification
  return {
    ...packet,
    sovereigntyChecks: [
      ...packet.sovereigntyChecks,
      {
        timestamp: Date.now(),
        status: 'verified'
      }
    ],
    verified: true
  };
}

// Get appropriate message for sovereignty status
export function getSovereigntyMessage(packet, sovereigntyMode) {
  if (!sovereigntyMode) return '';
  
  if (!packet.data.sovereignty) {
    return 'Standard data transfer - no sovereignty protocols required';
  }
  
  if (packet.sovereigntyChecks.length === 0) {
    return 'Awaiting sovereignty verification...';
  }
  
  return 'Data sovereignty verified - transfer authorized';
}

// Calculate efficiency impact of sovereignty protocols
export function calculateEfficiencyImpact(packets, sovereigntyMode) {
  if (!sovereigntyMode) return 100;
  
  // Calculate impact based on the ratio of sovereignty checks
  const totalPackets = packets.length;
  if (totalPackets === 0) return 95;
  
  const sovereigntyPackets = packets.filter(p => p.data.sovereignty).length;
  const ratio = sovereigntyPackets / totalPackets;
  
  // Small efficiency impact: 95-99% range
  return Math.floor(99 - (ratio * 4));
}
