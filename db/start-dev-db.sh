#!/bin/bash
docker run -p 5433:5432 --rm --name vlcs-tech-hiring -e POSTGRES_PASSWORD=vlcs-tech-hiring postgres
