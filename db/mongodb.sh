mongo dashboards --eval "db.reports.toArray()"

mongoimport --db dashboards --collection agresiones --type csv --file ~/Escritorio/dashboards/dashboards/agresiones.csv --headerline
