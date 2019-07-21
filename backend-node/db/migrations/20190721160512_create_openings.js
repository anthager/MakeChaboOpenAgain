exports.up = function(knex) {
  return knex.schema.createTable('unlocks', function(table) {
    table.increments()
    table.boolean('success').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('unlocks')
}
