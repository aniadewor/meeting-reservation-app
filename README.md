Meeting Reservation App

Anna Dewor – Github https://github.com/aniadewor/meeting-reservation-app.git

To jest projekt studencki stworzony w React z użyciem JSON Server do zarządzania rezerwacjami spotkań.

Przegląd aplikacji

Aplikacja pozwala na:

Rejestrację nowych użytkowników i logowanie.

Tworzenie, edycję i anulowanie własnych spotkań.

Przeglądanie spotkań w formie listy lub kalendarza (miesięczny/tygodniowy widok).

Panel administratora, w którym można zarządzać wszystkimi kontami i rezerwacjami.

Technologie

Frontend: React 18 + TypeScript, React Router, React Hook Form, Axios

Mock Backend: JSON Server (plik db.json)

Modele danych

User

id: string

firstName, lastName: string

email: string

password: string

role: "user" | "admin"

createdAt: ISO timestamp

Meeting

id: string

title: string

description: string

date: YYYY-MM-DD

startTime, endTime: hh:mm

participants: string[] (emaile)

createdBy: string (email użytkownika)

status: "scheduled" | "canceled"

createdAt: ISO timestamp

Instalacja i uruchomienie

Sklonuj repozytorium:

git clone https://github.com/aniadewor/meeting-reservation-app.git
cd meeting-reservation-app

Zainstaluj zależności:

npm install

Uruchom mock backend:

npm run backend

Uruchom frontend:

npm start

Otwórz przeglądarkę pod adresem http://localhost:3000.

Użytkowanie

Rejestruj się lub zaloguj jako istniejący administrator (admin@example.com / admin123).

Po zalogowaniu użytkownik może dodawać nowe spotkania i zarządzać własnymi rezerwacjami.

Przełącz się na widok kalendarza, aby zobaczyć plan miesięczny lub tygodniowy.

Administrator ma dodatkowy przycisk „Panel Administratora” do przeglądu i zarządzania wszystkimi kontami i spotkaniami.

