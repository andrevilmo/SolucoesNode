/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Organizations', function (table) {
        table.integer('Index');
        table.string('Organization Id');
        table.integer('Number of employees');
        table.string('Industry');
        table.string('Founde');
        table.string('Description');
        table.string('Country');
        table.string('name');
        table.string('Website');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('Organizations');
};
