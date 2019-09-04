module.exports = {
  type: 'seed', // seed ou migration
  key: 'admin-user', // nome do seed, deve ser único
  model: 'user',
  data: [
    {
      firstname: 'Admin',
      email: 't@t.com',
      password: '123',
      code: '000-000-000-00',
      isAdmin: true,
      isActive: true
    }
  ]
};
