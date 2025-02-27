'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useBalance, useChainId, useConfig } from 'wagmi';

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  balance: string;
  shortAddress: string | undefined;
  chainId: number | undefined;
  chainName: string | undefined;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: undefined,
  balance: '0',
  shortAddress: undefined,
  chainId: undefined,
  chainName: undefined,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const config = useConfig();
  const { data: balanceData } = useBalance({
    address,
  });

  const [shortAddress, setShortAddress] = useState<string | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (address) {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    } else {
      setShortAddress(undefined);
    }
  }, [address]);

  useEffect(() => {
    if (chainId) {
      // Find the chain name from the config
      const chain = config.chains.find(c => c.id === chainId);
      setChainName(chain?.name);
    } else {
      setChainName(undefined);
    }
  }, [chainId, config.chains]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance: balanceData?.formatted || '0',
        shortAddress,
        chainId,
        chainName,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}; 