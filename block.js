const {GENESIS_DATA} = require('./config');
const cryptohash = require('./crypto-hash');

class Block{
   constructor({timestamp,lastHash,hash,data,nonce,difficultly}){
       this.timestamp = timestamp;
       this.lastHash = lastHash;
       this.hash = hash;
       this.data = data;
       this.nonce = nonce;
       this.difficultly = difficultly;
   }

  static genesis(){
      return new this(GENESIS_DATA );
  }

  static mineBlock ({lastBlock,data}){
      const timestamp = Date.now();
      const lastHash = lastBlock.hash;
      const {difficultly} = lastBlock;
      let nonce = 0;

      return new this({
         timestamp,
         lastHash,
         data,
         difficultly,
         nonce,
         hash: cryptohash(timestamp,lastHash,data,nonce,difficultly)
      });
  }
}

module.exports = Block;

