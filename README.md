## Getting Started

- Clone the repository

- Then install all the dependencies using below command

```bash
npm install
```

- Run the development server using nodemon because it Automatically restarts the server during development:

```bash
npx nodemon app.js (Recommended)
or
node app.js
```

## Database setup

- If you don't have mySQL installed then follow below steps

```bash (For mac)
brew install mysql
```

```bash (For linux)
sudo apt update
sudo apt install mysql-server
```

- Start the mySQL server

```bash (for mac)
brew services start mysql
```

```bash (for linux)
sudo systemctl start mysql
```

## Setup MySQL Database

```bash
mysql -u root -p

CREATE DATABASE task_manager;

CREATE USER 'taskuser'@'localhost' IDENTIFIED BY 'password'; #Replace the taskuser & password with your username and password

GRANT ALL PRIVILEGES ON task_manager.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES; # Grant all the permissions to the user

GRANT CREATE, DROP ON *.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES; # Perform this operation in advance so as to avoid any error in the migration
```

## Apply Prisma migration

Delete the prisma folder and follow below fresh steps:

1. Initialize Prisma

```bash
npx prisma init
```
- This command generates two files:
    A. prisma/schema.prisma: Where you define your data models.
    B. .env: Used to configure the database connection.

2. Generate the migration:

```bash
npx prisma migrate dev --name init
```

3. Configure Prisma and connect to MySQL

- Update .env with the following url in same manner

```bash
DATABASE_URL="mysql://taskuser:password@localhost:3306/task_manager"
```

- The above URL follows this pattern - mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
- Where:
    taskuser: MySQL username.
    password: The password for the MySQL user.
    localhost: The host (usually localhost for local development).
    3306: The default MySQL port.
    task_manager: The name of your MySQL database


4. Update the schema.prisma with following structure

```bash
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  created_at  DateTime @default(now())
}
```

5. Generate Prisma Client

```bash
npx prisma generate
```

6. Check that the database connection works by running:

```bash
npx prisma db push
```

7. You can also use the Prisma Studio to interact with your database:

```bash
npx prisma studio # This is optional you can avoid it
```



## Separate commands for dependies

- In case npm install doesn't install all the necessary dependencies

```bash
npm install express
npm install nodemon --save-dev
npm install express-validator
npm install prisma --save-dev
npm install @prisma/client
npm install mysql2

```

## Troubleshooting the MySQL

- If you encounter issues, check your MySQL server status:

```bash
sudo systemctl status mysql
```
