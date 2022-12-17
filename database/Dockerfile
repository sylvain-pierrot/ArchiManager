FROM postgres

# Add script for init db
ADD db.sql /docker-entrypoint-initdb.d
ADD insert.sql /docker-entrypoint-initdb.d

# Port expose
EXPOSE 5432