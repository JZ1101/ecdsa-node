const { ethers } = require('ethers');

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

console.log("Address:", wallet.address);
console.log("Public Key:", wallet.publicKey);
console.log("Private Key:", wallet.privateKey);
