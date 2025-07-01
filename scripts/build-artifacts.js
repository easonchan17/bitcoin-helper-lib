const fs = require('fs');
const path = require('path');

// Read the artifacts directory
const artifactsDir = path.join(__dirname, '../artifacts/contracts');
const outputDir = path.join(__dirname, '../artifacts');

// Create artifacts directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to copy contract artifacts
function copyContractArtifacts() {
  const contracts = [
    'libraries/BitcoinHelper.sol',
    'libraries/TypedMemView.sol',
    'types/ScriptTypesEnum.sol'
  ];

  contracts.forEach(contract => {
    const contractName = contract.replace('.sol', '').split('/').pop();
    const sourcePath = path.join(artifactsDir, contract, `${contractName}.json`);
    const destPath = path.join(outputDir, `${contractName}.json`);

    if (fs.existsSync(sourcePath)) {
      const artifact = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

      // Only include necessary fields for the published artifact
      const minimalArtifact = {
        contractName: artifact.contractName,
        abi: artifact.abi,
        bytecode: artifact.bytecode,
        deployedBytecode: artifact.deployedBytecode,
        sourceMap: artifact.sourceMap,
        deployedSourceMap: artifact.deployedSourceMap,
        metadata: artifact.metadata,
        compiler: artifact.compiler
      };

      fs.writeFileSync(destPath, JSON.stringify(minimalArtifact, null, 2));
      console.log(`✓ Copied ${contractName} artifact`);
    } else {
      console.warn(`⚠ Warning: ${sourcePath} not found`);
    }
  });
}

// Function to create index.js for easy importing
function createIndexJS() {
  const indexContent = `// Bitcoin Helper Library - Generated Index
const fs = require('fs');
const path = require('path');

// Import contract artifacts
const BitcoinHelperArtifact = require('./artifacts/BitcoinHelper.json');
const TypedMemViewArtifact = require('./artifacts/TypedMemView.json');
const ScriptTypesEnumArtifact = require('./artifacts/ScriptTypesEnum.json');

// Export artifacts
module.exports = {
  BitcoinHelper: BitcoinHelperArtifact,
  TypedMemView: TypedMemViewArtifact,
  ScriptTypesEnum: ScriptTypesEnumArtifact,

  // Helper function to get contract factory
  getContractFactory: (contractName, signer) => {
    const artifacts = {
      'BitcoinHelper': BitcoinHelperArtifact,
      'TypedMemView': TypedMemViewArtifact,
      'ScriptTypesEnum': ScriptTypesEnumArtifact
    };

    if (!artifacts[contractName]) {
      throw new Error(\`Contract \${contractName} not found\`);
    }

    // This would typically use ethers.js ContractFactory
    // For now, we'll return the artifact
    return artifacts[contractName];
  },

  // Export contract names
  contractNames: ['BitcoinHelper', 'TypedMemView', 'ScriptTypesEnum']
};
`;

  fs.writeFileSync(path.join(__dirname, '../index.js'), indexContent);
  console.log('✓ Created index.js');
}

// Function to create TypeScript definitions
function createTypeDefinitions() {
  const typesContent = `// Bitcoin Helper Library - TypeScript Definitions

export interface BitcoinHelperArtifact {
  contractName: string;
  abi: any[];
  bytecode: string;
  deployedBytecode: string;
  sourceMap: string;
  deployedSourceMap: string;
  metadata: string;
  compiler: any;
}

export interface TypedMemViewArtifact {
  contractName: string;
  abi: any[];
  bytecode: string;
  deployedBytecode: string;
  sourceMap: string;
  deployedSourceMap: string;
  metadata: string;
  compiler: any;
}

export interface ScriptTypesEnumArtifact {
  contractName: string;
  abi: any[];
  bytecode: string;
  deployedBytecode: string;
  sourceMap: string;
  deployedSourceMap: string;
  metadata: string;
  compiler: any;
}

export interface LibraryExports {
  BitcoinHelper: BitcoinHelperArtifact;
  TypedMemView: TypedMemViewArtifact;
  ScriptTypesEnum: ScriptTypesEnumArtifact;
  getContractFactory: (contractName: string, signer?: any) => any;
  contractNames: string[];
}

declare const exports: LibraryExports;
export = exports;
`;

  fs.writeFileSync(path.join(__dirname, '../index.d.ts'), typesContent);
  console.log('✓ Created index.d.ts');
}

// Main execution
console.log('Building artifacts for npm package...');

try {
  copyContractArtifacts();
  createIndexJS();
  createTypeDefinitions();

  console.log('✓ Build completed successfully!');
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}