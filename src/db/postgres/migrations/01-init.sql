CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  pass_hash VARCHAR(60) NOT NULL
);

DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transactiontype') THEN
      CREATE TYPE transactionType AS ENUM ('earning', 'expense', 'investment');
    END IF;
  END
$$;

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type transactionType NOT NULL,
  name VARCHAR(50) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  date DATE NOT NULL
);