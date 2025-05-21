# Тестування працездатності системи

Тестування проводилося за допомогою Postman.

## Отримання всіх користувачів
<img src="./pics/getAllUsers.png">

## Отримання користувача по id
<img src="./pics/getUserById.png">

## Створення користувача
<img src="./pics/createUser.png">

Вміст таблиці 'User' з створеним юзером

<img src="./pics/createUserdb.png">

## Оновлення користувача
<img src="./pics/updateUser.png">

Вміст таблиці 'User' після редагування юзера

<img src="./pics/updateUserdb.png">

## Видалення користувача
<img src="./pics/deleteUser.png">

Вміст таблиці 'User' після видалення юзера

<img src="./pics/deleteUserdb.png">

# Тестування обробки винятків

## Перевірка отримання користувача

Користувач для отримання не знайдений

<img src="./pics/getUserNotFound.png">

## Перевірка створення користувача

Відсутні дані

<img src="./pics/createUserNoData.png">

Користувач з такою поштою вже існує

<img src="./pics/createUserEmailExists.png">

## Перевірка оновлення користувача

Користувач для оновлення не знайдений

<img src="./pics/updateUserNotFound.png">

Відсутні дані для оновлення

<img src="./pics/updateUserNoData.png">

## Перевірка видалення користувача

Користувач з таким ID не знайдений

<img src="./pics/deleteUserNotFound.png">

