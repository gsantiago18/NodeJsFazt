CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAAR (50) NOT NULL,
    email VARCHAAR (50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

insert into users (name, email) VALUES ('Gabriel Gonzalez', 'santiagog9912@gmail.com'),
                                       ('Nicol Carabali ', 'nhadiana0408@gmail.com')                                       
