async function test() {
  const address = "inj1dummyaddress000000000000000000000address";
  
  // Test balance endpoint
  const balanceUrl = `https://testnet.sentry.lcd.injective.network/cosmos/bank/v1beta1/balances/${address}`;
  console.log("Fetching balance from:", balanceUrl);
  try {
    const res = await fetch(balanceUrl);
    console.log("Balance status:", res.status);
    if (res.ok) {
      const data = await res.json();
      console.log("Balance response:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Balance fetch error:", err);
  }

  // Test transactions endpoint
  const txUrl = `https://testnet.explorer-api.injective.network/api/v1/account/txs/${address}?limit=25`;
  console.log("\nFetching transactions from:", txUrl);
  try {
    const res = await fetch(txUrl);
    console.log("Transactions status:", res.status);
    if (res.ok) {
      const data = await res.json();
      console.log("Transactions data length:", data.data?.length);
      console.log("Transactions first 3 txs type/hash:", data.data?.slice(0, 3).map(tx => ({ type: tx.type, hash: tx.hash })));
    }
  } catch (err) {
    console.error("Transactions fetch error:", err);
  }
}

test();
