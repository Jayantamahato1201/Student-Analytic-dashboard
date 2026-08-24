# Student Analytics Dashboard

## 1. Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```

---

## 2. Setting `VITE_API_URL`

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set the `VITE_API_URL` variable to point to your Question 2 backend server:

```env
# If running backend on port 5000:
VITE_API_URL=http://localhost:5000

# If using the same server/relative proxy:
VITE_API_URL=
```

*Note: If left blank or omitted, the frontend defaults to relative paths (`/api/students`).*

---

## 3. Starting the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

