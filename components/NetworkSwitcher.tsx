'use client';

import { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { mainnet, arbitrum, optimism, base } from 'viem/chains';
import Image from 'next/image';

const networks = [
  { 
    id: mainnet.id, 
    name: 'Ethereum', 
    icon: '/images/ethereum.svg' // Add these icons to your public folder
  },
  { 
    id: arbitrum.id, 
    name: 'Arbitrum', 
    icon: '/images/arbitrum.svg' 
  },
  { 
    id: optimism.id, 
    name: 'Optimism', 
    icon: '/images/optimism.svg' 
  },
  { 
    id: base.id, 
    name: 'Base', 
    icon: '/images/base.svg' 
  }
];

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const currentNetwork = networks.find(net => net.id === chainId) || networks[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#151516] text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm"
      >
        <div className="w-4 h-4 relative">
          <Image 
            src={currentNetwork.icon} 
            alt={currentNetwork.name} 
            fill 
            className="object-contain"
          />
        </div>
        <span>{currentNetwork.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-[#151516] border border-[#2d2d2e] rounded-lg p-2 w-48 z-50">
          <div className="text-xs text-[#868686] mb-2 px-2">Switch Networks</div>
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => {
                if (switchChain) {
                  switchChain({ chainId: network.id });
                }
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left text-sm ${
                network.id === chainId ? 'bg-[#007aff20]' : 'hover:bg-[#ffffff0d]'
              }`}
            >
              <div className="w-5 h-5 relative">
                <Image 
                  src={network.icon} 
                  alt={network.name} 
                  fill 
                  className="object-contain"
                />
              </div>
              <span>{network.name}</span>
              {network.id === chainId && (
                <span className="ml-auto text-[#007aff] text-xs">Connected</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher; 