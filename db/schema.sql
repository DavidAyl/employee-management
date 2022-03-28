DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE exmployee_manager_db;

USE employee_tracker_db;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary INT NULL,
    department_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCE department(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(30) NULL,
    manager_id INT NULL,
    role_id INT NULL
);