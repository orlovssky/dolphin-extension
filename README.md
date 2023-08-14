
# Dolphin Browser Extension

Браузерное расширение по поиску токена ФБ и быстрому добавлению аккаунтов в Dolphin.<br/>
<br/>
Данное расширение поддерживает добавление аккаунтов в <b>серверную</b> и <b>облачную</b> версии Dolphin.<br/>
Реализована интеграция с <b>Dolphin{anty}</b>.

## Используемый стек

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/) - библиотека компонентов
- [Vite](https://vitejs.dev/) - сборщик пакетов
- [Feature-Sliced Design](https://feature-sliced.design/) - файловая структура
- [Yarn](https://classic.yarnpkg.com/) - пакетный менеджер

## Разработка и деплой

Hot reload во время активной разработки не настроен, поэтому следует каждый раз собирать продакшн билд.

#### Билд для дельфина
```bash
  yarn build:dolphin
```

#### Билд для антика
```bash
  yarn build:anty
```

## Краткая спецификация

Расширение имеет 2 цветовых палитры - темная и светлая, а также 3 режима - системный, темный, светлый. Системный режим использует цветовую палитру соответствующую настройкам браузера. По умолчанию выбран системный режим, если режим был изменен, то значение сохраняется в память браузера и используется при последующих открытиях расширения.<br/>
<br/>
Расширение переведено на 3 языка - русский, английски, китайский. По умолчанию выбран английский, если язык был изменен, то значение сохраняется в память браузера и используется при последующих открытиях расширения.<br/>
<br/>
Идентификация пользователя производится по токену доступа. Токен содержит необходимые данные для авторизации в Dolphin. Получить токен можно из системы Dolphin. После успешной авторизации токен сохраняется в память браузера и используется при последующих открытиях расширения.

После авторизации расширение ищет токен ФБ:
- Если токен ФБ <b>не</b> найден, то появляется красное уведомление и дальнейшая работа с расширением невозможна.
- Если токен ФБ <b>найден</b>, то этот токен отображается и  открывается форма добавления аккаунта.

Форма добавления аккаунта содержит следующие поля:

- Название аккаунта (текстовое поле, обязательное заполнение);
- UserAgent (текстовое поле, начальное значение парсится из браузера, обязательное заполнение);
- Прокси
  - для серверной учетной записи 3 режима: 
    - без прокси;
    - новый прокси (если выбран - заполнение обязательно);
    - выбрать существующие в учетной записи прокси (если выбран - заполнение обязательно, предвыбран по умолчанию);
  - для облачной учетной записи 2 режима:
    - новый прокси (если выбран - заполнение обязательно);
    - выбрать существующие в учетной записи прокси (если выбран - заполнение обязательно, предвыбран по умолчанию);
- Теги (меню опций, необязательное заполнение);
- Передать куки (свитчер, если активный - передает куки текущей вкладки, активный по умолчанию);

После успешного добавления аккаунта поля форма сбрасываются.

#### Интеграция с антиком.
В настройках учетной записи антика можно указать токен Dolphin, который будет использоваться для авторизации при открытии расширения в браузерном профиле.

Если токен Dolphin не указан, то при открытии расширения в браузерном профиле будет показываться Welcome Letter, которое объясняет что такое Dolphin. Письмо будет показываться до тех пор, пока не будет нажато "Хорошо", после этого при последующих открытиях расширения письмо не отображается.

Также будут установлены начальные значения следующих полей:
- Название аккаунта (название браузерного профиля);
- UserAgent (UserAgent браузерного профиля);
- Прокси (прокси браузерного профиля);
- Теги (теги браузерного профиля);
