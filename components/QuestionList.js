// import React from 'react';
// import {View} from 'react-native';
// import {Button, ListItem, Divider} from 'react-native-elements';
// import WidgetTypePicker from '../elements/WidgetTypePicker';
// import QuestionTypeButtonGroupChooser from "../elements/QuestionTypeButtonGroupChooser";
// import Text from "react-native-elements/src/text/Text";
//
// export default class QuestionList
//     extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             // courseId: 1,
//             // moduleId: 1,
//             // lessonId: 1,
//             examId: 1,
//             questions: []
//                 // {title: 'Question 1', questionType: 'TrueFalse', id: 1},
//                 // {title: 'Question 2', questionType: 'FillInBlank', id: 2},
//                 // {title: 'Question 3', questionType: 'Multiple', id: 3},
//                 // {title: 'Question 4', questionType: 'Essay', id: 4}]
//         };
//     }
//
//     componentDidMount() {
//         this.setState({examId: this.props.examId});
//
//         this.setState({questions: this.props.questions});    // FIXME
//     }
//
//
//
//     render() {
//         return (
//             <View>
//                 {this.state.questions.map((question) => (
//                     <ListItem onPress={() => {
//                         if (question.questionType === 'TrueFalse') {
//                             this.props.navigation.navigate('TrueFalseQuestionEditor',
//                                 {'questionId': question.id, 'examId': this.state.examId})
//                         }
//                         if (question.questionType === 'Multiple') {
//                             this.props.navigation.navigate('MultipleChoiceQuestionEditor',
//                                 {'questionId': question.id, 'examId': this.state.examId})
//                         }
//                         if (question.questionType === 'Essay') {
//                             this.props.navigation.navigate('EssayQuestionEditor',
//                                 {'questionId': question.id, 'examId': this.state.examId})
//                         }
//                         if (question.questionType === 'FillInBlank') {
//                             this.props.navigation.navigate('FillInBlankQuestionEditor',
//                                 {'questionId': question.id, 'examId': this.state.examId})
//                         }
//                     }}
//                               title={question.title}
//                               key={question.id}
//                               subtitle={question.questionType}/>
//                 ))}
//
//                 {this.state.questions.map((question) => (<Text h3>{question.id}</Text>))}
//             </View>
//         );
//     }
// }