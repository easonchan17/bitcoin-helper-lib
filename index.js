// Bitcoin Helper Library - Generated Index
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
      throw new Error(`Contract ${contractName} not found`);
    }

    // This would typically use ethers.js ContractFactory
    // For now, we'll return the artifact
    return artifacts[contractName];
  },

  // Export contract names
  contractNames: ['BitcoinHelper', 'TypedMemView', 'ScriptTypesEnum']
};
