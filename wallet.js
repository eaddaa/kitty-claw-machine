// wallet.js

// Keplr cüzdanına bağlanma fonksiyonu
export async function connectWallet() {
  if (window.getOfflineSigner) {
    const chainId = 'kittyverse_595973-1'; // Kendi zincir ID'nizi buraya ekleyin
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const userAddress = accounts[0].address;
    console.log('Keplr cüzdanına bağlandı:', userAddress);
    return userAddress;
  } else {
    console.error('Keplr cüzdanı yüklü değil.');
    return null;
  }
}

// Ödül talep etme fonksiyonu
export async function claimReward(userAddress, score) {
  const rewardAmount = score * 100; // Her puan için 100 KITTY
  console.log(`${userAddress} için ${rewardAmount} KITTY ödülü talep ediliyor.`);
  // Burada ödül talep etme işlemini gerçekleştirin
}
