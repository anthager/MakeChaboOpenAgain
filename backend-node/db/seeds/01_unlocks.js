exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('unlocks')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('unlocks').insert([
        { id: 1, success: true },
        { id: 2, success: false },
        { id: 3, success: true },
      ])
    })
}
