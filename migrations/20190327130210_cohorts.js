
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        // primary key (id), integer, auto-incr
        tbl.increments();
        tbl.string('name', 128).notNullable();

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExist('cohorts');
};
