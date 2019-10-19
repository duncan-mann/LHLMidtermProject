-- Users table seeds here (Example)
INSERT INTO users (id, username, first_name, last_name, email, password) VALUES (1, 'dmann', 'Duncan', 'Mann', 'duncan@mann.com', 'password');
INSERT INTO users (id, username, first_name, last_name, email, password) VALUES (2, 'lxg1992', 'Alex', 'Garey', 'alex@garey.com', 'password');
INSERT INTO users (id, username, first_name, last_name, email, password) VALUES (3, 'mike123', 'Mike', 'Nguyen', 'mike@nguyen.com', 'password');

INSERT INTO to_dos (id, user_id, description, category) VALUES (1, 1, 'harry potter', 'movies');
INSERT INTO to_dos (id, user_id, description, category) VALUES (2, 1, 'to kill a mockingbird', 'books');
INSERT INTO to_dos (id, user_id, description, category) VALUES (3, 2, 'the keg', 'restaurant');
INSERT INTO to_dos (id, user_id, description, category) VALUES (4, 2, 'macbook', 'product');
INSERT INTO to_dos (id, user_id, description, category) VALUES (5, 3, 'breaking bad', 'movies');
INSERT INTO to_dos (id, user_id, description, category) VALUES (6, 3, 'sapiens', 'books');