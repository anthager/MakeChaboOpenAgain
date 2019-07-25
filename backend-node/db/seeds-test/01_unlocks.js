exports.seed = async knex => {
  await knex('unlocks').del()
  await knex('unlocks').insert([
    { id: 1, success: true },
    { id: 2, success: false },
    { id: 3, success: true },
  ])
}
