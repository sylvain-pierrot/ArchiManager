DROP TABLE IF EXISTS statuts CASCADE;
DROP TABLE IF EXISTS missions CASCADE;
DROP TABLE IF EXISTS designations CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS architectes CASCADE;
DROP TABLE IF EXISTS prestataires CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS projets CASCADE;
DROP TABLE IF EXISTS parcelles CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS taches CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS tags_projets CASCADE;
DROP TABLE IF EXISTS fichiers CASCADE;

CREATE TABLE statuts (
  id INTEGER PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE missions (
  id INTEGER PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE designations (
  id INTEGER PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE architectes (
  id serial PRIMARY KEY,
  numero_national INTEGER NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(500) NOT NULL,
  telephone VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id) NOT NULL DEFAULT 2
);

CREATE TABLE prestataires (
  id serial PRIMARY KEY,
  assurance BYTEA NOT NULL,
  nom VARCHAR(255) NOT NULL,
  nom_contact VARCHAR(255) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  telephone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  siret INTEGER NOT NULL,
  architecte_id INTEGER REFERENCES architectes(id)
);

CREATE TABLE clients (
  id serial PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  nom_contact VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  ville VARCHAR(255) NOT NULL,
  telephone VARCHAR(255) NOT NULL,
  notes TEXT,
  architecte_id INTEGER REFERENCES architectes(id)
);

CREATE TABLE projets (
  id serial PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  surface_fonciere INTEGER NOT NULL,
  surface_indicative INTEGER NOT NULL,
  ville VARCHAR(255) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  description TEXT,
  statut_id INTEGER REFERENCES statuts(id),
  client_id INTEGER REFERENCES clients(id),
  mission_id INTEGER REFERENCES missions(id),
  designation_id INTEGER REFERENCES designations(id),
  architecte_id INTEGER REFERENCES architectes(id),
  CHECK (date_debut <= date_fin)
);

CREATE TABLE parcelles (
  section VARCHAR(255),
  numero INTEGER,
  surface INTEGER NOT NULL,
  urbanisme TEXT,
  projet_id INTEGER REFERENCES projets(id) ON DELETE CASCADE,
  PRIMARY KEY (section, numero)
);

CREATE TABLE phases (
  id serial PRIMARY KEY,
  code VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  honoraires INTEGER NOT NULL,
  honoraires_paye INTEGER NOT NULL DEFAULT 0,
  progression BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  projet_id INTEGER REFERENCES projets(id) ON DELETE CASCADE,
  CHECK (honoraires_paye <= honoraires)
);

CREATE TABLE taches (
  id serial PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  annexe BYTEA NOT NULL,
  description TEXT NOT NULL,
  date_echeance DATE NOT NULL,
  phase_id INTEGER REFERENCES phases(id),
  prestataire_id INTEGER REFERENCES prestataires(id),
  realise_par_architecte BOOLEAN NOT NULL DEFAULT FALSE,
  architecte_id INTEGER REFERENCES architectes(id)
);

CREATE TABLE tags (
  id serial PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  architecte_id INTEGER REFERENCES architectes(id)
);

CREATE TABLE tags_projets (
  tag_id INTEGER REFERENCES tags(id),
  projet_id INTEGER REFERENCES projets(id) ON DELETE CASCADE,
  PRIMARY KEY (tag_id, projet_id)
);

CREATE TABLE fichiers (
  id serial PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  fichier BYTEA NOT NULL,
  date DATE NOT NULL,
  projet_id INTEGER REFERENCES projets(id) ON DELETE CASCADE
);

ALTER TABLE taches
ADD CONSTRAINT check_realise_par_architecte_and_ids
CHECK (
    (realise_par_architecte = TRUE AND prestataire_id IS NULL AND architecte_id IS NOT NULL)
    OR (realise_par_architecte = FALSE AND prestataire_id IS NOT NULL AND architecte_id IS NULL)
);

-- Store procedure 1
CREATE OR REPLACE FUNCTION update_project_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the statut_id is already 3
  IF (SELECT statut_id FROM projets WHERE id = NEW.projet_id) <> 3 THEN
    -- Update the statut_id based on the progression of the phases
    IF NOT EXISTS (SELECT * FROM phases WHERE projet_id = NEW.projet_id AND progression = false) THEN
      UPDATE projets SET statut_id = 2 WHERE id = NEW.projet_id;
    ELSE
      UPDATE projets SET statut_id = 1 WHERE id = NEW.projet_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger 1
CREATE TRIGGER update_project_status_trigger
AFTER INSERT OR UPDATE OF progression ON phases
FOR EACH ROW
EXECUTE PROCEDURE update_project_status();

-- Store procedure 2
CREATE PROCEDURE update_expired_projects()
BEGIN
  UPDATE projets
  SET statut_id = 4
  WHERE date_fin < NOW();
END;

-- Event
CREATE EVENT update_expired_projects_event
ON SCHEDULE EVERY 1 DAY
DO
  CALL update_expired_projects();
