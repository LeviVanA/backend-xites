const {
    tables,
  } = require('../index');
  
  module.exports = {
    seed: async (knex) => {
      await knex(tables.user).insert([
        {
          id: '1',
          name: 'Levi Van Achter',
          role: 'employee',
          salt: 'EmdaG/Ks3SRf1kKVzabARJwNqRLnXlpCN60kCmLX5tt2faDlaXrkE1BI1R8mFKMo/Sj6VOjeZEvCb/CaPLw68bUs6p9qpPhSYT1DJVoYyWoovbN4VTTVwE6lsqy40/XHpECzr9wjpfdYAs/770EBzzou/e1rue/7VoZhJau0UFI=',
          hash: 'hQXWdE01+n+yibcH1LqjpuMUhcufBMBT2NkNmuV6x7DoeSPbFRvM3laXdIfnqyOi9rknLoBeok5m6y+4yHbsQQ==',
          
        }, {
          id: '2',
          name: 'azerty',
          role: 'admin',
          salt: '9E0GXD66M8RELO3TmF5u4fwH00m6d/lgr/uwtOAn2ZZOH2GkCcCTGAqOBX/lBbQyURzzXX62su3mDv/AIVq2HH6x2anecMeV74TAgTeugqG3vclg06ihthA0JpRX+TSxTbNqeHiSrEzQjRdi3ffExXO3Ctt7xZm6dMy8BinXBZo=',
          hash: 'YKFJWMM9fJRy3+3ki/rOGfO1dFTIfOoRNZ1KHow3jSpGoUcPXwIuOmcootFFp8k4Xpgy4gxR/9sn2+l8ejFZNQ==',
          
        }, {
          id: '3',
          name: 'test',
          role: 'employee',
          salt: 'b1hJZPuM4LvPcjovXVlnmIrdcwK0tsra6+0b+5wDA38lNRCMHx1doeVeXOS9NaAgtjH/HJ6t2cYt6tf3r8aebI0WJfzyftoRFCfkvg2VLS841DzEWLtO+NKaGvacaxhTmxMVv0sgmUYRsu8ck6skhpayyvl3Pf53ajirkfSxKIU=',
          hash: '+C+tbWUa+PF8u7iWMDW4bj4Bh9nwDCcdGUeG4yEWDHG8GlURa/HvSwcudfzc7T+JhasQON1kLl+dkCI5fOBH3w==',
          
        },
      ]);
    },
  };