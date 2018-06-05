let _singleton = Symbol();

const COURSE_API_URL = 'http://localhost:8080/api/course';
const MODULE_API_URL = 'http://localhost:8080/api/module';
const LESSON_API_URL = 'http://localhost:8080/api/lesson';

// const COURSE_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/course';
// const MODULE_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/module';
// const LESSON_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/lesson';

export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new WidgetServiceClient(_singleton);
        }
        return this[_singleton];
    }


    findAllWidgetsForLesson(lessonId) {
        // fetch(LESSON_API_URL + '/' + lessonId + '/widget')
        // fetch("http://localhost:8080/api/lesson/1/widget")
        //     .then((response) => {
        //         return response.json();
        //     })

         fetch(`http://localhost:8080/api/lesson/${lessonId}/widget`)
             .then((response) => (response.json()));
    }


    // "/api/lesson/{lessonId}/exam"
    findAllExamsForLesson(lessonId) {
        fetch(`http://localhost:8080/api/lesson/${lessonId}/widget`)
            .then((response) => {
                return response.json();
            })
    }
}