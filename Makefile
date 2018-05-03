dev:
	docker-compose -f dev.yml -p dev up
test:
	jest --projects web/ api/

