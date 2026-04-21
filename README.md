## Demarrage du projets

# La bdd psql

```bash
docker compose up -d
```

# BackEnd

```bash
cd backend
cp .env.example .env
npm i
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Le back tourne sur [http://localhost:3000](http://localhost:3000).

# doc Swagger

[http://localhost:3000/docs](http://localhost:3000/docs)

# Compte admin

- email: [admin@plant.com](mailto:admin@plant.com)
- password: plante1234

