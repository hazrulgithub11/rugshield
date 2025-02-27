'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Wallet from '@/icons/Wallet';
import NetworkSwitcher from './NetworkSwitcher';

const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button 
                    onClick={openConnectModal} 
                    className="bg-[#007aff] text-white px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect wallet</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <NetworkSwitcher />

                  <button 
                    onClick={openAccountModal}
                    className="bg-[#007aff] text-white px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>
                      {account.displayName}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton; 