# 🌌 REN_TECH_CORE_V10: Frontier Quantitative Research Engine

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)

**REN_TECH_CORE_V10** is a state-of-the-art, browser-based quantitative research terminal and Alpha mining engine. Designed to simulate the rigorous mathematical environments of Tier-1 Wall Street hedge funds and PhD-level quantitative research labs, this engine processes real-time L2 order book data to discover, optimize, and allocate non-linear trading signals (Alphas).

Unlike traditional factor-mining tools, this engine operates at the intersection of **Topological Data Analysis (TDA)**, **Information Geometry**, **Random Matrix Theory (RMT)**, and **Mean Field Games (MFG)**.

![Dashboard Preview](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop) *(Note: Replace with actual screenshot of the app)*

## 🔬 Core Mathematical Frameworks

This engine implements (via high-performance browser approximations) several cutting-edge mathematical models:

### 1. Topological Data Analysis (TDA) & Persistent Homology
Monitors the shape of the market microstructure manifold. It calculates Betti numbers ($\beta_0$ for connected components, $\beta_1$ for topological holes) to detect structural market crashes and phase transitions before they manifest in standard price action.

### 2. Information Geometry & Natural Gradient
Alpha candidate topologies are optimized not via standard SGD, but using **Amari's Natural Gradient Descent**. The parameter space is treated as a Riemannian manifold, preconditioned by the **Fisher Information Matrix** (Trace approximated), ensuring invariant and optimal learning steps regardless of parameterization.

### 3. Random Matrix Theory (RMT) & Free Probability
Calculates the empirical spectral density of the feature covariance matrix. It uses the **Marchenko-Pastur distribution** to separate true signal eigenvalues from bulk noise. Furthermore, it calculates the **Von Neumann Entropy** ($S = -Tr(\rho \ln \rho)$) of the market state to measure systemic information entanglement.

### 4. Mean Field Games (MFG) & Crowding
Models the interaction of massive numbers of market participants. By solving simulated Fokker-Planck equations, it estimates a "Crowding Density" ($\mu_{MFG}$). Alpha candidates face non-linear PnL penalties based on this density, driving the portfolio towards a true Nash Equilibrium rather than naive historical overfitting.

### 5. Distributionally Robust Optimization (DRO)
Portfolio allocation abandons standard Markowitz mean-variance. Instead, it utilizes DRO with a **Wasserstein Ambiguity Set**. Candidates are penalized based on their Wasserstein distance from the empirical measure, ensuring robust performance even under severe distribution shifts (e.g., Jump-Diffusion regimes).

### 6. Neuro-Symbolic Alpha Generation
Combines the universal approximation power of deep learning (Tensor-Train RNNs, Rough Path Signatures) with symbolic regression. The engine outputs explicit, human-readable mathematical expressions (e.g., `sin(λ_HWK) ⊗ ⟨H_RST⟩`), bridging the gap between black-box AI and interpretable quantitative finance.

## 📡 Data Ingestion

The engine connects directly to the **Binance WebSocket API** (`wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms`), processing high-frequency Level 2 order book updates (100ms intervals) to construct its microstructural filtration ($\mathcal{F}_t$).

### Extracted Features ($\mathcal{X}$)
- `λ_HWK`: Hawkes Process Self-Excitation Intensity
- `Λ_KYL`: Kyle's Lambda (Market Impact)
- `H_RST`: Hurst Exponent (Rough Volatility proxy)
- `ρ_PIN`: Probability of Informed Trading
- `Σ_PV`: Rough Path Signature (Price-Volume Lévy Area)
- `S_VNE`: Von Neumann Entropy
- *...and 13 other high-order statistical moments.*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ren-tech-core.git
   cd ren-tech-core
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`. The engine will automatically connect to the Binance WebSocket and begin the Alpha mining process.

## 🖥️ UI Architecture

The interface is designed for extreme information density, utilizing a dark, terminal-inspired aesthetic common in institutional environments.
- **Top Bar**: Global risk metrics (Fisher Trace, Von Neumann Entropy, Ensemble Sharpe) and active Regime detection.
- **Left Panel**: Real-time Manifold Feature states and RMT Spectral Density visualization.
- **Center Panel**: Information Geometry loss landscapes and the active Neuro-Symbolic Attention Manifold (Stochastic Trajectories).
- **Right Panel**: DRO Portfolio Allocation and real-time SPDE Control Logs.

## ⚠️ Disclaimer

**FOR ACADEMIC AND RESEARCH PURPOSES ONLY.** 
This software is a highly advanced simulation and visualization tool. While it connects to real market data and utilizes mathematically rigorous concepts, the calculations are optimized for browser execution and rely on proxy approximations. It does **not** constitute financial advice, and should **not** be used for live trading with real capital without a dedicated, low-latency C++/Rust backend execution engine.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---
*“In markets, as in physics, the truth is often found in the geometry of the noise.”*
