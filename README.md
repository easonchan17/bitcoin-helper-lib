# Bitcoin Helper Library

A comprehensive Solidity library for Bitcoin-related operations and utilities, forked and optimized from [TeleportDAO's Bitcoin<>EVM Bridge](https://github.com/TeleportDAO/btc-evm-bridge-contracts).

## 📋 Overview

This library is a streamlined version of the Bitcoin parsing and utility functions from the TeleportDAO bridge contracts. We've extracted and optimized the core Bitcoin helper functionality while removing the bridge-specific components, making it a lightweight, focused library for Bitcoin operations in Solidity.

## 🎯 Features

- **Bitcoin Transaction Parsing**: Complete parsing utilities for Bitcoin transactions
- **Typed Memory Views**: Efficient memory management for Bitcoin data structures
- **Compact Integer Handling**: Bitcoin's variable-length integer encoding/decoding
- **Transaction ID Calculation**: Bitcoin-style double SHA256 hashing
- **Script Type Support**: Comprehensive Bitcoin script type definitions
- **Memory-Efficient Operations**: Optimized for gas usage and performance

## 📦 Installation

```bash
yarn add bitcoin-helper-lib
```

or

```bash
npm install bitcoin-helper-lib
```

## 🚀 Usage

### Solidity Import

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "bitcoin-helper-lib/contracts/libraries/BitcoinHelper.sol";
import "bitcoin-helper-lib/contracts/libraries/TypedMemView.sol";
import "bitcoin-helper-lib/contracts/types/ScriptTypesEnum.sol";

contract MyBitcoinContract {
    using BitcoinHelper for *;

    function calculateBitcoinTxId(bytes memory txData) public pure returns (bytes32) {
        return BitcoinHelper.calculateTxId(txData);
    }

    function extractOutpointInfo(bytes memory vin, uint index) public pure returns (bytes32 txId, uint outputIndex) {
        return BitcoinHelper.extractOutpoint(vin, index);
    }
}
```

### JavaScript/TypeScript Usage

```javascript
const { BitcoinHelper, TypedMemView } = require('bitcoin-helper-lib');

// Access contract artifacts
console.log(BitcoinHelper.abi);
console.log(BitcoinHelper.bytecode);
```

```typescript
import { BitcoinHelper, TypedMemView } from 'bitcoin-helper-lib';

// TypeScript support with full type definitions
const bitcoinHelperArtifact: BitcoinHelperArtifact = BitcoinHelper;
```

## 📚 API Reference

### BitcoinHelper Library

#### Core Functions

- `calculateTxId(bytes memory _tx) → bytes32`: Calculate Bitcoin transaction ID using double SHA256
- `extractOutpoint(bytes memory _vin, uint _index) → (bytes32, uint)`: Extract outpoint info from transaction input
- `reverseBytes32(bytes32 _input) → bytes32`: Reverse byte order (Bitcoin uses little-endian)
- `indexCompactInt(bytes29 memView, uint256 _index) → uint64`: Read compact integer from memory view

#### Bitcoin Type System

The library includes a comprehensive type system for Bitcoin data structures:

```solidity
enum BTCTypes {
    Unknown,            // 0x0
    CompactInt,         // 0x1
    ScriptSig,          // 0x2
    Outpoint,           // 0x3
    TxIn,               // 0x4
    Vin,                // 0x6
    ScriptPubkey,       // 0x7
    TxOut,              // 0xd
    Vout,               // 0xf
    Header,             // 0x10
    // ... and more
}
```

### TypedMemView Library

Efficient memory management for Bitcoin data structures:

- `ref(bytes memory _b, uint40 _newType) → bytes29`: Create typed memory view
- `assertType(bytes29 memView, uint40 _expected)`: Type assertion
- `index(bytes29 memView, uint256 _index, uint256 _bytes) → bytes29`: Index into memory view

## 🔧 Development

### Prerequisites
- Node.js 18+
- Yarn or npm

### Setup
```bash
git clone https://github.com/easonchan17/bitcoin-helper-lib.git
cd bitcoin-helper-lib
yarn install
```

### Compile
```bash
yarn compile
```

### Test
```bash
yarn test
```

### Build for Publishing
```bash
yarn build
```

## 📖 Original Source

This library is forked from [TeleportDAO's Bitcoin<>EVM Bridge](https://github.com/TeleportDAO/btc-evm-bridge-contracts), a trustless protocol that makes Bitcoin data accessible on EVM chains. We've extracted and optimized the Bitcoin helper functionality while removing bridge-specific components.

### What We've Done

- ✅ **Extracted Core Bitcoin Functions**: Preserved all Bitcoin parsing and utility functions
- ✅ **Optimized for Library Use**: Removed bridge-specific logic and dependencies
- ✅ **Maintained Full Functionality**: All Bitcoin helper features are intact
- ✅ **Improved Documentation**: Enhanced API documentation and usage examples
- ✅ **Streamlined Structure**: Focused on library use cases

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TeleportDAO Team**: Original Bitcoin<>EVM bridge implementation
- **Bitcoin Community**: For the Bitcoin protocol specifications
- **OpenZeppelin**: For SafeCast utilities

## 🔗 Links

- **npm Package**: https://www.npmjs.com/package/bitcoin-helper-lib
- **GitHub Repository**: https://github.com/easonchan17/bitcoin-helper-lib
- **Original Source**: https://github.com/TeleportDAO/btc-evm-bridge-contracts

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ for the Bitcoin and Ethereum communities**