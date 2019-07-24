exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('unlocks')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('unlocks').insert([
        { id: 1, success: true, created_at: new Date(1), updated_at: new Date(1) },
        { id: 2, success: false, created_at: new Date(1), updated_at: new Date(1) },
        { id: 3, success: true, created_at: new Date(1), updated_at: new Date(1) },
      ])
    })
}
