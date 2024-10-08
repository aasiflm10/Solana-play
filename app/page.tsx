'use client'
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnimatedTabsHover } from "./components/NavBar";
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/LpiGEE7-J44ti19KVKu4CBNTf7pz54Xo"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
                <AnimatedTabsHover/>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);

}
