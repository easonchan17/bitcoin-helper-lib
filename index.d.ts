// Bitcoin Helper Library - TypeScript Definitions

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
