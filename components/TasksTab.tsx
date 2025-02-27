// components/TasksTab.tsx

/**
 * This project was developed by Nikandr Surkov.
 * 
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * GitHub: https://github.com/nikandr-surkov
 */

'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import ArrowRight from '@/icons/ArrowRight'
import { sparkles } from '@/images'
import PawsLogo from '@/icons/PawsLogo'
import Wallet from '@/icons/Wallet'
import Star from '@/icons/Star'
import Community from '@/icons/Community'
import TaskTelegram from '@/icons/TaskTelegram'

// Import your task icons
import TaskWallet from '@/icons/TaskWallet'
import TaskPaws from '@/icons/TaskPaws'
import TaskTwitter from '@/icons/TaskTwitter'
import { taskBlum, taskBoost, taskWhitePaws } from '@/images'
import TaskInvite from '@/icons/TaskInvite'
// Import other task icons...

type Task = {
    icon: string | React.FC<{ className?: string }>;
    title: string;
    reward: string;
    isComponent?: boolean;
}

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

const SettingsTab = () => {
    // Wallet & Telegram connection states
    const [walletConnected, setWalletConnected] = useState(false)
    const [telegramLinked, setTelegramLinked] = useState(false)
    
    // Risk preferences states
    const [autoLockEnabled, setAutoLockEnabled] = useState(true)
    const [highRiskAlerts, setHighRiskAlerts] = useState(true)
    const [mediumRiskAlerts, setMediumRiskAlerts] = useState(true)
    const [lowRiskAlerts, setLowRiskAlerts] = useState(false)
    
    // Notification settings states
    const [telegramAlerts, setTelegramAlerts] = useState(true)
    const [dashboardAlerts, setDashboardAlerts] = useState(true)
    const [emailAlerts, setEmailAlerts] = useState(false)
    const [twoFactorAuth, setTwoFactorAuth] = useState(false)
    
    // Active section state
    const [activeSection, setActiveSection] = useState<'wallet' | 'risk' | 'notifications'>('wallet')
    
    const tasks: Task[] = [
        {
            icon: taskWhitePaws.src,
            title: 'Put 🐾 in your name',
            reward: '+ 5,000 PAWS'
        },
        {
            icon: TaskPaws,
            title: 'Tweet about PAWS',
            reward: '+ 2,000 PAWS'
        },
        {
            icon: taskBoost.src,
            title: 'Boost PAWS channel',
            reward: '+ 2,500 PAWS'
        },
        {
            icon: TaskTelegram,
            title: 'Follow channel',
            reward: '+ 1,000 PAWS'
        },
        {
            icon: TaskTwitter,
            title: 'Follow twitter',
            reward: '+ 2,000 PAWS'
        },
        {
            icon: TaskInvite,
            title: 'Invite 10 friends',
            reward: '+ 5,000 PAWS'
        },
        {
            icon: TaskWallet,
            title: 'Connect wallet',
            reward: '+ 3,000 PAWS'
        },
        // Add more tasks as needed
    ]

    const partnerTasks: Task[] = [
        {
            icon: taskBlum.src,
            title: 'Join Blum Channel',
            reward: '+ 1,000 PAWS'
        }
    ]

    return (
        <div className="settings-tab-con px-4 pb-24 transition-all duration-300">
            {/* Header */}
            <div className="pt-8 mb-6">
                <h1 className="text-2xl font-bold mb-2">Settings</h1>
                <p className="text-[#868686] text-sm">
                    Manage your account, risk preferences, and notification settings
                </p>
            </div>
            
            {/* Section Tabs */}
            <div className="flex gap-0 mb-6">
                <button
                    onClick={() => setActiveSection('wallet')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                        ${activeSection === 'wallet'
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-white'
                        }`}
                >
                    Wallet & Telegram
                </button>
                <button
                    onClick={() => setActiveSection('risk')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                        ${activeSection === 'risk'
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-white'
                        }`}
                >
                    Risk Preferences
                </button>
                <button
                    onClick={() => setActiveSection('notifications')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 
                        ${activeSection === 'notifications'
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-white'
                        }`}
                >
                    Notifications
                </button>
            </div>
            
            {/* Wallet & Telegram Section */}
            {activeSection === 'wallet' && (
                <div>
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <Wallet className="w-6 h-6" />
                                <span className="font-medium">Wallet Connection</span>
                            </div>
                            {walletConnected ? (
                                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Connected
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setWalletConnected(true)}
                                    className="bg-[#007aff] text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Connect
                                </button>
                            )}
                        </div>
                        
                        {walletConnected && (
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Connected Wallet</span>
                                    <span className="text-sm text-[#868686]">0x71C...93E4</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Network</span>
                                    <span className="text-sm text-[#868686]">Ethereum</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <TaskTelegram className="w-6 h-6" />
                                <span className="font-medium">Telegram Account</span>
                            </div>
                            {telegramLinked ? (
                                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Linked
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setTelegramLinked(true)}
                                    className="bg-[#007aff] text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Link
                                </button>
                            )}
                        </div>
                        
                        {telegramLinked && (
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Telegram Username</span>
                                    <span className="text-sm text-[#868686]">@user_name</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Linked On</span>
                                    <span className="text-sm text-[#868686]">May 15, 2023</span>
                                </div>
                            </div>
                        )}
                        
                        {!telegramLinked && (
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <p className="text-sm text-[#868686] mb-2">
                                    Link your Telegram account to receive alerts and manage your liquidity positions.
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 p-1 bg-white rounded-lg">
                                        <PawsLogo className="w-full h-full text-black" />
                                    </div>
                                    <span className="text-sm">Start with /start command in our bot</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <Star className="w-6 h-6" />
                                <span className="font-medium">Supported Wallets</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-[#868686] text-sm">
                            MetaMask, Phantom, WalletConnect, and more
                        </p>
                    </div>
                </div>
            )}
            
            {/* Risk Preferences Section */}
            {activeSection === 'risk' && (
                <div>
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="text-lg font-medium mb-3">Auto-Protection Settings</div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="font-medium">Auto-lock on High Risk</div>
                                <div className="text-[#868686] text-sm">
                                    Automatically lock withdrawals during high-risk events
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={autoLockEnabled} 
                                onChange={() => setAutoLockEnabled(!autoLockEnabled)} 
                            />
                        </div>
                        
                        <div className="bg-[#ffffff0d] rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src={sparkles}
                                    alt="sparkles"
                                    width={16}
                                    height={16}
                                />
                                <span className="text-sm">Auto-protection is powered by AI risk assessment</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="text-lg font-medium mb-3">Alert Thresholds</div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="font-medium">High Risk Alerts</div>
                            </div>
                            <ToggleSwitch 
                                enabled={highRiskAlerts} 
                                onChange={() => setHighRiskAlerts(!highRiskAlerts)} 
                            />
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="font-medium">Medium Risk Alerts</div>
                            </div>
                            <ToggleSwitch 
                                enabled={mediumRiskAlerts} 
                                onChange={() => setMediumRiskAlerts(!mediumRiskAlerts)} 
                            />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="font-medium">Low Risk Alerts</div>
                            </div>
                            <ToggleSwitch 
                                enabled={lowRiskAlerts} 
                                onChange={() => setLowRiskAlerts(!lowRiskAlerts)} 
                            />
                        </div>
                    </div>
                    
                    <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <Community className="w-6 h-6" />
                                <span className="font-medium">Insurance Coverage Preferences</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-[#868686] text-sm">
                            Customize your coverage level and premium settings
                        </p>
                    </div>
                </div>
            )}
            
            {/* Notifications Section */}
            {activeSection === 'notifications' && (
                <div>
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="text-lg font-medium mb-3">Alert Channels</div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="font-medium">Telegram Alerts</div>
                                <div className="text-[#868686] text-sm">
                                    Receive alerts via Telegram
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={telegramAlerts} 
                                onChange={() => setTelegramAlerts(!telegramAlerts)} 
                            />
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="font-medium">Dashboard Notifications</div>
                                <div className="text-[#868686] text-sm">
                                    Show alerts in dashboard
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={dashboardAlerts} 
                                onChange={() => setDashboardAlerts(!dashboardAlerts)} 
                            />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">Email Alerts</div>
                                <div className="text-[#868686] text-sm">
                                    Receive alerts via email
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={emailAlerts} 
                                onChange={() => setEmailAlerts(!emailAlerts)} 
                            />
                        </div>
                    </div>
                    
                    <div className="bg-[#151516] rounded-lg p-4 mb-4">
                        <div className="text-lg font-medium mb-3">Security Settings</div>
                        
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="font-medium">Two-Factor Authentication</div>
                                <div className="text-[#868686] text-sm">
                                    Require 2FA for withdrawals
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={twoFactorAuth} 
                                onChange={() => setTwoFactorAuth(!twoFactorAuth)} 
                            />
                        </div>
                        
                        {twoFactorAuth && (
                            <div className="bg-[#ffffff0d] rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={sparkles}
                                        alt="sparkles"
                                        width={16}
                                        height={16}
                                    />
                                    <span className="text-sm">2FA will be required for all withdrawals over $1,000</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <Wallet className="w-6 h-6" />
                                <span className="font-medium">Withdrawal Authentication</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-[#868686] text-sm">
                            Configure additional security for withdrawals
                        </p>
                    </div>
                </div>
            )}
            
            {/* Save Settings Button */}
            <div className="fixed bottom-[80px] left-0 right-0 py-4 flex justify-center">
                <div className="w-full max-w-md px-4">
                    <button className="shine-effect w-full bg-[#4c9ce2] text-white py-4 rounded-xl text-lg font-medium">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsTab