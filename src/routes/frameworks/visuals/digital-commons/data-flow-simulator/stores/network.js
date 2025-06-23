// src/routes/frameworks/visuals/digital/data-flow-simulator/stores/network.js
import { writable } from 'svelte/store';

function createNetworkStore() {
  // Initial network configuration
  const initialState = {
    nodes: [
      { 
        id: 'ln-1', 
        name: 'Senegal Node', 
        type: 'local', 
        label: 'SN',
        location: 'Dakar, Senegal',
        dataSovereignty: true,
        x: 150, 
        y: 300,
        connections: ['rh-1', 'ln-2']
      },
      { 
        id: 'ln-2', 
        name: 'Kenya Node', 
        type: 'local', 
        label: 'KN',
        location: 'Nairobi, Kenya',
        dataSovereignty: true,
        x: 350, 
        y: 350,
        connections: ['ln-1', 'rh-1', 'ln-3']
      },
      { 
        id: 'ln-3', 
        name: 'India Node', 
        type: 'local', 
        label: 'IN',
        location: 'Bengaluru, India',
        dataSovereignty: true,
        x: 450, 
        y: 200,
        connections: ['ln-2', 'rh-2']
      },
      { 
        id: 'rh-1', 
        name: 'Africa Hub', 
        type: 'regional', 
        label: 'AH',
        location: 'Addis Ababa, Ethiopia',
        dataSovereignty: true,
        x: 250, 
        y: 200,
        connections: ['ln-1', 'ln-2', 'gc-1']
      },
      { 
        id: 'rh-2', 
        name: 'Asia Hub', 
        type: 'regional', 
        label: 'AS',
        location: 'Singapore',
        dataSovereignty: true,
        x: 550, 
        y: 250,
        connections: ['ln-3', 'gc-1', 'ln-4']
      },
      { 
        id: 'ln-4', 
        name: 'Brazil Node', 
        type: 'local', 
        label: 'BR',
        location: 'São Paulo, Brazil',
        dataSovereignty: false,
        x: 200, 
        y: 450,
        connections: ['rh-2', 'ln-5']
      },
      { 
        id: 'ln-5', 
        name: 'Canada Node', 
        type: 'local', 
        label: 'CN',
        location: 'Toronto, Canada',
        dataSovereignty: true,
        x: 400, 
        y: 450,
        connections: ['ln-4', 'gc-1']
      },
      { 
        id: 'gc-1', 
        name: 'Global Council', 
        type: 'global', 
        label: 'GC',
        location: 'Distributed',
        dataSovereignty: true,
        x: 350, 
        y: 100,
        connections: ['rh-1', 'rh-2', 'ln-5']
      },
      { 
        id: 'dev-1', 
        name: 'Mobile Device', 
        type: 'device', 
        label: 'MD',
        location: 'Field Location',
        dataSovereignty: false,
        x: 150, 
        y: 380,
        connections: ['ln-1']
      }
    ],
    connections: [],
    scenarios: [
      {
        id: 'basic',
        name: 'Basic Framework Network',
        description: 'Demonstrates the core Digital Commons Framework network with Local Nodes, Regional Hubs, and the Global Council.'
      },
      {
        id: 'health-data',
        name: 'Health Data Sharing',
        description: 'Shows how health data flows between nodes with sovereignty protocols ensuring sensitive information is properly managed.'
      },
      {
        id: 'cultural-knowledge',
        name: 'Cultural Knowledge Commons',
        description: 'Illustrates the preservation and sharing of cultural knowledge with Indigenous data sovereignty protocols.'
      },
      {
        id: 'disaster-response',
        name: 'Disaster Response Network',
        description: 'Demonstrates how the network adapts during emergency situations while maintaining sovereignty principles.'
      }
    ]
  };
  
  // Generate connections based on node connections
  initialState.connections = generateConnections(initialState.nodes);
  
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    loadScenario: (scenario) => {
      update(state => {
        let newState = { ...state };
        
        // Adjust network configuration based on scenario
        switch(scenario.id) {
          case 'health-data':
            newState.nodes = newState.nodes.map(node => ({
              ...node,
              dataSovereignty: ['ln-1', 'ln-2', 'ln-5', 'rh-1', 'gc-1'].includes(node.id)
            }));
            break;
            
          case 'cultural-knowledge':
            newState.nodes = newState.nodes.map(node => ({
              ...node,
              dataSovereignty: ['ln-3', 'ln-5', 'rh-2', 'gc-1'].includes(node.id)
            }));
            break;
            
          case 'disaster-response':
            // Add more direct connections between nodes for emergency response
            const disasterNodes = [...newState.nodes];
            disasterNodes.find(n => n.id === 'ln-1').connections.push('ln-3');
            disasterNodes.find(n => n.id === 'ln-3').connections.push('ln-1');
            newState.nodes = disasterNodes;
            break;
            
          default: // basic scenario
            newState = { ...initialState };
            break;
        }
        
        // Regenerate connections
        newState.connections = generateConnections(newState.nodes);
        
        return newState;
      });
    },
    
    // Add a new node to the network
    addNode: (node) => {
      update(state => {
        const newNodes = [...state.nodes, node];
        return {
          ...state,
          nodes: newNodes,
          connections: generateConnections(newNodes)
        };
      });
    },
    
    // Update an existing node
    updateNode: (id, updates) => {
      update(state => {
        const newNodes = state.nodes.map(node => 
          node.id === id ? { ...node, ...updates } : node
        );
        return {
          ...state,
          nodes: newNodes,
          connections: generateConnections(newNodes)
        };
      });
    }
  };
}

// Helper function to generate connections based on node connection lists
function generateConnections(nodes) {
  const connections = [];
  const processedPairs = new Set();
  
  nodes.forEach(sourceNode => {
    (sourceNode.connections || []).forEach(targetId => {
      // Create a unique pair ID to avoid duplicates
      const pairId = [sourceNode.id, targetId].sort().join('-');
      
      if (!processedPairs.has(pairId)) {
        processedPairs.add(pairId);
        
        const targetNode = nodes.find(n => n.id === targetId);
        if (targetNode) {
          connections.push({
            source: sourceNode,
            target: targetNode,
            type: determineConnectionType(sourceNode.type, targetNode.type),
            bandwidth: Math.floor(Math.random() * 100) + 20,
            sovereigntyCheck: sourceNode.dataSovereignty || targetNode.dataSovereignty
          });
        }
      }
    });
  });
  
  return connections;
}

// Determine connection type based on connected nodes
function determineConnectionType(sourceType, targetType) {
  if (sourceType === 'global' || targetType === 'global') {
    return 'global';
  } else if (sourceType === 'regional' || targetType === 'regional') {
    return 'regional';
  } else if (sourceType === 'device' || targetType === 'device') {
    return 'backup';
  } else {
    return 'main';
  }
}

export const networkStore = createNetworkStore();
