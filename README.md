# **migrate**

Migrates tokens from an EOA wallet to a Safe wallet.

Fetches token balances for the owner address , transfers the balances to the Safe wallet, and confirms the transactions.

```tsx
async function migrate(
  signer: Signer,
  chainId: number,
  ownerAddress: string,
  safeAddress: string,
  tokenAddresses?: string[]
): Promise<void>

```

### **Parameters**

- `signer` - Ethers Signer instance to sign transactions
- `chainId` - Network ID to connect to
- `ownerAddress` - Address of the owner's EOA wallet
- `safeAddress` - Address of the Safe wallet
- `tokenAddresses` - Optional list of token contract addresses to migrate

### **Returns**

Resolved Promises when all transfer transactions are confirmed

### **Example**

```tsx
const signer = new ethers.Wallet(privateKey);

await migrate(
  signer,
  1,
  "0x123...",
  "0x456...",
  ["0xToken1", "0xToken2"]
);
```