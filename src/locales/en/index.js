import taskDescriptionFirstPage from './templates/taskDescriptionFirstPage';
import taskDescriptionSecondPage from './templates/taskDescriptionSecondPage';

export default {
  title: 'A SquareGPS test task',
  mapListTitle: 'Markers:',
  noName: 'No name',
  languages: {
    en: 'English',
    ru: 'Russian',
  },
  form: {
    enter: 'Enter {0}',
    required: '{0} is required',
    maxLength: 'Must be less than {0} characters',
    name: 'Name',
    coordinates: 'Сoordinates',
  },
  buttons: {
    submit: 'Submit',
    cancel: 'Cancel',
  },
  routesNames: {
    taskDescription: 'Task description',
    map: 'Map',
  },
  taskDescriptionPages: {
    first: taskDescriptionFirstPage,
    second: taskDescriptionSecondPage,
  },
};
