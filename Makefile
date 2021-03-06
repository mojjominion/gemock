build:
	docker build --rm -t ${tag} .
clean:
	docker rmi -f ${tag}
run:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
stop:
	docker container stop ${name} 
