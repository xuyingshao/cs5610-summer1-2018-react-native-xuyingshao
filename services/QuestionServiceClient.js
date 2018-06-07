let _singleton = Symbol();

// const COURSE_API_URL = 'http://localhost:8080/api/course';
// const EXAM_API_URL = 'http://localhost:8080/api/exam';
// const MULTI_API_URL = 'http://localhost:8080/api/multi';
// const TRUEFALSE_API_URL = 'http://localhost:8080/api/truefalse';
// const ESSAY_API_URL = 'http://localhost:8080/api/essay';
// const BLANK_API_URL = 'http://localhost:8080/api/blanks';

const COURSE_API_URL = 'https://course-manager-react-native.herokuapp.com/api/course';
const EXAM_API_URL = 'https://course-manager-react-native.herokuapp.com/api/exam';
const MULTI_API_URL = 'https://course-manager-react-native.herokuapp.com/api/multi';
const TRUEFALSE_API_URL = 'https://course-manager-react-native.herokuapp.com/api/truefalse';
const ESSAY_API_URL = 'https://course-manager-react-native.herokuapp.com/api/essay';
const BLANK_API_URL = 'https://course-manager-react-native.herokuapp.com/api/blanks';


export default class QuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton question service.');
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new QuestionServiceClient(_singleton);
        }
        return this[_singleton];
    }

    findAllQuestionsForExam(examId) {
        return fetch(EXAM_API_URL + '/' + examId + '/question')
            .then((response) => (response.json()));
    }

    createMultipleChoiceQuestion(examId, question) {
        return fetch(EXAM_API_URL + '/' + examId + '/choice', {
                method: 'post',
                body: JSON.stringify(question),
                headers: {
                    'content-type': 'application/json'
                }});
    }

    updateMultipleChoiceQuestion(questionId, question) {
        return fetch(MULTI_API_URL + '/' + questionId, {
                method: 'put',
                body: JSON.stringify(question),
                headers: {
                    'content-type': 'application/json'
                }});
    }

    deleteMultipleChoiceQuestion(questionId) {
        return fetch(MULTI_API_URL + '/' + questionId, {
            method: 'delete'
        })
    }


    createTrueFalseQuestion(examId, question) {
        return fetch(EXAM_API_URL + '/' + examId + '/truefalse', {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    updateTrueFalseQuestion(questionId, question) {
        return fetch(TRUEFALSE_API_URL + '/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    deleteTrueFalseQuestion(questionId) {
        return fetch(TRUEFALSE_API_URL + '/' + questionId, {
            method: 'delete'
        })
    }

    createEssayQuestion(examId, question) {
        return fetch(EXAM_API_URL + '/' + examId + '/essay', {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    updateEssayQuestion(questionId, question) {
        return fetch(ESSAY_API_URL + '/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    deleteEssayQuestion(questionId) {
        return fetch(ESSAY_API_URL + '/' + questionId, {
            method: 'delete'
        })
    }

    createFillInBlanksQuestion(examId, question) {
        return fetch(EXAM_API_URL + '/' + examId + '/blanks', {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    updateFillInBlanksQuestion(questionId, question) {
        return fetch(BLANK_API_URL + '/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }});
    }

    deleteFillInBlanksQuestion(questionId) {
        return fetch(BLANK_API_URL + '/' + questionId, {
            method: 'delete'
        })
    }
}