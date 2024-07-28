import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";



interface Props{
    confirmSwap:React.MouseEventHandler<HTMLButtonElement>;
    outputAmount:string | null
}
function CustomConnectBtn({
  confirmSwap,
  outputAmount

}:Props) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <main
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              if (
              outputAmount && isNaN(parseFloat(outputAmount))
              ) {
                return (
                    <div style={{ display: "flex", gap: 12 }}>
                <button disabled>Swap</button>
                <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                  </div>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={confirmSwap}>Swap</button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </main>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default CustomConnectBtn;
