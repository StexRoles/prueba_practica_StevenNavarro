CREATE DATABASE PruebaUNP_StevenNavarro;

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY NOT NULL,
    nombreUsuario VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE Beneficiarios (
    cedula INTEGER PRIMARY KEY UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
	poblacion VARCHAR (100) NOT NULL
);

CREATE TABLE Chalecos (
    serial INTEGER PRIMARY KEY,
    beneficiario_cedula INTEGER NOT NULL,
    CONSTRAINT fk_beneficiario FOREIGN KEY (beneficiario_cedula)
        REFERENCES Beneficiarios(cedula)
        ON DELETE CASCADE
);
