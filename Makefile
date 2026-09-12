.PHONY: help install migrate runserver test seed
help:
	@echo install / migrate / runserver / test / seed
install:
	pip install -r backend/requirements.txt
migrate:
	cd backend && python manage.py migrate
runserver:
	cd backend && python manage.py runserver 0.0.0.0:8000
test:
	cd backend && python manage.py test hospital --verbosity=2
seed:
	cd backend && python manage.py seed_data
