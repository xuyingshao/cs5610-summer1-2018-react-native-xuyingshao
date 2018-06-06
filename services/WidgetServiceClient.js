let _singleton = Symbol();

const COURSE_API_URL = 'http://localhost:8080/api/course';
const LESSON_API_URL = 'http://localhost:8080/api/lesson';

// const COURSE_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/course';
// const LESSON_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/lesson';

export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.');
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new WidgetServiceClient(_singleton);
        }
        return this[_singleton];
    }

    findAllWidgetsForLesson(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId + '/widget')
            .then((response) => (response.json()));
    }

    // saveAssignment(lessonId) {
    //
    // }
    //
    // updateAssignment(lessonId) {
    //
    // }
}