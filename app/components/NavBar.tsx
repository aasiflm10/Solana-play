'use client'
import AnimatedBackground from '@/components/core/animated-background';
import { useState } from 'react';
import { SendSol } from './SendSol';
import { AirDrop } from './Airdrop';
import { ShowSolBalance } from './Balance';
import { SignMessage } from './SignMessage';

export function AnimatedTabsHover() {
  const TABS = ['Wallet', 'Airdrop', 'SignMessage', 'SendSOL'];
//   const SELECTED = ['Wallet', 'Airdrop', 'SignMessage', 'SendSOL']
  const [selected, setSelected] = useState('Wallet');

  const renderContent = () => {
    switch (selected) {
      case 'Wallet':
        return (
          <ShowSolBalance/>
        );
      case 'Airdrop':
        return (
          <AirDrop/>
        );
      case 'SignMessage':
        return (
          <SignMessage/>
        );
      case 'SendSOL':
        return (
          <SendSol/>
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
                    // console.log(selected);
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
