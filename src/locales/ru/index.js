import taskDescriptionFirstPage from './templates/taskDescriptionFirstPage';
import taskDescriptionSecondPage from './templates/taskDescriptionSecondPage';

export default {
  title: 'Тестовое задание для SquareGps',
  mapListTitle: 'Маркеры:',
  noName: 'Нет названия',
  languages: {
    en: 'Английский',
    ru: 'Русский',
  },
  form: {
    enter: 'Введите {0}',
    required: 'Обязательное поле: {0}',
    maxLength: 'Значение должно быть короче {0} знаков',
    name: 'Название',
    coordinates: 'Координаты',
  },
  buttons: {
    submit: 'Сохранить',
    cancel: 'Отменить',
  },
  routesNames: {
    taskDescription: 'О задании',
    map: 'Карта',
  },
  taskDescriptionPages: {
    first: taskDescriptionFirstPage,
    second: taskDescriptionSecondPage,
  },
};
