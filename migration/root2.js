module.exports = {
  type: 'seed', // seed ou migration
  key: 'collections', // nome do seed, deve ser único
  model: 'collections',
  data: [
    {
      name: 'PORTO',
      path: 'opo',
      parent: '5d5c652aa1c87b10ad0b6492'
    },
    {
      name: 'PORTO ALEGRE',
      path: 'poa',
      parent: '5d5c652aa1c87b10ad0b6492'
    }
  ]
};

