DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
     VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(30),
    manager_id INT,
	FOREIGN KEY (manager_id) REFERENCES employee(id),
    roles_id INT,
    FOREIGN KEY (roles_id)
        REFERENCES roles (id)
);