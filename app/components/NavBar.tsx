'use client'
import AnimatedBackground from '@/components/core/animated-background';
import { useState } from 'react';

export function AnimatedTabsHover() {
  const TABS = ['Wallet', 'Airdrop', 'SignMessage', 'SendSOL'];
//   const SELECTED = ['Wallet', 'Airdrop', 'SignMessage', 'SendSOL']
  const [selected, setSelected] = useState('Wallet');

  const renderContent = () => {
    switch (selected) {
      case 'Wallet':
        return (
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-2">Wallet</h2>
            <p>View your wallet balance and transactions here.</p>
          </div>
        );
      case 'Airdrop':
        return (
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-2">Airdrop</h2>
            <p>Request an airdrop of SOL tokens to your wallet.</p>
          </div>
        );
      case 'SignMessage':
        return (
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-2">Sign Message</h2>
            <p>Sign a message with your wallet to prove ownership.</p>
          </div>
        );
      case 'SendSOL':
        return (
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-2">Send SOL</h2>
            <p>Send SOL tokens to another wallet address.</p>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div>
        <div className='flex flex-row justify-center space-x-8'>
        <AnimatedBackground
            defaultValue={TABS[0]}
            className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
            transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
            }}
            enableHover
        >
            {TABS.map((tab, index) => (
            <button
                key={index}
                data-id={tab}
                type='button'
                className=' text-2xl px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'
                onClick={()=>{
                    setSelected(tab)
                    console.log(selected);
                }}
            >
                {tab}
            </button>
            ))}
        </AnimatedBackground>
        </div>
        
        <div>
            {renderContent()}
        </div>
    </div>
  );
}
