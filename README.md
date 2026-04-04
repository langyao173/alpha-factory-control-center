# DeepQuant: Neuro-Symbolic Alpha Synthesis Engine (v1.1)

DeepQuant is a cutting-edge, browser-based quantitative trading research platform. It ingests live, high-frequency order book data (currently configured for Binance BTC/USDT) and synthesizes trading alphas using advanced mathematical frameworks. 

This project bridges the gap between abstract mathematical theories (like Topological Data Analysis and Information Geometry) and practical, real-time market microstructure analysis.

## What's New in V1.1

Version 1.1 brings significant stability improvements and new real-time visualization capabilities:

*   **Real-time Order Flow Imbalance (OFI) Visualization:** A new dynamic bar and historical sparkline have been integrated into the Tensor Alpha Synthesis section, allowing for immediate visual feedback on micro-structural buying/selling pressure.
*   **Robust SHAP Explainer:** Fixed a critical bug where the Local SHAP Explainer waterfall chart would fail to render. The promotion logic for Alpha candidates has been optimized (lowered threshold) to ensure the Distributionally Robust Optimization (DRO) portfolio populates rapidly upon initialization.
*   **Global NaN Immunity:** Implemented comprehensive NaN protection across feature normalization, SHAP value accumulation, and UI rendering logic. This ensures the engine remains stable and continues to render even during extreme market volatility or anomalies in the data feed.
*   **Live Filtration Indicator:** Upgraded the $\mathcal{F}_t$ (Filtration) badge with a live, pulsing indicator to clearly communicate the active ingestion of the Binance WebSocket stream.
*   **Enhanced Risk Metrics:** Added Conditional Value at Risk (CVaR 95%) and Conditional Full Value at Risk (CFVaR 99%) to the global header for deeper tail-risk monitoring.

## Core Mathematical Frameworks

DeepQuant is built upon several advanced mathematical pillars, all computed in real-time within the browser:

### 1. Market Microstructure Features
The engine calculates high-frequency features directly from the L2 order book and trade stream:
*   **Hawkes Processes ($\lambda_{HWK}$):** Models the self-exciting nature of trades (trade clustering).
*   **Kyle's Lambda ($\Lambda_{KYL}$):** Measures market impact and liquidity depth.
*   **Hurst Exponent ($H_{RST}$):** Detects long-term memory or mean-reverting properties in the price series.
*   **Probability of Informed Trading ($\rho_{PIN}$):** Estimates the presence of informed traders based on order flow imbalance.
*   **Order Flow Imbalance ($\Phi_{OFI}$):** Tracks the net pressure of limit order additions and cancellations at the best bid and ask.

### 2. Topological Data Analysis (TDA)
Instead of just looking at time series, DeepQuant looks at the *shape* of the market data:
*   **Betti Numbers ($\beta_0, \beta_1$):** Calculates the persistent homology of the feature space. $\beta_0$ represents connected components (market regimes), while $\beta_1$ represents topological "holes" or cycles (arbitrage opportunities or structural inefficiencies).

### 3. Mean Field Games (MFG) & DRO
To construct a portfolio, the engine doesn't just look at expected returns; it models the market as a game:
*   **MFG Nash Equilibrium:** Evaluates how "crowded" a specific alpha signal is. Signals that are too correlated with the broader market behavior receive a crowding penalty.
*   **Distributionally Robust Optimization (DRO):** Uses the Wasserstein distance to ensure the portfolio allocation is robust against small perturbations in the underlying data distribution.

### 4. Information Geometry & Free Probability
*   **Natural Gradient Descent:** Optimizes the attention weights of the Alpha candidates using the Fisher Information Matrix, ensuring optimization happens on the statistical manifold rather than Euclidean space.
*   **Von Neumann Entropy ($S_{VNE}$):** Measures the quantum-like entanglement of the feature correlation matrix. High entropy indicates a highly complex, unpredictable market state.

### 5. Explainable AI (XAI)
*   **Local SHAP Values:** Uses Shapley Additive Explanations to break down exactly *why* a specific Alpha candidate is generating its current prediction, rendered as a real-time waterfall chart.

## Technical Architecture

*   **Frontend Framework:** React 19 with TypeScript.
*   **Styling:** Tailwind CSS for a highly customized, terminal-inspired dark mode UI.
*   **Visualization:** Recharts for performant, real-time SVG charting (Area, Line, Bar, and Composed charts).
*   **Data Source:** Native WebSocket connection to Binance (`wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms`).
*   **State Management:** React Hooks (`useState`, `useEffect`, `useRef`) combined with a custom `useDeepQuantEngine` hook that encapsulates the entire mathematical simulation loop.

## Installation & Usage

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  Open your browser to the local URL provided by Vite (typically `http://localhost:3000`). The engine will automatically connect to the Binance WebSocket and begin synthesizing Alphas.

## Disclaimer

**For Educational and Research Purposes Only.** 
DeepQuant is a theoretical simulation engine. The mathematical models (TDA, MFG, Information Geometry) implemented here are simplified approximations designed to run in a browser environment. They do not constitute financial advice, and the generated "Alpha Candidates" should not be used for actual trading with real capital. Cryptocurrency markets are highly volatile and risky.

## License

This project is open-sourced under the MIT License.
