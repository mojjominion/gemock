curl -X 'POST' http://localhost:3000/api/$1 \
   -H "Content-Type: application/json" \
   -d '{"config": {"usename": "firstName", "pass": "bird", "animal":"dog"}}'  | json_pp
