FROM postgres

# Add script for init db
ADD /db/db.sql /docker-entrypoint-initdb.d

# Port expose
EXPOSE 5432