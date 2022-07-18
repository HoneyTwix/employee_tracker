USE employees_db;

INSERT INTO department(name)
VALUES
('Sales'),
('HR'),
('Mental Wellness'),
('Marketing'),
('Support'),
('Talent');

INSERT INTO roles (title, department_id, salary)
VALUES
('Basketball Player',1,900),
('MMA Fighter',2,500),
('Dancer',3,250),
('Engineer',4,767),
('Scholar',5,634),
('Lawyer',6,800);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
('Liza','Koshy',1,4),
('Kyle','King',2,4),
('Matthew','Sniper',3,4),
('Jolly','Beth',4,4),
('Donald','Skewer',5,4),
('Cherry','PickleButt',6,4);


