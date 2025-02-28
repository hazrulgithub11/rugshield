'use client'

import { useState } from 'react'
import Image from 'next/image'
import { sparkles } from '@/images'

import ArrowRight from '@/icons/ArrowRight'
import Star from '@/icons/Star'
import Community from '@/icons/Community'
import Wallet from '@/icons/Wallet'

// Toggle switch component
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => {
    return (
        <button 
            onClick={onChange}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-[#3c3c3c]'}`}
        >
            <div 
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enabled ? 'right-1' : 'left-1'}`}
            ></div>
        </button>
    )
}

const ProtectionInsuranceTab = () => {
    const [autoLockEnabled, setAutoLockEnabled] = useState(true)
    const [circuitBreakerEnabled, setCircuitBreakerEnabled] = useState(true)
    const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState(true)
    const [showRestakeOptions, setShowRestakeOptions] = useState(false)
    
    return (
        <div className="protection-insurance-tab-con px-4 pb-24 transition-all duration-300">
            {/* Header */}
            <div className="pt-8 mb-6">
                <h1 className="text-2xl font-bold mb-2">Protection & Insurance</h1>
                <p className="text-[#868686] text-sm">
                    Secure your liquidity with preventive actions and insurance coverage
                </p>
            </div>
            
            {/* Insurance Coverage Card */}
            <div className="bg-[#151516] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-medium">Insurance Coverage</div>
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Active
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#868686] text-sm">Total Coverage</div>
                        <div className="text-xl font-bold">$4,646</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[#868686] text-sm">Coverage Level</div>
                        <div className="flex items-center gap-1">
                            <span className="text-green-500 font-medium">85%</span>
                            <Image
                                src={sparkles}
                                alt="sparkles"
                                width={12}
                                height={12}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3 bg-[#ffffff0d] rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 p-1 bg-white rounded-lg">
                            <Image 
                                src="/images/shield.png"
                                alt="Shield Logo"
                                width={16}
                                height={16}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-sm">Powered by EigenLayer Restaking</span>
                    </div>
                </div>
            </div>
            
            {/* Preventive Actions Section */}
            <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Preventive Actions</h2>
                
                <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <Wallet className="w-6 h-6" />
                            <span className="font-medium">Auto-lock Withdrawals</span>
                        </div>
                        <ToggleSwitch 
                            enabled={autoLockEnabled} 
                            onChange={() => setAutoLockEnabled(!autoLockEnabled)} 
                        />
                    </div>
                    <p className="text-[#868686] text-sm">
                        Automatically lock liquidity withdrawals when suspicious activity is detected
                    </p>
                </div>
                
                <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <Community className="w-6 h-6" />
                            <span className="font-medium">Circuit Breakers</span>
                        </div>
                        <ToggleSwitch 
                            enabled={circuitBreakerEnabled} 
                            onChange={() => setCircuitBreakerEnabled(!circuitBreakerEnabled)} 
                        />
                    </div>
                    <p className="text-[#868686] text-sm">
                        Pause swaps and disable suspicious wallets during high-risk events
                    </p>
                </div>
                
                <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <Star className="w-6 h-6" />
                            <span className="font-medium">Dynamic Exit Fees</span>
                        </div>
                        <div className="text-sm font-medium text-green-500">Active</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[#868686] text-sm">
                            Current exit fee: <span className="text-white">2%</span>
                        </p>
                        <p className="text-[#868686] text-sm">
                            Max fee: <span className="text-white">20%</span>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* EigenLayer Restaking Section */}
            <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">EigenLayer Restaking</h2>
                
                <div className="bg-[#151516] rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-base font-medium">Restaked Balance</div>
                        <div className="text-xl font-bold">1,250</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[#868686] text-sm">Rewards Earned</div>
                        <div className="text-green-500 font-medium">+45.8 / day</div>
                    </div>
                </div>
                
                <button 
                    onClick={() => setShowRestakeOptions(!showRestakeOptions)}
                    className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between mb-3"
                >
                    <div className="flex items-center gap-3 font-medium">
                        <Star className="w-6 h-6" />
                        <span>Adjust Restaking</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${showRestakeOptions ? 'rotate-90' : ''}`} />
                </button>
                
                {showRestakeOptions && (
                    <div className="bg-[#0f0f0f] rounded-lg p-3 mb-3 border-[1px] border-[#2d2d2e]">
                        <div className="text-sm text-[#868686] mb-2">Select action:</div>
                        <div className="space-y-2">
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Increase Restaking
                            </button>
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Decrease Restaking
                            </button>
                            <button className="w-full bg-[#ffffff0d] rounded-lg px-3 py-2 text-left text-sm">
                                Claim Rewards
                            </button>
                        </div>
                    </div>
                )}
                
                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-medium">
                        <Wallet className="w-6 h-6" />
                        <span>View Insurance Pool</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            
            {/* Notification Settings */}
            <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Notification Settings</h2>
                
                <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Telegram Alerts</span>
                        <ToggleSwitch 
                            enabled={telegramAlertsEnabled} 
                            onChange={() => setTelegramAlertsEnabled(!telegramAlertsEnabled)} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Dashboard Notifications</span>
                        <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Email Alerts</span>
                        <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                </div>
            </div>
            
            {/* Fixed Action Button */}
            <div className="fixed bottom-[80px] left-0 right-0 py-4 flex justify-center">
                <div className="w-full max-w-md px-4">
                    <button className="shine-effect w-full bg-[#4c9ce2] text-white py-4 rounded-xl text-lg font-medium">
                        Increase Protection
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProtectionInsuranceTab