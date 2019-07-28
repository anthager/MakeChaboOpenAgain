exports.seed = async knex => {
  await knex('unlocks').del()
}
