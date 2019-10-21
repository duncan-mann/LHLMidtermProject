-- Users table seeds here (Example)
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('dmann', 'Duncan', 'Mann', 'duncan@mann.com', '$2b$10$8//ASaOqtVGM482g/QcVSeXXnjSRg2T823IXsZ058pMzS0Pme1Me.');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('lxg1992', 'Alex', 'Garey', 'alex@garey.com', '$2b$10$8//ASaOqtVGM482g/QcVSeXXnjSRg2T823IXsZ058pMzS0Pme1Me.');
INSERT INTO users (username, first_name, last_name, email, password) VALUES ('mike123', 'Mike', 'Nguyen', 'mike@nguyen.com', '$2b$10$8//ASaOqtVGM482g/QcVSeXXnjSRg2T823IXsZ058pMzS0Pme1Me.');

INSERT INTO to_dos (user_id, description, category) VALUES (1, 'Harry Potter', 'movies');
INSERT INTO to_dos (user_id, description, category) VALUES (1, 'To Kill a Mockingbird', 'books');
INSERT INTO to_dos (user_id, description, category) VALUES (1, 'Outback Steakhouse', 'restaurant');
INSERT INTO to_dos (user_id, description, category) VALUES (1, 'Soccer Ball', 'product');

INSERT INTO to_dos (user_id, description, category) VALUES (2, 'The Keg', 'restaurant');
INSERT INTO to_dos (user_id, description, category) VALUES (2, 'Macbook', 'product');

INSERT INTO to_dos (user_id, description, category) VALUES (3, 'Breaking Bad', 'movies');
INSERT INTO to_dos (user_id, description, category) VALUES (3, 'Sapiens', 'books');
