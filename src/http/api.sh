curl -X 'POST' http://localhost:3000/api?count=$1 \
   -H "Content-Type: application/json" \
   -d '{"config": {"ip": "ip", "pass": "password", "animal":"dog"}}'  | json_pp
