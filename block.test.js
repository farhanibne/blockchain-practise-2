const Block = require('./block');
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');


describe('Block',()=>{
    const timestamp = '05/10/2021';
    const hash = 'ff-hash';
    const lastHash = 'bar-hash';
    const data = ['blockchain','data'];
    const nonce = 1;
    const difficultly = 1;
    const block = new Block({timestamp,lastHash,hash,data,nonce,difficultly});


    it('has a timestamp,lastHash,hash,data',()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
       
        expect(block.nonce).toEqual(nonce);

        expect(block.difficultly).toEqual(difficultly);

    });

    describe('genesis()',()=>{

        const genesisBlock = Block.genesis();
        
        // console.log('gensisBlock',genesisBlock);

        it('returns a Block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('retuens the genesis data',()=>{
        expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()',()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const mineBlock = Block.mineBlock({lastBlock,data});


        it('retuens a Block instance ',()=>{
            expect(mineBlock instanceof Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock ',()=>{
            expect(mineBlock.data).toEqual(data);
        });

        it('sets a `timestamp`',()=>{
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a a SHA-256 `hash` based on the proper inputs ',()=>{
            expect(mineBlock.hash).toEqual(cryptoHash(mineBlock.timestamp,mineBlock.nonce,mineBlock.difficultly,lastBlock.hash,data));
        });

        it('sets a`hash` that matches the difficultly criteria',()=>{
            expect(mineBlock.hash.substring(0,mineBlock.difficultly))
            .toEqual('0'.repeat(mineBlock.difficultly));
        });
    });

});