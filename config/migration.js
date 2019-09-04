const fs = require('fs');
const _ = require('lodash');
const Migration = require('../server/system/migration/migration.model');

const migrationFolder = './migration/';
let migrationKeys = [];

function mustExecute (key) {
  return migrationKeys.indexOf(key) === -1;
}

function loadModel(modelPath) {
  try {
    const paths = modelPath.split('/');
    const lastPath = paths[paths.length - 1];

    return require(`../server/${modelPath}/${lastPath}.model`);
  } catch ($er) {
    console.log($er);
  }

  return null;
}

function loadMigrationFile(fileName) {
  return require(`.${migrationFolder}${fileName}`);
}

function proccessSeed(file) {
  const model = loadModel(file.model);

  if(!model || !model.insertMany) {
    return;
  }

  model
    .insertMany(file.data || [], () => {
      Migration.create({key: file.key});
    });
}

function proccessFile(fileName) {
  const file = loadMigrationFile(fileName);

  if(!file || !mustExecute(file.key)) {
    return;
  }

  const type = file.type || 'seed';

  if(type === 'seed') {
    proccessSeed(file);
  }

  if(type === 'migration') {
    // TODO
  }

  return;
}

const migration = {
  runMigrations: async () => {
    migrationKeys = await Migration.find({}) || [];
    migrationKeys = _.map(migrationKeys, m => m.key);

    try{
      fs.readdirSync(migrationFolder).forEach(fileName => {
        proccessFile(fileName);
      });
    }catch($er) {
      console.log($er);
    }
  }
};

module.exports = migration;
