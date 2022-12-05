![ourplace](https://user-images.githubusercontent.com/79663621/205563751-94068182-4586-4041-b474-07505bfa9442.png)



## Description

**OurPlace** is a fullstack, nostalgia fueled, social networking site inspired by MySpace, circa 2003-2009.
<br>

  
View and explore the live site here: [**OurPlace**](https://ourplace.onrender.com/)

## Wiki Links
* [Features](https://github.com/Schaeffy/OurPlace/wiki/MVP-Feature-List)
* [Database Schema](https://github.com/Schaeffy/OurPlace/wiki/Database-Schema)
* [User Stories](https://github.com/Schaeffy/OurPlace/wiki/User-Stories)
* [Wireframe](https://github.com/Schaeffy/OurPlace/wiki/User-Stories)


## Technologies Used

### Frameworks, Platforms, Libraries

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Design
![Adobe Illustrator](https://img.shields.io/badge/adobe%20illustrator-%23FF9A00.svg?style=for-the-badge&logo=adobe%20illustrator&logoColor=white)

## Features

* Songs  
* Albums
  
A splash page where you can explore some songs, log in as a user, or sign up for a new account.  
  
![image](https://user-images.githubusercontent.com/79663621/197257715-b36f9174-84fc-43a5-a4d6-3fd24d87a0a9.png)
  
As a user, you can create, edit, and delete songs as well as albums.  
  
![image](https://user-images.githubusercontent.com/79663621/197258094-faa2bc7b-b743-44c1-8295-31ccb3a02952.png)
  
![image](https://user-images.githubusercontent.com/79663621/197258184-a38fe39a-0aaa-4c51-8888-161975a0842b.png)

## Upcoming Features

* Playlists
* Search
* Comments

## Setting Up Locally
1. Clone this repository and ```npm install``` in the root directory
2. In the backend directory:
    * Create a ```.env``` file using the env.example
    * Migrate and seed the database using:
        * ```npx dotenv sequelize db:migrate```
        * ```npx dotenv sequelize db:seed:all```
    * Run ```npm start```
3. Run ```npm start``` in the frontend directory
4. Open http://localhost:3000 in your browser


