module.exports = {
  type: 'seed', // seed ou migration
  key: 'collections', // nome do seed, deve ser único
  model: 'collections',
  data: [
    {
      name: 'HOME',
      path: '/',
      parent: 0,
    }
  ]
};

// module.exports = {
//   type: 'seed', // seed ou migration
//   key: 'collections', // nome do seed, deve ser único
//   model: 'collections',
//   data: [
//     {
//       name: 'PORTO',
//       path: 'opo',
//       parent: '5d48048ebde6b02bad140932'
//     },
//     {
//       name: 'PORTO ALEGRE',
//       path: 'poa',
//       parent: '5d48048ebde6b02bad140932'
//     }
//   ]
// };

// module.exports = {
//   type: 'seed', // seed ou migration
//   key: 'collections', // nome do seed, deve ser único
//   model: 'collections',
//   data: [
//     {
//       name: 'POLÍTICA',
//       path: 'opo/politica',
//       parent: "5d3c9e8d5e76c442c67d1e43",
//     },
//     {
//       name: 'PUBLICIDADE',
//       path: 'opo/publicidade',
//       parent: "5d3c9e8d5e76c442c67d1e43",
//     },
//     {
//       name: 'HUMOR',
//       path: 'opo/humor',
//       parent: "5d3c9e8d5e76c442c67d1e43",
//     },
//     {
//       name: 'POLÍTICA',
//       path: 'poa/politica',
//       parent: "5d3c9e8d5e76c442c67d1e44",
//     },
//     {
//       name: 'AMOR',
//       path: 'poa/amor',
//       parent: "5d3c9e8d5e76c442c67d1e44",
//     },
//     {
//       name: 'RELIGIÃO',
//       path: 'poa/religiao',
//       parent: "5d3c9e8d5e76c442c67d1e44",
//     }
//   ]
// };

// module.exports = {
//   type: 'seed', // seed ou migration
//   key: 'collections', // nome do seed, deve ser único
//   model: 'collections',
//   data: [
//     {
//       name: 'ANARQUISMO',
//       path: 'opo/politica/anarquismo',
//       parent: "5d3c9f4e128c4643050ee856",
//     },
//     {
//       name: 'MIGRAÇÃO',
//       path: 'opo/politica/migracao',
//       parent: "5d3c9f4e128c4643050ee856",
//     },
//     {
//       name: 'PREFEITURA',
//       path: 'poa/politica/prefeitura',
//       parent: "5d3c9e8d5e76c442c67d1e44",
//     },
//     {
//       name: 'PIADAS',
//       path: 'opo/humor/piadas',
//       parent: "5d3c9f4e128c4643050ee858",
//     },
//     {
//       name: 'POEMAS',
//       path: 'opo/humor/poemas',
//       parent: "5d3c9f4e128c4643050ee858",
//     },
//     {
//       name: 'BIKE',
//       path: 'poa/amor/bike',
//       parent: "5d3c9f4e128c4643050ee85a",
//     },
//     {
//       name: 'IGREJA',
//       path: 'poa/religiao/igreja',
//       parent: "5d3c9f4e128c4643050ee85b",
//     }
//   ]
// };
