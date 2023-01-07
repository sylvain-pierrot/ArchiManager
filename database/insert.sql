-- Insert some statuts
INSERT INTO statuts (id, label)
VALUES (1, 'En cours'), (2, 'Terminé'), (3, 'Annulé'), (4, 'Échéance passée');

-- Insert some missions
INSERT INTO missions (id, label)
VALUES (1, 'Complète'), (2, 'Partielle');

-- Insert some désignations
INSERT INTO designations (id, label)
VALUES (1, 'Usage personnel'), (2, 'Autre usage');

-- Insert some roles
INSERT INTO roles (id, label)
VALUES (1, 'admin'), (2, 'user');