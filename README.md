## Demarrage du projets

# Base PostgreSQL et Mailpit (courriels dev)

Mailpit capte les e-mails sortants : interface [http://localhost:8025](http://localhost:8025), SMTP sur le port `1025`.

```bash
docker compose up -d
```

# BackEnd

```bash
cd backend
cp .env.example .env
npx prisma generate
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

## Tester l’envoi de courriel (verification et 2FA)

1. Avec Postgres et Mailpit demarres (`docker compose up -d`), lance le backend puis ouvre Mailpit ([http://localhost:8025](http://localhost:8025)).

2. Inscription — `POST /auth/register` (Swagger ou client HTTP) avec un e-mail quelconque ; un message avec le jeton de verification doit apparaitre dans Mailpit sous « Inbox ».

3. Verification — copier le jeton puis `POST /auth/verify-email` avec `{ "token": "<jeton>" }`.

4. Connexion avec 2FA — `POST /auth/login` ; un second message contenant le code a six chiffres arrive dans Mailpit.

5. Valider la 2FA — `POST /auth/2fa/verify` avec `{ "email": "...", "code": "123456" }` pour recevoir le JWT.

Les variables SMTP par defaut ciblent Mailpit (`localhost:1025`, sans TLS). Dans `.env`, ajustez `APP_PUBLIC_URL` si l’API n’écoute pas sur `http://localhost:3000`.

