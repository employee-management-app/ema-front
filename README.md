# Employee management application - front

### Requirements

- node v.20.x.x installed on your local machine
- npm v.10.x.x installed on your local machine 

Check in the terminal:

```
node -v
v20.x.x

npm -v
v10.x.x
```

## Deployments

- `main` branch deploys automatically when new changes are committed on this url:

   https://ema-front-iota.vercel.app/

## To run application locally:

1. Clone repo on your local machine:

```
git clone https://github.com/employee-management-app/ema-front
```

2. Open folder with project:

```
cd ema-front
```

3. Copy `.env` file to `.env.local` file and set up needed variables:

```
# .env.local

API_URL=http://localhost:3001
REACT_APP_GOOGLE_MAPS_API_KEY=
REACT_APP_GOOGLE_MAPS_ID=
```

4. Run `npm i`:

```
ema-front> npm i
```

5. Run `npm run start`:

```
ema-front> npm start
```

6. Open browser and navigate to `http://localhost:3000`
