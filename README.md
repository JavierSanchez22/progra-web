# Secret Link Generator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)

This is a web application similar to `scrt.link` that allows you to create secrets that are destroyed after being read a single time.

## How to Run

### Prerequisites

-   Docker
-   Docker Compose

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <git@github.com:JavierSanchez22/progra-web.git>
    cd <progra-web>
    ```

2.  **Build and run the services with Docker Compose:**
    ```bash
    sudo docker compose up --build
    ```
    The `--build` flag is important the first time to build the custom Docker images.

3.  **Done! Access the services:**
    -   **Web Application:** [http://localhost:3000](http://localhost:3000)
    -   **Redis GUI:** [http://localhost:8081](http://localhost:8081)

## How It Works

1.  Navigate to the **Hide** tab in the web application.
2.  Type your secret and click the "Hide Secret" button.
3.  Copy the unique key that is generated.
4.  You can go to the Redis GUI to verify that the new key has been stored in the database.
5.  Go to the **Reveal** tab, paste the key, and click the "Reveal Secret" button.
6.  The secret will be displayed and immediately deleted from the database. If you try to use the same key again, you will get a "not found" error.