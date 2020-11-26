exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      first_name VARCHAR(40),
      last_name VARCHAR(60),
      username VARCHAR(40) UNIQUE,
      password_hash VARCHAR(100),
      slug VARCHAR(40) UNIQUE
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS users;
	`;
};
