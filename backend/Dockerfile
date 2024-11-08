# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/uniMed-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Set the environment variable for MySQL database
ENV MYSQL_HOST=mysql
ENV MYSQL_PORT=3306
ENV MYSQL_DB=uni_health
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=Rasel2003

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]