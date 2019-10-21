-- Users table seeds here (Example)
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('dmann', 'Duncan', 'Mann', 'duncan@mann.com', 'password');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('lxg1992', 'Alex', 'Garey', 'alex@garey.com', 'password');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('mike123', 'Mike', 'Nguyen', 'mike@nguyen.com', 'password');

INSERT INTO to_dos (user_id, description, category) VALUES (1, 'harry potter', 'movies');
INSERT INTO to_dos (user_id, description, category) VALUES (1, 'to kill a mockingbird', 'books');
INSERT INTO to_dos (user_id, description, category) VALUES (2, 'the keg', 'restaurant');
INSERT INTO to_dos (user_id, description, category) VALUES (2, 'macbook', 'product');
INSERT INTO to_dos (user_id, description, category) VALUES (3, 'breaking bad', 'movies');
INSERT INTO to_dos (user_id, description, category) VALUES (3, 'sapiens', 'books');