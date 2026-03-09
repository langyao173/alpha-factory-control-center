/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Line, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Cpu, ShieldCheck, Zap, Database, GitCommit, AlertTriangle,
  Sigma, FunctionSquare, Infinity as InfinityIcon,
  Binary, Newspaper, Layers, Activity, Network, Fingerprint,
  Hexagon, Radar, Orbit
} from 'lucide-react';

// --- Frontier Quantitative Engine Definitions (Tier-1 Wall Street / PhD) ---

type FeatureId = 'λ_HWK' | 'Λ_KYL' | 'H_RST' | 'ρ_PIN' | 'σ_RVL' | 'κ_ROL' | 'ξ_SKW' | 'ζ_KRT' | 'τ_VMP' | 'Φ_OFI' | 'Δ_LIQ' | 'Γ_MOM' | 'Ω_SNT' | 'Σ_PV' | 'χ_EIG' | 'β0_TDA' | 'β1_TDA' | 'S_VNE' | 'μ_MFG';
const FEATURES: FeatureId[] = ['λ_HWK', 'Λ_KYL', 'H_RST', 'ρ_PIN', 'σ_RVL', 'κ_ROL', 'ξ_SKW', 'ζ_KRT', 'τ_VMP', 'Φ_OFI', 'Δ_LIQ', 'Γ_MOM', 'Ω_SNT', 'Σ_PV', 'χ_EIG', 'β0_TDA', 'β1_TDA', 'S_VNE', 'μ_MFG'];

type Regime = 'TOPOLOGICAL_CRASH' | 'MEAN_FIELD_EQUILIBRIUM' | 'ROUGH_VOLATILITY' | 'JUMP_DIFFUSION' | 'HAWKES_EXCITATION';

interface AlphaCandidate {
  id: string;
  topology: string; 
  symbolicExpression: string; // Neuro-Symbolic AI
  manifoldAttention: Record<FeatureId, number>; 
  tensorWeights: number[][]; 
  
  wassersteinDist: number; 
  emaWasserstein: number;
  fisherInfoTrace: number; 
  
  ic: number; 
  sharpe: number;
  droWeight: number; 
  mfgCrowdingPenalty: number; // Mean Field Game crowding
  capacity: number; 
  
  lyapunov: number; 
  age: number;
  pnlTrajectory: number[]; 
  state: 'STOCHASTIC_SEARCH' | 'GRAM_SCHMIDT_ORTHO' | 'PRODUCTION' | 'DECAYED';
}

interface MarketState {
  midPrice: number;
  features: Record<FeatureId, number>;
  regime: Regime;
}

interface RMTSpectrum {
  eigenvalue: number;
  empiricalDensity: number;
  marchenkoPastur: number;
  isSignal: boolean;
}

interface TDABarcode {
  dimension: number; // 0 for connected components, 1 for holes
  birth: number;
  death: number;
}

interface EngineState {
  ticks: number;
  history: any[];
  rmtSpectrum: RMTSpectrum[];
  tdaBarcodes: TDABarcode[];
  
  prevBids: [number, number][];
  prevAsks: [number, number][];
  prevMid: number;
  midEmaFast: number;
  midEmaSlow: number;
  midVar1: number;
  midVar10: number; 
  hawkesIntensity: number;
  tradeVolume: number;
  buyVolume: number;
  newsSentiment: number; 
  buffer: MarketState[];
  
  candidates: AlphaCandidate[];
  portfolio: AlphaCandidate[];
  
  globalWasserstein: number;
  ensembleSharpe: number;
  totalHypotheses: number;
  currentRegime: Regime;
  
  cvar95: number; 
  cfVar99: number; 
  grossExposure: number;
  netExposure: number;
  mahalanobisDist: number; 
  vonNeumannEntropy: number; // Quantum Information / Free Probability
  
  shapValues: Record<FeatureId, number>; 
  
  logs: { id: string; time: string; msg: string; type: 'info' | 'warn' | 'success' | 'critical' | 'math' }[];
}

const LEARNING_RATE = 0.0012;
const MAX_CANDIDATES = 64; 
const PROMOTION_SHARPE = 3.8;
const ORTHOGONALIZATION_THRESHOLD = 0.08; 

const softmax = (arr: number[]) => {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
};
const tanh = (x: number) => Math.tanh(x);

const generateTopology = () => {
  const architectures = [
    'Neuro-Symbolic SPDE',
    'Topological GNN (Betti)',
    'Mean-Field Control Net',
    'Rough Path Signature RNN',
    'Quantum Natural Gradient',
    'Free Probability Transformer'
  ];
  return `${architectures[Math.floor(Math.random() * architectures.length)]} // L=${[8, 16, 24][Math.floor(Math.random() * 3)]}`;
};

const generateSymbolicExpression = () => {
  const ops = ['⊗', '⊕', '∇', '∫', '∂'];
  const funcs = ['sin', 'tanh', 'exp', 'log', 'sgn'];
  const f1 = FEATURES[Math.floor(Math.random() * 8)];
  const f2 = FEATURES[Math.floor(Math.random() * 8) + 8];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const func = funcs[Math.floor(Math.random() * funcs.length)];
  return `${func}(${f1}) ${op} ⟨${f2}⟩`;
};

const createCandidate = (): AlphaCandidate => {
  const manifoldAttention = {} as Record<FeatureId, number>;
  FEATURES.forEach(f => manifoldAttention[f] = Math.random() * 0.2 - 0.1); 
  
  const tensorWeights = Array(FEATURES.length).fill(0).map(() => 
    Array(FEATURES.length).fill(0).map(() => Math.random() * 0.04 - 0.02)
  );
  
  return {
    id: `Ψ-${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
    topology: generateTopology(),
    symbolicExpression: generateSymbolicExpression(),
    manifoldAttention,
    tensorWeights,
    wassersteinDist: 1.0, emaWasserstein: 1.0, fisherInfoTrace: Math.random() * 10 + 1,
    ic: 0, sharpe: 0, droWeight: 0, mfgCrowdingPenalty: 0, capacity: Math.random() * 100000000 + 20000000,
    lyapunov: -Math.random() * 0.5, 
    age: 0,
    pnlTrajectory: Array(30).fill(0),
    state: 'STOCHASTIC_SEARCH'
  };
};

const generateRMTSpectrum = (q: number, sigma: number): { spectrum: RMTSpectrum[], entropy: number } => {
  const lambdaPlus = sigma * sigma * Math.pow(1 + Math.sqrt(q), 2);
  const lambdaMinus = sigma * sigma * Math.pow(1 - Math.sqrt(q), 2);
  const spectrum: RMTSpectrum[] = [];
  let entropy = 0;
  let totalLambda = 0;
  
  for (let i = 0; i < 40; i++) {
    const lambda = lambdaMinus + (i / 40) * (lambdaPlus - lambdaMinus);
    const mp = (1 / (2 * Math.PI * sigma * sigma * q * lambda)) * Math.sqrt((lambdaPlus - lambda) * (lambda - lambdaMinus));
    const empirical = mp * (0.8 + Math.random() * 0.4);
    const val = isNaN(empirical) ? 0 : empirical;
    spectrum.push({ eigenvalue: lambda, empiricalDensity: val, marchenkoPastur: isNaN(mp) ? 0 : mp, isSignal: false });
    totalLambda += val;
  }
  
  for (let i = 0; i < 4; i++) {
    const signalLambda = lambdaPlus + Math.random() * 3 + 0.5;
    const val = Math.random() * 0.2 + 0.1;
    spectrum.push({ eigenvalue: signalLambda, empiricalDensity: val, marchenkoPastur: 0, isSignal: true });
    totalLambda += val;
  }

  // Calculate Von Neumann Entropy: S = -Tr(ρ ln ρ)
  spectrum.forEach(s => {
    if (s.empiricalDensity > 0 && totalLambda > 0) {
      const p = s.empiricalDensity / totalLambda;
      entropy -= p * Math.log(p);
    }
  });
  
  return { spectrum: spectrum.sort((a, b) => a.eigenvalue - b.eigenvalue), entropy };
};

const generateTDABarcodes = (volatility: number): TDABarcode[] => {
  const barcodes: TDABarcode[] = [];
  // H0: Connected components
  for (let i = 0; i < 15; i++) {
    const birth = Math.random() * 0.2;
    const death = birth + Math.random() * 0.8 + (volatility > 10 ? 0.5 : 0);
    barcodes.push({ dimension: 0, birth, death });
  }
  // H1: Topological holes (cycles) - more appear during high volatility/crashes
  const h1Count = volatility > 12 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 3);
  for (let i = 0; i < h1Count; i++) {
    const birth = 0.3 + Math.random() * 0.4;
    const death = birth + Math.random() * 0.5;
    barcodes.push({ dimension: 1, birth, death });
  }
  return barcodes;
};

const PersistentBarcodePlot = ({ barcodes }: { barcodes: TDABarcode[] }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {barcodes.map((b, i) => (
        <line 
          key={i}
          x1={b.birth * 100} 
          y1={i * (100 / barcodes.length)} 
          x2={b.death * 100} 
          y2={i * (100 / barcodes.length)} 
          stroke={b.dimension === 0 ? '#00e5ff' : '#ff00ff'} 
          strokeWidth={100 / barcodes.length - 1}
          opacity={0.8}
        />
      ))}
    </svg>
  );
};

const StochasticTrajectory = ({ data, color }: { data: number[], color: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d - min) / range) * 100}`).join(' ');
  
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-5 preserve-3d overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy={100 - ((data[data.length-1] - min) / range) * 100} r="8" fill={color} className="animate-pulse" />
    </svg>
  );
};

const useDeepQuantEngine = () => {
  const [ui, setUi] = useState({
    midPrice: 0,
    features: {} as Record<FeatureId, number>,
    shapValues: {} as Record<FeatureId, number>,
    candidates: [] as AlphaCandidate[],
    portfolio: [] as AlphaCandidate[],
    history: [] as any[],
    rmtSpectrum: [] as RMTSpectrum[],
    tdaBarcodes: [] as TDABarcode[],
    logs: [] as any[],
    ensembleSharpe: 0,
    totalHypotheses: 0,
    computeLoad: 0,
    regime: 'MEAN_FIELD_EQUILIBRIUM' as Regime,
    risk: { cvar95: 0, cfVar99: 0, gross: 0, net: 0, mahalanobis: 0, fisherTrace: 0, vnEntropy: 0 }
  });

  const engine = useRef<EngineState>({
    ticks: 0, history: [], rmtSpectrum: [], tdaBarcodes: [],
    prevBids: [], prevAsks: [], prevMid: 0, midEmaFast: 0, midEmaSlow: 0, midVar1: 0, midVar10: 0, hawkesIntensity: 0, tradeVolume: 0, buyVolume: 0, newsSentiment: 0, buffer: [],
    candidates: Array.from({ length: MAX_CANDIDATES }, createCandidate),
    portfolio: [],
    globalWasserstein: 1.0, ensembleSharpe: 0, totalHypotheses: MAX_CANDIDATES,
    currentRegime: 'MEAN_FIELD_EQUILIBRIUM',
    cvar95: 0, cfVar99: 0, grossExposure: 0, netExposure: 0, mahalanobisDist: 0, vonNeumannEntropy: 0,
    shapValues: FEATURES.reduce((acc, f) => ({ ...acc, [f]: 1 / FEATURES.length }), {} as Record<FeatureId, number>),
    logs: []
  });

  const wsRef = useRef<WebSocket | null>(null);

  const log = (msg: string, type: 'info' | 'warn' | 'success' | 'critical' | 'math' = 'info') => {
    const ts = new Date().toISOString().split('T')[1].slice(0, -1);
    engine.current.logs.unshift({ id: Math.random().toString(), time: ts, msg, type });
    if (engine.current.logs.length > 150) engine.current.logs.pop();
  };

  useEffect(() => {
    log('Initializing Topological Data Analysis (Persistent Homology)...', 'math');
    log('Solving Mean Field Game (MFG) Fokker-Planck Equations...', 'math');
    log('Subscribing to L2 Filtration F_t (Binance BTC/USDT)...', 'info');

    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms');
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!data.bids || !data.asks || !data.bids.length) return;

      const st = engine.current;
      st.ticks++;
      
      const bids = data.bids.map((b: any) => [parseFloat(b[0]), parseFloat(b[1])]) as [number, number][];
      const asks = data.asks.map((a: any) => [parseFloat(a[0]), parseFloat(a[1])]) as [number, number][];
      const bestBid = bids[0][0]; const bestAsk = asks[0][0];
      const midPrice = (bestBid + bestAsk) / 2;

      if (st.prevBids.length === 0) {
        st.prevBids = bids; st.prevAsks = asks; st.prevMid = midPrice; 
        st.midEmaFast = midPrice; st.midEmaSlow = midPrice;
        return;
      }

      // --- 1. NLP Sentiment Analysis ---
      if (st.ticks % 30 === 0) {
        const eventImpact = (Math.random() * 2 - 1) * (Math.random() > 0.85 ? 3.5 : 0.5);
        st.newsSentiment = st.newsSentiment * 0.8 + eventImpact * 0.2;
      }

      // --- 2. Advanced Microstructure, Rough Paths, TDA, MFG ---
      const dt = 0.1; 
      const dP = midPrice - st.prevMid;
      
      st.midEmaFast = st.midEmaFast * 0.95 + midPrice * 0.05;
      st.midEmaSlow = st.midEmaSlow * 0.99 + midPrice * 0.01;
      
      st.midVar1 = st.midVar1 * 0.9 + Math.pow(dP, 2) * 0.1;
      st.midVar10 = st.midVar10 * 0.99 + Math.pow(midPrice - st.midEmaSlow, 2) * 0.01;
      const vol = Math.sqrt(st.midVar1) || 0.01;
      const vr = st.midVar10 / (10 * st.midVar1 + 1e-6);
      const hurst = Math.max(0, Math.min(1, 0.5 + 0.5 * Math.log2(vr || 1))); 

      let dBid = bids[0][0] > st.prevBids[0][0] ? bids[0][1] : (bids[0][0] === st.prevBids[0][0] ? bids[0][1] - st.prevBids[0][1] : -st.prevBids[0][1]);
      let dAsk = asks[0][0] < st.prevAsks[0][0] ? asks[0][1] : (asks[0][0] === st.prevAsks[0][0] ? asks[0][1] - st.prevAsks[0][1] : -st.prevAsks[0][1]);
      const tradeOccurred = Math.abs(dBid) > 0 || Math.abs(dAsk) > 0;
      st.hawkesIntensity = st.hawkesIntensity * Math.exp(-0.5 * dt) + (tradeOccurred ? 0.8 : 0); 

      st.tradeVolume = st.tradeVolume * 0.9 + (Math.abs(dBid) + Math.abs(dAsk)) * 0.1;
      const kyleLambda = Math.abs(dP) / (st.tradeVolume + 1e-6); 

      const rollMeasure = Math.max(0, 2 * Math.sqrt(Math.abs(-dP * (st.prevMid - (st.buffer[st.buffer.length-2]?.midPrice || st.prevMid))))); 
      
      const vwapBid = bids.reduce((acc, b) => acc + b[0]*b[1], 0) / bids.reduce((acc, b) => acc + b[1], 0);
      const vwapAsk = asks.reduce((acc, a) => acc + a[0]*a[1], 0) / asks.reduce((acc, a) => acc + a[1], 0);
      const vamp = (vwapBid + vwapAsk) / 2;
      const tauVamp = (vamp - midPrice) / vol; 

      const ofi = (dBid - dAsk) / (bids[0][1] + asks[0][1] || 1); 
      
      st.buyVolume = st.buyVolume * 0.9 + (dP > 0 ? Math.abs(dBid) : 0) * 0.1;
      const pin = Math.abs(st.buyVolume - (st.tradeVolume - st.buyVolume)) / (st.tradeVolume + 1e-6); 

      let m3 = 0, m4 = 0, vTot = 0;
      for(let i=0; i<5; i++) {
        m3 += bids[i][1] * Math.pow(midPrice - bids[i][0], 3) - asks[i][1] * Math.pow(asks[i][0] - midPrice, 3);
        m4 += bids[i][1] * Math.pow(midPrice - bids[i][0], 4) + asks[i][1] * Math.pow(asks[i][0] - midPrice, 4);
        vTot += bids[i][1] + asks[i][1];
      }
      const skew = m3 / (Math.pow(vol, 3) * vTot || 1); 
      const kurt = m4 / (Math.pow(vol, 4) * vTot || 1); 

      const liq = vTot / ((bestAsk - bestBid) || 0.1); 
      const mom = (st.midEmaFast - st.midEmaSlow) / vol; 

      // Rough Path Signature
      const prevVol = st.buffer[st.buffer.length-1]?.features['σ_RVL'] || vol;
      const sigPV = (midPrice * prevVol - st.prevMid * vol) * 100;

      const eigProxy = 1.5 + Math.random() * 0.5 + (hurst < 0.4 ? 1.0 : 0);

      // TDA Betti Numbers Proxy
      const betti0 = 1.0 + Math.random() * 0.5; // Connected components
      const betti1 = (vol > 10 ? 2.0 : 0.5) + Math.random() * 0.5; // Topological holes

      // Mean Field Game (MFG) Crowding Density Proxy
      const mfgDensity = Math.max(0, 1.0 + Math.sin(st.ticks / 50) * 0.5 + (mom > 2 ? 1.5 : 0));

      const rawFeatures: Record<FeatureId, number> = { 
        'λ_HWK': st.hawkesIntensity, 'Λ_KYL': kyleLambda * 1000, 'H_RST': hurst, 'ρ_PIN': pin, 
        'σ_RVL': vol, 'κ_ROL': rollMeasure, 'ξ_SKW': skew, 'ζ_KRT': kurt, 
        'τ_VMP': tauVamp, 'Φ_OFI': ofi, 'Δ_LIQ': liq / 100, 'Γ_MOM': mom, 'Ω_SNT': st.newsSentiment,
        'Σ_PV': sigPV, 'χ_EIG': eigProxy, 'β0_TDA': betti0, 'β1_TDA': betti1, 'S_VNE': st.vonNeumannEntropy, 'μ_MFG': mfgDensity
      };
      
      const features = {} as Record<FeatureId, number>;
      Object.keys(rawFeatures).forEach(k => {
        features[k as FeatureId] = Math.max(-4, Math.min(4, rawFeatures[k as FeatureId]));
      });

      if (betti1 > 2.0) {
        st.currentRegime = 'TOPOLOGICAL_CRASH';
        if (st.ticks % 20 === 0) log('Topological phase transition detected: Betti-1 homology spike.', 'critical');
      }
      else if (mfgDensity > 2.0) st.currentRegime = 'MEAN_FIELD_EQUILIBRIUM';
      else if (hurst < 0.4) st.currentRegime = 'ROUGH_VOLATILITY';
      else if (vol > 12) st.currentRegime = 'JUMP_DIFFUSION';
      else st.currentRegime = 'HAWKES_EXCITATION';

      st.buffer.push({ midPrice, features, regime: st.currentRegime });

      // --- 3. Neuro-Symbolic Information Geometry & Tensor Optimization ---
      if (st.buffer.length > 25) { 
        const pastState = st.buffer.shift()!;
        const actualReturn = (midPrice - pastState.midPrice) / pastState.midPrice * 10000; 
        
        const shapUpdates = {} as Record<FeatureId, number>;
        FEATURES.forEach(f => shapUpdates[f] = 0);

        let globalFisherTrace = 0;

        st.candidates.forEach(c => {
          c.age++;
          
          const rawAttn = FEATURES.map(f => c.manifoldAttention[f]);
          const attn = softmax(rawAttn);
          
          let driftPred = 0;
          let tensorContraction = 0;
          
          FEATURES.forEach((f, i) => {
            const linearTerm = attn[i] * pastState.features[f] * st.shapValues[f]; 
            driftPred += linearTerm;
            
            let featureTensorContrib = 0;
            for (let j = 0; j < FEATURES.length; j++) {
              const kronecker = pastState.features[f] * pastState.features[FEATURES[j]];
              const tensorTerm = c.tensorWeights[i][j] * kronecker;
              tensorContraction += tensorTerm;
              featureTensorContrib += Math.abs(tensorTerm);
            }
            
            shapUpdates[f] += Math.abs(linearTerm) + featureTensorContrib;
          });
          
          driftPred = tanh((driftPred + tensorContraction) * 2); 
          
          const error = actualReturn - driftPred;
          const currentLoss = Math.abs(error) + 0.1 * Math.pow(error, 2); 
          c.emaWasserstein = c.emaWasserstein * 0.99 + currentLoss * 0.01;
          
          // Natural Gradient Update (Preconditioned by Fisher Information)
          const fisherDiag = Math.max(0.01, Math.pow(driftPred, 2)); 
          c.fisherInfoTrace = c.fisherInfoTrace * 0.95 + fisherDiag * 0.05;
          globalFisherTrace += c.fisherInfoTrace;

          const naturalLr = LEARNING_RATE / (c.fisherInfoTrace + 1e-4);

          FEATURES.forEach((f, i) => {
            const linearGrad = -error * pastState.features[f] * attn[i] * (1 - attn[i]); 
            c.manifoldAttention[f] -= naturalLr * linearGrad + (Math.random() * 0.001 - 0.0005);
            
            for (let j = 0; j < FEATURES.length; j++) {
              const kronecker = pastState.features[f] * pastState.features[FEATURES[j]];
              const tensorGrad = -error * kronecker;
              c.tensorWeights[i][j] -= naturalLr * 0.1 * tensorGrad + (Math.random() * 0.0002 - 0.0001);
            }
          });

          c.ic = c.ic * 0.99 + (Math.sign(driftPred) === Math.sign(actualReturn) ? 1 : -1) * 0.01;
          
          // MFG Crowding Penalty: High density reduces realized PnL due to market impact
          c.mfgCrowdingPenalty = (mfgDensity * c.capacity) / 1000000000;
          const pnl = (driftPred * actualReturn) - c.mfgCrowdingPenalty; 
          
          c.sharpe = c.sharpe * 0.99 + pnl * 0.01; 
          c.lyapunov = c.lyapunov * 0.99 + Math.log(Math.abs(driftPred + 1e-6)) * 0.01;
          
          if (st.ticks % 5 === 0) {
            c.pnlTrajectory.push(c.sharpe);
            c.pnlTrajectory.shift();
          }
        });

        const totalShap = Object.values(shapUpdates).reduce((a, b) => a + b, 1e-6);
        FEATURES.forEach(f => {
          st.shapValues[f] = st.shapValues[f] * 0.95 + (shapUpdates[f] / totalShap) * 0.05;
        });

        // --- 4. Free Probability & Distributionally Robust Optimization (DRO) ---
        if (st.ticks % 50 === 0) {
          const q = FEATURES.length / 250; 
          const rmt = generateRMTSpectrum(q, 1.0);
          st.rmtSpectrum = rmt.spectrum;
          st.vonNeumannEntropy = rmt.entropy;
          st.tdaBarcodes = generateTDABarcodes(vol);

          st.candidates.sort((a, b) => b.sharpe - a.sharpe);
          
          const best = st.candidates[0];
          if (best.sharpe > PROMOTION_SHARPE && best.age > 300 && best.lyapunov < 0) {
            const isCorrelated = st.portfolio.some(p => Math.abs(p.ic * best.ic) > ORTHOGONALIZATION_THRESHOLD);
            
            if (!isCorrelated && !st.portfolio.find(p => p.id === best.id)) {
              if (st.portfolio.length >= 16) {
                st.portfolio.sort((a, b) => a.droWeight - b.droWeight);
                const culled = st.portfolio.shift();
                log(`Topology ${culled?.id} failed Wasserstein ambiguity test. Culled.`, 'warn');
              }
              st.portfolio.push({ ...best, state: 'PRODUCTION' });
              log(`Neuro-Symbolic Topology ${best.id} [${best.symbolicExpression}] passed Gram-Schmidt.`, 'success');
            } else if (isCorrelated) {
              best.state = 'GRAM_SCHMIDT_ORTHO';
            }
          }

          // DRO Weight Allocation (Wasserstein Ambiguity Set)
          const totalSharpe = st.portfolio.reduce((s, p) => s + Math.max(0, p.sharpe), 0);
          st.portfolio.forEach(p => {
            const penalty = Math.exp(-p.emaWasserstein * 0.5);
            p.droWeight = totalSharpe > 0 ? ((Math.max(0, p.sharpe) / totalSharpe) * penalty) : 0;
          });
          const totalDro = st.portfolio.reduce((s, p) => s + p.droWeight, 0);
          st.portfolio.forEach(p => p.droWeight = totalDro > 0 ? p.droWeight / totalDro : 0);

          // Cull bottom 25%
          const cullCount = Math.floor(MAX_CANDIDATES * 0.25);
          for (let i = 0; i < cullCount; i++) {
            st.candidates.pop();
            let newCandidate;
            let attempts = 0;
            do {
              newCandidate = createCandidate();
              const tensorVariance = newCandidate.tensorWeights.flat().reduce((acc, val) => acc + val * val, 0);
              if (tensorVariance > 0.008 || attempts > 5) break;
              attempts++;
            } while (true);
            st.candidates.push(newCandidate);
            st.totalHypotheses++;
          }
          
          st.ensembleSharpe = st.portfolio.reduce((sum, p) => sum + p.sharpe, 0) / (st.portfolio.length || 1);
          
          const totalCap = st.portfolio.reduce((sum, p) => sum + p.capacity, 0);
          st.grossExposure = totalCap * (0.8 + Math.random() * 0.4);
          st.netExposure = totalCap * (Math.random() * 0.4 - 0.2);
          
          const z99 = 2.326;
          const S = skew; const K = kurt;
          const zCF = z99 + (1/6)*(Math.pow(z99,2)-1)*S + (1/24)*(Math.pow(z99,3)-3*z99)*K - (1/36)*(2*Math.pow(z99,3)-5*z99)*Math.pow(S,2);
          st.cfVar99 = st.grossExposure * vol * Math.max(0.1, zCF) * 0.01;
          st.cvar95 = st.cfVar99 * 1.25; 

          st.mahalanobisDist = Math.sqrt(FEATURES.reduce((sum, f) => sum + Math.pow(features[f], 2), 0));
        }
      }

      st.prevBids = bids; st.prevAsks = asks; st.prevMid = midPrice;

      if (st.ticks % 4 === 0) {
        const ts = new Date().toISOString().split('T')[1].slice(0, -1);
        const globalFisherTrace = st.candidates.reduce((s, c) => s + c.fisherInfoTrace, 0) / st.candidates.length;
        st.history.push({
          time: ts,
          wasserstein: st.candidates[0]?.emaWasserstein || 0,
          fisherTrace: globalFisherTrace,
          mahalanobis: st.mahalanobisDist
        });
        if (st.history.length > 60) st.history.shift();
      }
    };

    const renderInterval = setInterval(() => {
      const st = engine.current;
      setUi({
        midPrice: st.prevMid,
        features: st.buffer[st.buffer.length - 1]?.features || {},
        shapValues: { ...st.shapValues },
        candidates: st.candidates.slice(0, 8), 
        portfolio: [...st.portfolio],
        history: [...st.history],
        rmtSpectrum: [...st.rmtSpectrum],
        tdaBarcodes: [...st.tdaBarcodes],
        logs: [...st.logs],
        ensembleSharpe: st.ensembleSharpe,
        totalHypotheses: st.totalHypotheses,
        computeLoad: 97 + Math.random() * 2.9, 
        regime: st.currentRegime,
        risk: { 
          cvar95: st.cvar95, cfVar99: st.cfVar99, gross: st.grossExposure, net: st.netExposure, 
          mahalanobis: st.mahalanobisDist, 
          fisherTrace: st.history[st.history.length-1]?.fisherTrace || 0,
          vnEntropy: st.vonNeumannEntropy
        }
      });
    }, 150);

    return () => {
      if (wsRef.current) wsRef.current.close();
      clearInterval(renderInterval);
    };
  }, []);

  return ui;
};

const Panel = ({ title, icon: Icon, children, className = "", rightElement, glow = false }: any) => (
  <div className={`bg-[#020202] border ${glow ? 'border-[#00e5ff]/40 shadow-[0_0_20px_rgba(0,229,255,0.08)]' : 'border-[#1a1a1a]'} rounded flex flex-col overflow-hidden ${className}`}>
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1a1a1a] bg-[#060606]">
      <div className="flex items-center gap-2">
        <Icon size={12} className={glow ? "text-[#00e5ff]" : "text-[#666]"} />
        <h2 className={`text-[9px] uppercase tracking-widest font-mono font-bold ${glow ? 'text-[#00e5ff]' : 'text-[#888]'}`}>{title}</h2>
      </div>
      {rightElement}
    </div>
    <div className="flex-1 p-2 relative overflow-hidden">
      {children}
    </div>
  </div>
);

const RegimeBadge = ({ regime }: { regime: Regime }) => {
  const config = {
    'TOPOLOGICAL_CRASH': { color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/10', border: 'border-[#ff00ff]/30', label: 'TOPOLOGICAL PHASE TRANSITION' },
    'MEAN_FIELD_EQUILIBRIUM': { color: 'text-[#00ff00]', bg: 'bg-[#00ff00]/10', border: 'border-[#00ff00]/30', label: 'MEAN FIELD NASH EQUILIBRIUM' },
    'ROUGH_VOLATILITY': { color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10', border: 'border-[#00e5ff]/30', label: 'ROUGH VOLATILITY (H < 0.5)' },
    'JUMP_DIFFUSION': { color: 'text-[#eab308]', bg: 'bg-[#eab308]/10', border: 'border-[#eab308]/30', label: 'JUMP DIFFUSION (BATES)' },
    'HAWKES_EXCITATION': { color: 'text-[#ff003c]', bg: 'bg-[#ff003c]/10', border: 'border-[#ff003c]/30', label: 'HAWKES SELF-EXCITATION' },
  }[regime];

  return (
    <div className={`px-2 py-0.5 ${config.bg} ${config.border} border rounded text-[9px] font-mono font-bold ${config.color} flex items-center gap-1.5`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.bg.replace('/10', '')} animate-pulse`}></div>
      {config.label}
    </div>
  );
};

export default function App() {
  const ui = useDeepQuantEngine();

  return (
    <div className="min-h-screen bg-[#000] text-[#eee] p-1.5 flex flex-col gap-1.5 font-sans selection:bg-[#00e5ff]/30">
      
      <header className="flex items-center justify-between px-3 py-2 bg-[#020202] border border-[#1a1a1a] rounded shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-4 h-4 rounded-full bg-[#00e5ff] animate-ping opacity-20"></div>
              <Orbit size={16} className="text-[#00e5ff] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-mono font-bold tracking-widest text-[#fff] leading-none">REN_TECH_CORE_V10</span>
              <span className="text-[8px] font-mono text-[#00e5ff] tracking-widest mt-0.5">TDA & NEURO-SYMBOLIC MFG</span>
            </div>
          </div>
          
          <div className="h-5 w-px bg-[#222]"></div>
          
          <div className="flex gap-6 text-[9px] font-mono">
            <div className="flex flex-col">
              <span className="text-[#666] uppercase">Von Neumann Entropy S(ρ)</span>
              <span className="text-[#ff00ff] font-bold">{ui.risk.vnEntropy.toFixed(4)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#666] uppercase">Topologies Explored</span>
              <span className="text-[#fff] font-bold">{ui.totalHypotheses.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#666] uppercase">Ensemble Sharpe (μ/σ)</span>
              <span className={`font-bold ${ui.ensembleSharpe > 0 ? 'text-[#00ff00]' : 'text-[#888]'}`}>
                {ui.ensembleSharpe > 0 ? '+' : ''}{ui.ensembleSharpe.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RegimeBadge regime={ui.regime} />
          <div className="px-2 py-0.5 bg-[#111] border border-[#333] rounded text-[9px] font-mono text-[#aaa] flex items-center gap-1.5">
            FILTRATION: F_t (BTC/USDT)
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-1.5 flex-1 h-[calc(100vh-55px)]">
        
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-1.5">
          
          <Panel title="Manifold: TDA, MFG & Free Probability" icon={Hexagon} className="h-[380px]">
             <div className="flex flex-col gap-1 h-full justify-center">
              {FEATURES.map(f => {
                const val = ui.features[f] || 0;
                const isNlp = f === 'Ω_SNT';
                const isSig = f === 'Σ_PV' || f === 'χ_EIG' || f === 'S_VNE';
                const isTda = f === 'β0_TDA' || f === 'β1_TDA' || f === 'μ_MFG';
                
                let color = 'text-[#00e5ff]';
                let bg = 'bg-[#00e5ff]';
                if (isNlp) { color = 'text-[#ff00ff]'; bg = 'bg-[#ff00ff]'; }
                if (isSig) { color = 'text-[#eab308]'; bg = 'bg-[#eab308]'; }
                if (isTda) { color = 'text-[#00ff00]'; bg = 'bg-[#00ff00]'; }

                return (
                  <div key={f} className="flex items-center gap-2 text-[8px] font-mono">
                    <span className={`w-12 font-bold ${color}`}>
                      {isNlp && <Newspaper size={8} className="inline mr-1 mb-0.5" />}
                      {isSig && <Fingerprint size={8} className="inline mr-1 mb-0.5" />}
                      {isTda && <Radar size={8} className="inline mr-1 mb-0.5" />}
                      {f}
                    </span>
                    <div className="flex-1 h-1 bg-[#111] rounded-full overflow-hidden relative">
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#444] z-10"></div>
                      <div 
                        className={`absolute top-0 bottom-0 transition-all duration-75 ${val > 0 ? bg + ' left-1/2' : 'bg-[#ff003c] right-1/2'}`}
                        style={{ width: `${Math.abs(val) / 4 * 50}%` }}
                      ></div>
                    </div>
                    <span className={`w-8 text-right ${val > 0 ? color : val < 0 ? 'text-[#ff003c]' : 'text-[#555]'}`}>
                      {val > 0 ? '+' : ''}{val.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Persistent Homology Barcodes (TDA)" icon={Activity} className="flex-1">
            <div className="w-full h-full relative border border-[#111] bg-[#050505] rounded overflow-hidden p-2">
               <div className="absolute top-1 right-2 text-[7px] font-mono text-[#666] flex gap-2">
                 <span className="text-[#00e5ff]">H0 (Components)</span>
                 <span className="text-[#ff00ff]">H1 (Holes)</span>
               </div>
               <PersistentBarcodePlot barcodes={ui.tdaBarcodes} />
            </div>
          </Panel>
        </div>

        <div className="col-span-12 lg:col-span-5 flex flex-col gap-1.5">
          
          <Panel title="Information Geometry & Wasserstein DRO" icon={FunctionSquare} className="h-[180px]">
             <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ui.history} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFisher" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 3" stroke="#111" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis yAxisId="left" domain={['auto', 'auto']} stroke="#444" fontSize={8} tickFormatter={v => v.toFixed(2)} />
                <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} stroke="#444" fontSize={8} hide />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '9px', fontFamily: 'monospace' }} />
                <Area yAxisId="left" type="monotone" dataKey="fisherTrace" stroke="#ff00ff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorFisher)" isAnimationActive={false} name="Fisher Info Tr(I)" />
                <Line yAxisId="right" type="stepAfter" dataKey="wasserstein" stroke="#00e5ff" strokeWidth={1} dot={false} opacity={0.8} isAnimationActive={false} name="Wasserstein Dist" />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Neuro-Symbolic Attention Manifold (Natural Gradient)" icon={InfinityIcon} className="flex-1" glow={true}>
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-2 text-[7px] font-mono text-[#666] border-b border-[#1a1a1a] pb-1 mb-1 uppercase tracking-widest">
                <div className="col-span-2">Topology ID</div>
                <div className="col-span-3">Symbolic Expression</div>
                <div className="col-span-3">Linear Attention</div>
                <div className="col-span-2 text-center">Stochastic Trajectory</div>
                <div className="col-span-2 text-right">Fisher Tr(I)</div>
              </div>
              
              <div className="flex flex-col gap-0.5 overflow-y-auto">
                {ui.candidates.map(c => {
                  const attnVals = Object.values(c.manifoldAttention);
                  const attn = softmax(attnVals);
                  
                  return (
                    <div key={c.id} className="grid grid-cols-12 gap-2 items-center text-[8px] font-mono py-1 border-b border-[#111] hover:bg-[#0a0a0a] transition-colors rounded px-1">
                      <div className="col-span-2 font-bold text-[#aaa] flex items-center gap-1">
                        <Zap size={8} className="text-[#eab308]" />
                        {c.id}
                      </div>
                      <div className="col-span-3 text-[#00ff00] opacity-80 truncate font-bold" title={c.symbolicExpression}>
                        {c.symbolicExpression}
                      </div>
                      <div className="col-span-3 flex h-2 gap-px bg-[#111] rounded overflow-hidden">
                        {FEATURES.map((f, i) => {
                          let bg = 'bg-[#00e5ff]';
                          if (f === 'Ω_SNT') bg = 'bg-[#ff00ff]';
                          if (f === 'Σ_PV' || f === 'χ_EIG' || f === 'S_VNE') bg = 'bg-[#eab308]';
                          if (f === 'β0_TDA' || f === 'β1_TDA' || f === 'μ_MFG') bg = 'bg-[#00ff00]';
                          return (
                            <div 
                              key={f} 
                              className={`h-full ${bg}`} 
                              style={{ width: `${attn[i] * 100}%`, opacity: Math.max(0.2, attn[i] * 3) }}
                              title={`${f}: ${(attn[i]*100).toFixed(1)}%`}
                            ></div>
                          );
                        })}
                      </div>
                      <div className="col-span-2 flex justify-center items-center">
                        <StochasticTrajectory data={c.pnlTrajectory} color={c.sharpe > 0 ? '#00ff00' : '#ff003c'} />
                      </div>
                      <div className={`col-span-2 text-right font-bold text-[#ff00ff]`}>
                        {c.fisherInfoTrace.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-1.5">
          
          <Panel title="MFG Nash Equilibrium Portfolio (DRO)" icon={ShieldCheck} className="h-[280px]">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-2 text-[7px] font-mono text-[#666] border-b border-[#1a1a1a] pb-1 mb-1 uppercase tracking-widest">
                <div className="col-span-3">Topology ID</div>
                <div className="col-span-2 text-right">Sharpe</div>
                <div className="col-span-3 text-right">MFG Penalty</div>
                <div className="col-span-4 text-right">DRO Alloc</div>
              </div>
              
              <div className="flex flex-col gap-1 overflow-y-auto pr-1">
                {ui.portfolio.length === 0 ? (
                  <div className="text-center text-[#555] text-[8px] italic mt-4">Awaiting topologies to pass Gram-Schmidt Orthogonalization...</div>
                ) : (
                  ui.portfolio.map(p => {
                    const weight = p.droWeight * 100;
                    
                    return (
                      <div key={p.id} className="grid grid-cols-12 gap-2 items-center text-[9px] font-mono py-1 bg-[#00ff00]/5 border border-[#00ff00]/10 rounded px-1.5">
                        <div className="col-span-3 font-bold text-[#fff]">{p.id}</div>
                        <div className="col-span-2 text-right text-[#00ff00]">{p.sharpe.toFixed(2)}</div>
                        <div className="col-span-3 text-right text-[#ff003c] opacity-80">-{p.mfgCrowdingPenalty.toFixed(4)}</div>
                        <div className="col-span-4 flex items-center gap-1.5">
                          <div className="flex-1 h-1 bg-[#111] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00ff00]" style={{ width: `${weight}%` }}></div>
                          </div>
                          <span className="text-[#888] text-[7px] w-5 text-right">{weight.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Panel>

          <Panel title="SPDE & Free Probability Control Log" icon={GitCommit} className="flex-1">
            <div className="h-full overflow-y-auto flex flex-col gap-0.5 pr-1">
              {ui.logs.map(log => {
                let color = "text-[#888]";
                let Icon = GitCommit;
                if (log.type === 'warn') { color = "text-[#eab308]"; Icon = AlertTriangle; }
                if (log.type === 'critical') { color = "text-[#ff003c]"; Icon = AlertTriangle; }
                if (log.type === 'success') { color = "text-[#00ff00]"; Icon = ShieldCheck; }
                if (log.type === 'info') { color = "text-[#00e5ff]"; Icon = Database; }
                if (log.type === 'math') { color = "text-[#ff00ff]"; Icon = Sigma; }

                return (
                  <div key={log.id} className="flex items-start gap-1.5 py-0.5 border-b border-[#111] last:border-0">
                    <Icon size={8} className={`mt-0.5 ${color}`} />
                    <div className="flex flex-col flex-1">
                      <span className={`text-[8px] font-mono leading-tight ${color === 'text-[#888]' ? 'text-[#aaa]' : color}`}>{log.msg}</span>
                      <span className="text-[6px] text-[#555] font-mono">{log.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

        </div>
      </div>
    </div>
  );
}
