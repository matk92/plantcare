## Demarrage du projets

# La bdd psql

```bash
docker compose up -d
```

# BackEnd

```bash
cd backend
npm i
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

# Frontend

```bash
cd frontend
npm install
npm run dev
```

# INfo

[http://localhost:3000/docs](http://localhost:3000/docs)