c=${1:-50}
l=${2:-en}

curl -X 'POST' http://localhost:3000/api?count=$c\&locale=$l\
   -H "Content-Type: application/json" \
   -d '{"config": {"streetName": "createCard"}}'  | json_pp
