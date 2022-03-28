DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE exmployee_manager_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);