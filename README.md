# To-Do List Application

## Overview

A simple To-Do List application built using Spring Boot, MySQL, and a frontend with HTML, CSS, and JavaScript.



## Features

- Add, mark, and delete tasks
- RESTful API with Spring Boot
- MySQL database integration
- Authentication (upcoming feature)
- Docker support for deployment

## Technologies Used

- **Backend**: Spring Boot, Spring Data JPA, MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Security**: Spring Security (planned)
- **Deployment**: Docker

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/springboot-todo.git
   cd springboot-todo
   ```
2. Configure MySQL database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. Access the API at `http://localhost:8080`

## Docker Deployment

1. **Create a **`` in the project root:
   ```dockerfile
   FROM openjdk:17-jdk-slim
   COPY target/springboot-todo.jar app.jar
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```
2. **Build and Run the Docker Container**:
   ```bash
   docker build -t todo-app .
   docker run -p 8080:8080 todo-app
   ```
3. The app will be available at `http://localhost:8080`

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

## License

MIT License

