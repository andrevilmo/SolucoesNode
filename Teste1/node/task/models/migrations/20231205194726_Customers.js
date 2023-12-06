/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Customers', function (table) {
      table.integer('id');
      table.string('name');
      table.string('created_at');
      table.string('updated_at');
      table.integer('Index');
      table.string('Customer Id');
      table.string('First Name');
      table.string('Last Name');
      table.string('Company');
      table.string('City');
      table.string('Country');
      table.string('Phone 1');
      table.string('Phone 2');
      table.string('Email');
      table.string('Subscription');
      table.string('Date');
      table.string('Website');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('Customers');
};
