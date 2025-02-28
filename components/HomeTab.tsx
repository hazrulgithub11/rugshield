'use client'

import { useState } from 'react'
import Image from 'next/image'
import ArrowRight from '@/icons/ArrowRight'
import { sparkles } from '@/images'
import PawsLogo from '@/icons/PawsLogo'
import Wallet from '@/icons/Wallet'
import Star from '@/icons/Star'
import Community from '@/icons/Community'
import ConnectWalletButton from './ConnectWalletButton'
import { useWallet } from '@/contexts/WalletContext'

// Risk level component
const RiskIndicator = ({ level }: { level: 'Low' | 'Medium' | 'High' }) => {
    const bgColor = level === 'Low' 
        ? 'bg-green-500' 
        : level === 'Medium' 
            ? 'bg-yellow-500' 
            : 'bg-red-500'
    
    return (
        <div className={`flex items-center gap-2 ${level === 'High' ? 'animate-pulse' : ''}`}>
            <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
            <span className="text-sm font-medium">{level} Risk</span>
        </div>
    )
}

// Liquidity position card
const PositionCard = ({ 
    protocol, 
    amount, 
    apy, 
    risk 
}: { 
    protocol: string, 
    amount: string, 
    apy: string, 
    risk: 'Low' | 'Medium' | 'High' 
}) => {
    return (
        <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-lg">{protocol}</div>
                <RiskIndicator level={risk} />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[#868686] text-sm">Staked Amount</div>
                    <div className="text-xl font-bold">{amount}</div>
                </div>
                <div className="text-right">
                    <div className="text-[#868686] text-sm">APY</div>
                    <div className="text-green-500 font-medium">{apy}</div>
                </div>
            </div>
        </div>
    )
}

const IncreaseStakeModal = ({ onClose }: { onClose: () => void }) => {
    const [stakeType, setStakeType] = useState<'new' | 'existing'>('new')
    const [amount, setAmount] = useState('')

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#151516] rounded-xl w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-[#2d2d2e]">
                    <h3 className="text-lg font-medium">Increase Stake</h3>
                    <button 
                        onClick={onClose}
                        className="text-[#868686] hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Stake Type Selector */}
                    <div className="flex gap-2 p-1 bg-[#ffffff0d] rounded-lg">
                        <button 
                            className={`flex-1 py-2 rounded-md text-sm font-medium ${
                                stakeType === 'new' 
                                    ? 'bg-white text-black' 
                                    : 'text-[#868686] hover:text-white'
                            }`}
                            onClick={() => setStakeType('new')}
                        >
                            New Stake
                        </button>
                        <button 
                            className={`flex-1 py-2 rounded-md text-sm font-medium ${
                                stakeType === 'existing' 
                                    ? 'bg-white text-black' 
                                    : 'text-[#868686] hover:text-white'
                            }`}
                            onClick={() => setStakeType('existing')}
                        >
                            Restake Existing
                        </button>
                    </div>

                    {stakeType === 'new' ? (
                        /* New Stake Input */
                        <div className="space-y-4">
                            <div className="bg-[#ffffff0d] rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-[#868686]">Amount to Stake</span>
                                    <span className="text-sm text-[#868686]">Balance: 5.432 ETH</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.0"
                                        className="bg-transparent text-2xl font-bold flex-1 outline-none"
                                    />
                                    <span className="text-lg font-medium">ETH</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <button className="text-sm text-[#868686] hover:text-white">25%</button>
                                    <button className="text-sm text-[#868686] hover:text-white">50%</button>
                                    <button className="text-sm text-[#868686] hover:text-white">75%</button>
                                    <button className="text-sm text-[#868686] hover:text-white">MAX</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Existing Positions */
                        <div className="space-y-2">
                            <div className="text-sm text-[#868686] mb-2">Select positions to restake:</div>
                            <div className="bg-[#ffffff0d] rounded-lg p-3 cursor-pointer hover:bg-[#ffffff15]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">Uniswap V3</div>
                                        <div className="text-sm text-[#868686]">Current APY: 4.2%</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">2,100 ETH</div>
                                        <div className="text-sm text-green-500">+8.2% APY boost</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff0d] rounded-lg p-3 cursor-pointer hover:bg-[#ffffff15]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">Curve Finance</div>
                                        <div className="text-sm text-[#868686]">Current APY: 6.8%</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">1,296 ETH</div>
                                        <div className="text-sm text-green-500">+5.7% APY boost</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff0d] rounded-lg p-3 cursor-pointer hover:bg-[#ffffff15]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">Aave V3</div>
                                        <div className="text-sm text-[#868686]">Current APY: 3.5%</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">1,250 ETH</div>
                                        <div className="text-sm text-green-500">+9.0% APY boost</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <button className="w-full bg-white text-black rounded-lg py-3 font-medium mt-4">
                        {stakeType === 'new' ? 'Stake ETH' : 'Restake Selected Positions'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const RestakeDetailsView = ({ onClose }: { onClose: () => void }) => {
    const [showIncreaseStake, setShowIncreaseStake] = useState(false)
    
    return (
        <>
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="bg-[#151516] rounded-xl w-full max-w-md">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-[#2d2d2e]">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 p-1.5 bg-white rounded-lg">
                                <Image 
                                    src="/images/shield.png"
                                    alt="Shield Logo"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-medium">EigenLayer Restaking</h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-[#868686] hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Balance Section */}
                        <div className="bg-[#ffffff0d] rounded-lg p-4">
                            <div className="text-[#868686] text-sm mb-1">Total Restaked Balance</div>
                            <div className="text-2xl font-bold">1,250 ETH</div>
                            <div className="text-green-500 text-sm mt-1">≈ $2,375,000 USD</div>
                        </div>

                        {/* Rewards Section */}
                        <div className="bg-[#ffffff0d] rounded-lg p-4">
                            <div className="text-[#868686] text-sm mb-2">Rewards</div>
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <div className="text-sm">Daily</div>
                                    <div className="text-xl font-bold text-green-500">+45.8 ETH</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm">Monthly (est.)</div>
                                    <div className="text-xl font-bold text-green-500">+1,374 ETH</div>
                                </div>
                            </div>
                            <div className="text-[#868686] text-sm">APR: 12.5%</div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="text-[#868686] text-sm">Lock Period</div>
                                <div className="font-medium">14 days</div>
                            </div>
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="text-[#868686] text-sm">Next Reward</div>
                                <div className="font-medium">5h 23m</div>
                            </div>
                        </div>

                        {/* Dynamic Exit Fee */}
                        <div className="bg-[#ffffff0d] rounded-lg p-3">
                            <div className="text-[#868686] text-sm mb-2">Dynamic Exit Fee</div>
                            <div className="flex justify-between">
                                <span>Current: 2%</span>
                                <span>Max: 20%</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <button 
                                className="w-full bg-white text-black rounded-lg py-3 font-medium"
                                onClick={() => setShowIncreaseStake(true)}
                            >
                                Increase Stake
                            </button>
                            <button className="w-full bg-[#ffffff0d] rounded-lg py-3 font-medium">
                                Claim Rewards
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add Increase Stake Modal */}
            {showIncreaseStake && (
                <IncreaseStakeModal onClose={() => setShowIncreaseStake(false)} />
            )}
        </>
    )
}

const HomeTab = () => {
    const [showWithdrawOptions, setShowWithdrawOptions] = useState(false)
    const { isConnected, balance } = useWallet()
    const [showRestakeDetails, setShowRestakeDetails] = useState(false)
    
    // Format the balance to display nicely
    const formattedBalance = isConnected 
        ? parseFloat(balance).toLocaleString(undefined, { 
            maximumFractionDigits: 4,
            minimumFractionDigits: 0
          })
        : '0'
    
    return (
        <div className={`dashboard-tab-con transition-all duration-300 px-4`}>
            {/* Header with Connect Wallet */}
            <div className="flex justify-between items-center mt-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <ConnectWalletButton />
            </div>
            
            {/* Total Balance */}
            <div className="bg-[#151516] rounded-lg p-4 mt-4">
                <div className="text-[#868686] text-sm">Total Balance</div>
                <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">{formattedBalance}</div>
                </div>
                <div className="flex items-center gap-1 text-[#868686] text-xs mt-1">
                    <span>INSURANCE COVERAGE:</span>
                    <span className="text-green-500">85%</span>
                    <Image
                        src={sparkles}
                        alt="sparkles"
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            
            {/* EigenLayer Restaking */}
            <div className="bg-[#151516] rounded-lg p-4 mt-4">
                <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowRestakeDetails(true)}
                >
                    <div className="text-lg font-medium">EigenLayer Restaking</div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <div className="text-[#868686] text-sm">Balance</div>
                        <div className="text-xl font-bold">1,250</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[#868686] text-sm">Rewards</div>
                        <div className="text-green-500 font-medium">+45.8 / day</div>
                    </div>
                </div>
            </div>
            
            {/* Staked Positions */}
            <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-medium">Staked Positions</h2>
                    <div className="text-[#868686] text-sm">3 positions</div>
                </div>
                
                <PositionCard 
                    protocol="Uniswap V3" 
                    amount="2,100" 
                    apy="4.2%" 
                    risk="Low" 
                />
                
                <PositionCard 
                    protocol="Curve Finance" 
                    amount="1,296" 
                    apy="6.8%" 
                    risk="Medium" 
                />
                
                <PositionCard 
                    protocol="Aave V3" 
                    amount="1,250" 
                    apy="3.5%" 
                    risk="High" 
                />
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 mb-8">
                <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
                
                <button 
                    onClick={() => setShowWithdrawOptions(!showWithdrawOptions)}
                    className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between mb-3"
                >
                    <div className="flex items-center gap-3 font-medium">
                        <Wallet className="w-6 h-6" />
                        <span>Withdraw Funds</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${showWithdrawOptions ? 'rotate-90' : ''}`} />
                </button>
                
                {showWithdrawOptions && (
                    <div className="bg-[#0f0f0f] rounded-lg p-3 mb-3 border-[1px] border-[#2d2d2e]">
                        <div className="text-sm text-[#868686] mb-2">Select position to withdraw:</div>
                        <div className="space-y-2">
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Uniswap V3 - 2,100
                            </button>
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Curve Finance - 1,296
                            </button>
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Aave V3 - 1,250
                            </button>
                        </div>
                    </div>
                )}
                
                <button className="shine-effect w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 font-medium">
                        <Star className="w-6 h-6" />
                        <span>Restake for Protection</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-medium">
                        <Community className="w-6 h-6" />
                        <span>Adjust Auto-lock Settings</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* Add the modal with the close handler */}
            {showRestakeDetails && (
                <RestakeDetailsView 
                    onClose={() => setShowRestakeDetails(false)} 
                />
            )}
        </div>
    )
}

export default HomeTab