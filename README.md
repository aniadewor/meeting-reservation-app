Aplikacja do Zarządzania Rezerwacjami Spotkań

Technologie: React 18, TypeScript, React Router, React Hook Form, Axios, JSON Server, FullCalendar 6, TailwindCSS/MUI optionalne

Opis projektu

Aplikacja umożliwia rejestrację i logowanie użytkowników (user i admin), zarządzanie rezerwacjami spotkań (dodawanie, edycja, usuwanie), filtrowanie, sortowanie oraz podgląd w widoku listy i kalendarza.

Architektura

Frontend: React + TypeScript

Strony: Login, Register, Dashboard, AddMeeting, MeetingList, EditMeeting, AdminDashboard, CalendarView

Komponenty: PrivateRoute (Rola-based route guard)

Style: glassmorphism w czystym CSS, ujednolicony motyw gradientu

Backend (mock): JSON Server (db.json)

Kolekcje: users, meetings

Uruchomienie: json-server --watch db.json --port 3001

Modele danych

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // w mocku plain text
  role: 'user' | 'admin';
  createdAt: string;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;        // YYYY-MM-DD
  startTime: string;   // hh:mm
  endTime: string;     // hh:mm
  participants: string[];
  createdBy: string;   // email
  status: 'scheduled' | 'canceled';
  createdAt: string;
}

Instalacja i uruchomienie

Klonuj repozytorium

git clone <url>
cd meeting-reservation-app

Zainstaluj zależności

npm install

Uruchom JSON Server (backend)

npm run backend
# lub
npx json-server --watch db.json --port 3001

Uruchom frontend

npm start
# lub, jeśli używasz Vite
npm run dev

Dostęp do aplikacji

Frontend: http://localhost:3000

Backend API: http://localhost:3001

Skrypty (package.json)

Skrypt

Komenda

backend

json-server --watch db.json --port 3001

start

react-scripts start (lub vite)

build

react-scripts build

test

react-scripts test

Endpoints

GET /users - lista użytkowników

POST /users - rejestracja

GET /users?email=&password= - logowanie

GET /meetings - lista spotkań

POST /meetings - dodanie spotkania

PUT /meetings/:id - edycja spotkania

DELETE /meetings/:id - usunięcie spotkania

Dalsze kroki / Rozszerzenia

Hashowanie haseł (bcrypt) i produkcyjny backend (NestJS, Firebase, Supabase)

Powiadomienia push / email

Integracja z Google Calendar API

Testy jednostkowe i e2e

