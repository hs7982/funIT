FROM openjdk:21

COPY /build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENV TZ="Asia/Seoul"

ENTRYPOINT ["java","-jar","app.jar"]
