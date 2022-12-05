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

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)

<h3> Assets/Design: </h3>
  
![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)
![Adobe Illustrator](https://img.shields.io/badge/adobe%20illustrator-%23FF9A00.svg?style=for-the-badge&logo=adobe%20illustrator&logoColor=white)

<h2> Features </h2>

<h3> Splash Page - Sign Up/Sign In:</h3>

![image](https://user-images.githubusercontent.com/79663621/205567264-11b876e3-77c3-4f9e-9905-a1ff84cb9a86.png)

<br>
<br>

<h3> Profile Page</h3>

![image](https://user-images.githubusercontent.com/79663621/205567321-43dea3ad-064f-4924-8fc9-b043f1400721.png)

<h4>Details: </h4>
<ul>
<li> Edit Personal Info </li>
<li> View Friends/Users </li>
<li> View Comments </li>
<li> View Blogs </li>
</ul>
<br>
<br>

<h3> Blogs:</h3>

![image](https://user-images.githubusercontent.com/79663621/205568074-9b796a2a-a7cf-4e1d-9b43-e2b9ed1083ec.png)

![image](https://user-images.githubusercontent.com/79663621/205568148-083e7658-e813-4649-a61d-cd49d1a69f84.png)

![image](https://user-images.githubusercontent.com/79663621/205568185-837951f5-5f58-4501-adda-40296eb76966.png)



<h4>Details: </h4>
<ul>
<li> View Blog Entries </li>
<li> Create/Edit/Delete Blog Entries </li>
</ul>
<br>
<br>


<h3> Comments:</h3>

![image](https://user-images.githubusercontent.com/79663621/205568503-03528700-cc8a-4d7d-a42d-a0162448a602.png)

![image](https://user-images.githubusercontent.com/79663621/205568631-13c2c5c9-f992-49d0-ac88-128371cc1d43.png)

![image](https://user-images.githubusercontent.com/79663621/205568687-b2645122-f931-42ba-a848-2cb2ed335326.png)



<h4>Details: </h4>
<ul>
<li> View Comments </li>
<li> Create/Edit/Delete Comments </li>
</ul>
<br>
<br>

<h2> Run Locally </h2>

- Clone our repository:
```
git@github.com:Schaeffy/OurPlace.git
https://github.com/Schaeffy/OurPlace.git
```
- Within your terminal, install dependencies in root folder:
```
pipenv install
```
- Create a .env file (copy from .env.example file):
```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```
- Initialize the virtual environment:
```
pipenv shell
```
- Migrate and seed data, then run the pip environment:
```
flask db upgrade
flask seed all
pipenv run flask run
```
- Then cd into react-app then install the npm packages:
```
npm install
```
- Start the server!
```
npm start
```
<br>
<br>
