# Project Name

Projekt do komunikacji z użytkownikami oraz sztuczną inteligencją (AI). Umożliwia rejestrację, logowanie, wymianę wiadomości, a także interakcje z AI, które analizuje rozmowy i udziela sugestii.

## Opis

Projekt został stworzony przy użyciu **Node.js** i **MongoDB**. Aplikacja pozwala użytkownikom na wymianę wiadomości między sobą, a także z AI. Zintegrowano model **Gemini** (do podstawowych rozmów) oraz **Hume AI** (do analizy emocji i generowania odpowiedzi).

## Technologie

- **Node.js** – Backend
- **Express.js** – Framework do budowy API
- **MongoDB** – Baza danych
- **Mongoose** – Biblioteka do interakcji z MongoDB
- **JWT** – Do autentykacji i autoryzacji użytkowników
- **Tailwind CSS** – Framework do stylów (z późniejszą modyfikacją własnymi stylami)
- **Gemini** i **Hume AI** – Sztuczna inteligencja do analizy i generowania odpowiedzi

## Instalacja

Aby zainstalować projekt na swoim lokalnym środowisku:

1. Pobierz projekt z GitHub:
   - Frontend: [Link do repozytorium Frontend](#)
   - Backend: [Link do repozytorium Backend](#)
   
2. Rozpakuj plik ZIP i przejdź do folderów **Frontend** i **Backend**.

3. Zainstaluj wymagane zależności:
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - **Backend**:
     ```bash
     cd backend
     npm install
     npm run server
     ```

4. Upewnij się, że masz działającą bazę danych **MongoDB**.

5. Projekt powinien być dostępny pod lokalnym adresem: `http://localhost:3000`

## Struktura Bazy Danych

1. **User Model** – Przechowuje informacje o użytkownikach (imię, nazwisko, username, hasło, płeć, zdjęcie profilowe).
2. **Message Model** – Reprezentuje wiadomości wysyłane między użytkownikami oraz z AI (zawiera tekst, obrazki i informacje o przeczytaniu).
3. **Conversation Model** – Przechowuje rozmowy między użytkownikami (zawiera uczestników oraz wiadomości).
4. **AI Conversation Model** – Reprezentuje interakcje z AI (historia rozmów użytkownika z AI, z rolą "user" lub "model").

## Problem z Tokenem

Projekt był tworzony w pośpiechu, dlatego nie jest idealny pod względem wyglądu i responsywności. Jednym z powodów tego jest to, że zaczynałem pisać projekt z użyciem **Tailwind CSS**, ale pod koniec projektu zrozumiałem, że chciałbym, aby projekt wyglądał lepiej, więc zacząłem dodawać własne style, które były w konflikcie ze stylami Tailwind.

Oprócz tego występuje problem z **tokenem** – na komputerze wszystko działa poprawnie, ale na smartfonach (Safari i Chrome) pojawiają się problemy i token nie jest widoczny lub po prostu nie jest tworzony. Po przeczytaniu informacji na Reddit zauważyłem, że może to być związane z jedną z aktualizacji Render, Safari lub Chrome, dlatego na razie zostawiam to w obecnym stanie. Mimo to, funkcjonalność działa w miarę dobrze.

## Endpointy API

- **POST /api/auth/login** – Logowanie użytkownika
- **POST /api/auth/signup** – Rejestracja użytkownika
- **POST /api/auth/logout** – Wylogowanie użytkownika
- **GET /api/messages** – Pobranie wiadomości
- **POST /api/messages/send/:id** – Wysłanie wiadomości do użytkownika
- **GET /api/conversation** – Pobranie historii rozmów użytkownika
- **GET /api/users** – Pobranie listy użytkowników
- **POST /api/ai-chats** – Rozmowy z AI

## Przyszłe Rozszerzenia

- Integracja z bardziej zaawansowanymi modelami AI.
- Rozszerzenie opcji chatów grupowych.
- Optymalizacja responsywności na urządzeniach mobilnych.
