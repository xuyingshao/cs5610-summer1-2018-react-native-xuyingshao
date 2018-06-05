import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CourseList from './components/CourseList';
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList';
import WidgetList from './components/WidgetList';
import AssignmentWidget from './elements/AssignmentWidget';
import ExamWidget from './elements/ExamWidget';
import ExamCreator from './elements/ExamCreator';
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor';
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor';
import EssayQuestionEditor from './elements/EssayQuestionEditor';
import FillInBlankQuestionEditor from './elements/FillInBlankQuestionEditor';

const App = createStackNavigator({
    // CourseList: {
    //     screen: CourseList,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // ModuleList: {screen: ModuleList},
    LessonList: {screen: LessonList},
    WidgetList: {screen: WidgetList},
    ExamCreator,
    ExamWidget,
    AssignmentWidget,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    EssayQuestionEditor,
    FillInBlankQuestionEditor
});

export default App;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
