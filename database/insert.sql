-- Insert some statuts
INSERT INTO statuts (id, label)
VALUES (1, 'En cours'), (2, 'Terminé'), (3, 'Annulé');

-- Insert some prestataires
INSERT INTO prestataires (assurance, nom, nom_contact, adresse, telephone, email, siret)
VALUES (
  '<assurance_file_data>',
  'Construction S.A.',
  'John Smith',
  '123 Main St',
  123456,
  'construction@example.com',
  1234567890
),
(
  '<assurance_file_data>',
  'Plomberie S.A.',
  'Jane Doe',
  '456 Market St',
  987654,
  'plomberie@example.com',
  1234567891
);

-- Insert some clients
INSERT INTO clients (nom, contact_nom, email, adresse, telephone, notes)
VALUES (
  'Alice Smith',
  'Alice Smith',
  'alice@example.com',
  '789 Elm St',
  123456,
  'Likes modern design'
),
(
  'Bob Jones',
  'Bob Jones',
  'bob@example.com',
  '321 Maple St',
  987654,
  'Prefers traditional style'
);

-- Insert some architectes
INSERT INTO architectes (numero_national, nom, prenom, email, mot_de_passe, telephone)
VALUES (
  12345,
  'John',
  'Doe',
  'john@example.com',
  '<hashed_password>',
  123456
),
(
  12346,
  'Jane',
  'Smith',
  'jane@example.com',
  '<hashed_password>',
  987654
);

-- Insert some projets
INSERT INTO projets (titre, surface_fonciere, surface_indicative, ville, adresse, date_debut, date_fin, description, statut_id, client_id, architecte_id)
VALUES (
  'Luxury House',
  10000,
  8000,
  'Paris',
  '789 Champs-Elysées',
  '2022-01-01',
  '2024-01-01',
  'Luxury house in the heart of Paris',
  1,
  1,
  1
),
(
  'Office Building',
  20000,
  15000,
  'London',
  '456 Oxford St',
  '2022-02-01',
  '2024-02-01',
  'Modern office building in London',
  1,
  2,
  2
);

-- Insert some parcelles
INSERT INTO parcelles (section, numero, surface, projet_id)
VALUES (
  'C',
  3,
  10000,
  2
);

-- Insert some phases
INSERT INTO phases (code, label, honoraires, description, projet_id)
VALUES (
  'PH1',
  'Phase 1',
  10000,
  'First phase of the project',
  1
),
(
  'PH2',
  'Phase 2',
  15000,
  'Second phase of the project',
  1
),
(
  'PH3',
  'Phase 3',
  20000,
  'Third phase of the project',
  2
);

-- Insert some taches
INSERT INTO taches (titre, annexe, description, date_echeance, phase_id, prestataire_id, realise_par_architecte, architecte_id)
VALUES (
  'Demolition',
  '<annexe_file_data>',
  'Demolition of the existing building',
  '2022-03-01',
  1,
  1,
  FALSE,
  1
),
(
  'Concrete foundation',
  '<annexe_file_data>',
  'Construction of the concrete foundation',
  '2022-04-01',
  1,
  1,
  FALSE,
  1
),
(
  'Structural steel',
  '<annexe_file_data>',
  'Installation of the structural steel frame',
  '2022-05-01',
  1,
  1,
  FALSE,
  1
),(
  'Plumbing rough-in',
  '<annexe_file_data>',
  'Plumbing rough-in for the building',
  '2022-06-01',
  2,
  2,
  FALSE,
  1
),
(
  'Electrical rough-in',
  '<annexe_file_data>',
  'Electrical rough-in for the building',
  '2022-07-01',
  2,
  3,
  FALSE,
  1
),
(
  'Drywall installation',
  '<annexe_file_data>',
  'Installation of drywall throughout the building',
  '2022-08-01',
  2,
  4,
  FALSE,
  1
),
(
  'Flooring installation',
  '<annexe_file_data>',
  'Installation of flooring throughout the building',
  '2022-09-01',
  2,
  5,
  FALSE,
  1
),
(
  'Interior finishes',
  '<annexe_file_data>',
  'Installation of interior finishes such as paint, trim, and fixtures',
  '2022-10-01',
  3,
  6,
  TRUE,
  1
),
(
  'Landscaping',
  '<annexe_file_data>',
  'Landscaping of the property',
  '2022-11-01',
  3,
  7,
  FALSE,
  1
),
(
  'Final inspection',
  '<annexe_file_data>',
  'Final inspection of the completed project',
  '2022-12-01',
  3,
  8,
  TRUE,
  1
);

-- Insert some tags
INSERT INTO tags (label)
VALUES (
  'Residential'
),
(
  'Commercial'
),
(
  'Modern'
),
(
  'Traditional'
);

-- Insert some tags_projets
INSERT INTO tags_projets (projet_id, tag_id)
VALUES (
  1,
  1
),
(
  1,
  3
),
(
  2,
  2
),
(
  2,
  4
);

-- Insert some documents
INSERT INTO documents (titre, fichier, projet_id)
VALUES (
  'Contract',
  '<file_data>',
  1
),
(
  'Plans',
  '<file_data>',
  1
),
(
  'Plans',
  '<file_data>',
  1
),
(
  'Budget',
  '<file_data>',
  1
),
(
  'Specifications',
  '<file_data>',
  2
),
(
  'Photos',
  '<file_data>',
  2
),
(
  'Permits',
  '<file_data>',
  2
);