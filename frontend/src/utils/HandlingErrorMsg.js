export function handlingErrorSearch(err) {
  if (err === 404) {
    return "Ничего не найдено"
  } else if (err === 400) {
    return "Введите ключевое слово"
  } else if (err === 500) {
    return "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  } else {
    return ""
  }
}

export function handlingErrorSignUp(err) {
  if (err === 409) {
    return "Такой пользователь уже существует.";
  } else if (err === 400) {
    return "Переданы некорректные данные при создании пользователя.";
  } else if (err === 500) {
    return "На сервере произошла ошибка.";
  } else if (err > 0 || err === undefined) {
    return "При регистрации пользователя произошла ошибка.";
  } else {
    return "";
  }
}

export function handlingErrorSignIn(err) {
  if (err === 401) {
    return "Вы ввели неправильный логин или пароль.";
  } else if (err === 400) {
    return "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
  } else if (err === 404) {
    return "При авторизации произошла ошибка. Переданный токен некорректен.";
  } else if (err === 500) {
    return "На сервере произошла ошибка.";
  } else if (err > 0 || err === undefined) {
    return "При авторизации произошла ошибка"
  } else {
    return ""
  }
}

export function handlingErrorProfile(err) {
  if (err === 200) {
    return "Данные успешно сохранены!";
  } else if (err === 409) {
    return "Пользователь с таким email уже существует.";
  } else if (err === 500 || undefined) {
    return "На сервере произошла ошибка.";
  } else if (err > 0) {
    return "При обновлении профиля произошла ошибка.";
  } else {
    return "";
  }
};
