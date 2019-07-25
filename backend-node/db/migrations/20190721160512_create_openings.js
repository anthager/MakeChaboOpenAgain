exports.up = knex => {
  return knex.schema.createTable('unlocks', table => {
    table.increments()
    table.boolean('success').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('unlocks')
}
