'use client'

import { useState } from 'react'
import Image from 'next/image'
import PawsLogo from '@/icons/PawsLogo'
import ArrowRight from '@/icons/ArrowRight'
import { sparkles } from '@/images'
import ChatWithEliza from './ChatWithEliza'

// Risk level component (reused from HomeTab)
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

// Liquidity event type
type LiquidityEvent = {
    id: string;
    protocol: string;
    event: string;
    amount: string;
    time: string;
    risk: 'Low' | 'Medium' | 'High';
}

// TVL change type
type TVLChange = {
    protocol: string;
    current: string;
    change: string;
    isPositive: boolean;
}

const LiquidityMonitoringTab = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'tvl' | 'chat'>('events')
    
    // Sample liquidity events data
    const liquidityEvents: LiquidityEvent[] = [
        { 
            id: '1', 
            protocol: 'Uniswap V3', 
            event: 'Whale Withdrawal', 
            amount: '$2.4M', 
            time: '2 mins ago', 
            risk: 'High' 
        },
        { 
            id: '2', 
            protocol: 'Curve Finance', 
            event: 'Flash Loan', 
            amount: '$5.1M', 
            time: '7 mins ago', 
            risk: 'Medium' 
        },
        { 
            id: '3', 
            protocol: 'Aave V3', 
            event: 'TVL Fluctuation', 
            amount: '$3.2M', 
            time: '15 mins ago', 
            risk: 'Medium' 
        },
        { 
            id: '4', 
            protocol: 'Balancer', 
            event: 'Mass Withdrawal', 
            amount: '$1.8M', 
            time: '32 mins ago', 
            risk: 'High' 
        },
        { 
            id: '5', 
            protocol: 'Compound', 
            event: 'Liquidity Added', 
            amount: '$4.7M', 
            time: '45 mins ago', 
            risk: 'Low' 
        },
    ]
    
    // Sample TVL changes data
    const tvlChanges: TVLChange[] = [
        { protocol: 'Uniswap V3', current: '$42.7M', change: '8.2%', isPositive: false },
        { protocol: 'Curve Finance', current: '$38.5M', change: '3.5%', isPositive: false },
        { protocol: 'Aave V3', current: '$29.1M', change: '1.2%', isPositive: true },
        { protocol: 'Balancer', current: '$18.3M', change: '5.7%', isPositive: false },
        { protocol: 'Compound', current: '$24.6M', change: '2.8%', isPositive: true },
    ]

    return (
        <div className={`liquidity-monitoring-tab-con transition-all duration-300`}>
            {/* Header */}
            <div className="px-4">
                <div className="flex flex-col mt-6">
                    <h1 className="text-2xl font-bold mb-2">Liquidity Monitoring</h1>
                    <p className="text-[#868686] text-sm mb-4">
                        AI-powered real-time liquidity tracking and risk assessment
                    </p>
                    
                    {/* Alert Summary Card */}
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-lg font-medium">Alert Summary</div>
                            <div className="bg-[#ff3b30] text-white text-xs px-2 py-1 rounded-full">
                                2 High Risk
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-[#868686] text-sm">Last 24 hours</div>
                                <div className="text-xl font-bold">7 alerts</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[#868686] text-sm">Notification</div>
                                <div className="text-green-500 font-medium">Enabled</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tab Switcher */}
                    <div className="flex gap-0 mb-4">
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                                ${activeTab === 'events'
                                    ? 'bg-white text-black'
                                    : 'bg-[#151515] text-white'
                                }`}
                        >
                            Recent Events
                        </button>
                        <button
                            onClick={() => setActiveTab('tvl')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                                ${activeTab === 'tvl'
                                    ? 'bg-white text-black'
                                    : 'bg-[#151515] text-white'
                                }`}
                        >
                            TVL Changes
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                                ${activeTab === 'chat'
                                    ? 'bg-white text-black'
                                    : 'bg-[#151515] text-white'
                                }`}
                        >
                            Chat with AI
                        </button>
                    </div>
                    
                    {/* Events List */}
                    {activeTab === 'events' && (
                        <div className="space-y-3 mb-6">
                            {liquidityEvents.map((event) => (
                                <div 
                                    key={event.id}
                                    className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-medium text-lg">{event.protocol}</div>
                                        <RiskIndicator level={event.risk} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-[#868686] text-sm">Event</div>
                                            <div className="text-base font-medium">{event.event}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#868686] text-sm">{event.time}</div>
                                            <div className="text-xl font-bold">{event.amount}</div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-3 bg-[#151515] rounded-lg px-4 py-2 flex items-center justify-between">
                                        <span className="text-sm">View Details</span>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* TVL Changes List */}
                    {activeTab === 'tvl' && (
                        <div className="space-y-3 mb-6">
                            {tvlChanges.map((tvl, index) => (
                                <div 
                                    key={index}
                                    className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-medium text-lg">{tvl.protocol}</div>
                                        <div className={`text-sm font-medium ${tvl.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                            {tvl.isPositive ? '+' : '-'}{tvl.change}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-[#868686] text-sm">Current TVL</div>
                                            <div className="text-xl font-bold">{tvl.current}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#868686] text-sm">24h Change</div>
                                            <div className={`text-base font-medium ${tvl.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                                {tvl.isPositive ? '↑' : '↓'} {tvl.change}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Chat with Eliza */}
                    {activeTab === 'chat' && (
                        <div className="mb-6">
                            <ChatWithEliza />
                        </div>
                    )}
                    
                    {/* AI Risk Assessment */}
                    {activeTab !== 'chat' && (
                        <div className="bg-[#151516] rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 p-1.5 bg-white rounded-lg">
                                    <Image 
                                        src="/images/shield.png"
                                        alt="Shield Logo"
                                        width={24}
                                        height={24}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-lg font-medium">AI Risk Assessment</div>
                            </div>
                            <p className="text-[#868686] text-sm mb-3">
                                Based on current market conditions and historical patterns, our AI predicts:
                            </p>
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Image
                                        src={sparkles}
                                        alt="sparkles"
                                        width={16}
                                        height={16}
                                    />
                                    <span className="text-sm font-medium">Uniswap V3 may experience increased volatility in the next 24h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={sparkles}
                                        alt="sparkles"
                                        width={16}
                                        height={16}
                                    />
                                    <span className="text-sm font-medium">Consider adjusting auto-lock settings for high-risk positions</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Notification Settings */}
                    <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-6">
                        <div className="text-lg font-medium mb-3">Notification Settings</div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Telegram Alerts</span>
                            <div className="w-10 h-6 bg-green-500 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Dashboard Notifications</span>
                            <div className="w-10 h-6 bg-green-500 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Email Alerts</span>
                            <div className="w-10 h-6 bg-[#3c3c3c] rounded-full relative">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setActiveTab('chat')}
                        className="shine-effect w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between mb-3"
                    >
                        <div className="flex items-center gap-3 font-medium">
                            <Image 
                                src="/images/shield.png" 
                                alt="Eliza AI" 
                                width={24} 
                                height={24}
                                className="w-6 h-6 object-contain"
                            />
                            <span>Chat with Eliza AI</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LiquidityMonitoringTab