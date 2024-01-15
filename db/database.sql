CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE usuarios (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    identificacion INT(11) NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    contraseña VARCHAR(50) NOT NULL,
    rol ENUM('administrador','usuario')
);



DESCRIBE usuarios;

ALTER TABLE usuarios
ADD estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'inactivo';


INSERT INTO usuarios VALUES
(1OO7520867,'Santiago','Motato','santiago@gmail.com','3113880114','doggy','usuario');
