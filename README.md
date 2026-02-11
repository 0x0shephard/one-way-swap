# RemitLink - One-Way USDC to dPKR Swap

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-brightgreen.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff.svg)

A decentralized one-way remittance bridge that allows users to convert USDC to dPKR (Digital Pakistani Rupees) using live Chainlink price feeds. Built on Ethereum Sepolia testnet.

## 🌟 Features

- **One-Way Swap**: Convert USDC to dPKR at live market rates
- **Chainlink Oracle Integration**: Real-time USD/PKR exchange rates
- **Smart Contract Powered**: Fully decentralized and trustless
- **Web3 Wallet Support**: MetaMask, Coinbase Wallet, WalletConnect
- **Test USDC Minting**: Easy testing on Sepolia testnet
- **Transaction History**: View all your swaps on-chain
- **Responsive UI**: Beautiful dark mode design

## 🚀 Live Demo

Visit the live application: [RemitLink](https://one-way-swap.vercel.app) _(if deployed)_

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Smart Contracts](#-smart-contracts)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **RainbowKit** - Wallet connection UI
- **React Router** - Navigation

### Blockchain
- **Solidity** - Smart contract language
- **Chainlink Price Feeds** - Real-time price data
- **Sepolia Testnet** - Ethereum test network

## 📝 Smart Contracts

All contracts are deployed on **Sepolia Testnet**:

| Contract | Address | Purpose |
|----------|---------|---------|
| **RemittancePortal** | `0xeee44e9802Cd94Cc2D800D70532F72475aE2Cf7a` | Main swap contract |
| **PKRToken (dPKR)** | `0xCA906d0Eaa9Af7EB71F4BF3f126868c4bED8954d` | ERC-20 Digital Rupee token |
| **Mock USDC** | `0x51cD6a98e8D29500d99798Ef95B18EcbA2CD31d3` | Test USDC token |
| **Price Feed** | `0x0f610f492a9C8817C2fdb786C1b72217A6ff5fb2` | Chainlink USD/PKR oracle |

### Contract Features

- ✅ **Non-custodial**: Users maintain full control of their funds
- ✅ **One-way only**: No reverse swaps from dPKR to USDC
- ✅ **Oracle-based pricing**: Uses Chainlink for reliable price data
- ✅ **Fee mechanism**: Configurable protocol fee (default 0.1%)
- ✅ **Admin controls**: Owner can manage fees, oracle, and withdraw liquidity

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or another Web3 wallet
- Sepolia ETH for gas fees ([Get from faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/0x0shephard/one-way-swap.git
cd one-way-swap
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📖 Usage

### 1. Connect Wallet
- Click "Connect Wallet" in the sidebar or header
- Select your wallet (MetaMask, Coinbase, WalletConnect)
- Approve the connection
- Ensure you're on Sepolia network

### 2. Get Test USDC
- Navigate to "Mint USDC" page
- Click a quick mint button (100, 500, 1000, 5000)
- OR enter a custom amount
- Confirm transaction in wallet
- Wait for confirmation (~10 seconds)

### 3. Swap USDC for dPKR
- Navigate to "Swap" page
- Enter the amount of USDC to swap
- Click "Approve USDC" (first time only)
- Confirm approval in wallet
- Click "Swap USDC for dPKR"
- Confirm swap in wallet
- Success! dPKR appears in your wallet

### 4. View Transaction History
- Navigate to "Wallet" page
- See your USDC and dPKR balances
- Scroll down to view transaction history
- Click transaction links to view on Etherscan

## 📁 Project Structure

```
one-way-swap/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx           # Navigation sidebar
│   │   ├── modals/
│   │   │   ├── ErrorModal.jsx        # Error display
│   │   │   ├── ProcessingModal.jsx   # Transaction processing
│   │   │   └── SuccessModal.jsx      # Success confirmation
│   │   └── ConnectGuard.jsx          # Wallet connection guard
│   ├── hooks/
│   │   └── useContracts.js           # All Web3 hooks
│   ├── pages/
│   │   ├── WalletOnboarding.jsx      # Landing page
│   │   ├── SwapDashboard.jsx         # Main swap interface
│   │   ├── WalletHistory.jsx         # Balance & history
│   │   ├── MintUSDC.jsx              # Test USDC minting
│   │   └── ProtocolAdmin.jsx         # Admin panel (unused)
│   ├── utils/
│   │   ├── contracts.js              # Contract addresses & ABIs
│   │   └── mockData.js               # Test data
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   ├── wagmi.js                      # Wagmi configuration
│   └── index.css                     # Global styles
├── public/
├── COMPLETION_SUMMARY.md             # Implementation summary
├── FIXES_APPLIED.md                  # Bug fixes documentation
├── HOOKS_INTEGRATION.md              # Hooks reference guide
├── MINT_PAGE_UPDATE.md               # Mint page documentation
├── QUICK_START.md                    # Quick start guide
└── README.md                         # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🎨 Pages

### 1. **Onboarding** (`/`)
Landing page with wallet connection prompt

### 2. **Swap** (`/swap`)
Main interface for swapping USDC to dPKR
- Live exchange rate display
- Swap preview with fees
- Two-step process (Approve → Swap)
- Real-time balance updates

### 3. **Wallet** (`/wallet`)
View balances and transaction history
- USDC balance
- dPKR balance
- Complete transaction history from blockchain
- Etherscan links for verification

### 4. **Mint USDC** (`/mint`)
Get test USDC for Sepolia testnet
- Quick mint buttons (100, 500, 1000, 5000)
- Custom amount input
- Balance display

## 🔐 Security Features

- ✅ Non-custodial architecture
- ✅ Open-source smart contracts
- ✅ Chainlink oracle for price feeds
- ✅ Two-step approval process
- ✅ Clear transaction previews
- ✅ Error handling and user feedback

## 🌐 Network Support

Currently deployed on:
- **Sepolia Testnet** (Ethereum)

## 📚 Documentation

- [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) - Complete implementation overview
- [HOOKS_INTEGRATION.md](./HOOKS_INTEGRATION.md) - Detailed hooks documentation
- [QUICK_START.md](./QUICK_START.md) - User guide
- [FIXES_APPLIED.md](./FIXES_APPLIED.md) - Bug fixes and improvements
- [MINT_PAGE_UPDATE.md](./MINT_PAGE_UPDATE.md) - Mint page implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chainlink](https://chain.link/) - Decentralized oracle network
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection library
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📞 Contact

Project Link: [https://github.com/0x0shephard/one-way-swap](https://github.com/0x0shephard/one-way-swap)

---

**Note**: This is a testnet application for demonstration purposes. USDC and dPKR tokens on Sepolia have no real value.
