import React from 'react';
import {View, ScrollView} from 'react-native';
import {ListItem, Text} from 'react-native-elements';


export default class QuestionList
    extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            examId: 1,
            questions: []
        };
    }

    componentDidMount() {
        this.setState({examId: this.props.examId});
        this.setState({questions: this.props.questions});
    }

    componentWillReceiveProps(newProps) {
        this.setState({examId: newProps.examId});
        this.setState({questions: newProps.questions});
    }

    render() {
        return (
            <ScrollView>
                <Text h4> in question list: {this.state.examId}</Text>
                {this.state.questions.map((question) => {
                    return (
                        <View key={question.id}>
                            <ListItem leftIcon={{name: question.icon}}
                                      onPress={() => {
                                          if (question.questionType === 'TrueFalse') {
                                              this.props.navigation.navigate('TrueFalseQuestionEditor',
                                                  {
                                                      'questionId': question.id,
                                                      'examId': this.state.examId,
                                                      'title': question.title,
                                                      'description': question.description,
                                                      'points': question.points,
                                                      'isTrue': question.isTrue
                                                  })
                                          }
                                          if (question.questionType === 'Multiple') {
                                              this.props.navigation.navigate('MultipleChoiceQuestionEditor',
                                                  {
                                                      'questionId': question.id,
                                                      'examId': this.state.examId,
                                                      'title': question.title,
                                                      'description': question.description,
                                                      'points': question.points,
                                                      'choices': question.choices,
                                                      'correctAnswer': question.correctAnswer
                                                  })
                                          }
                                          if (question.questionType === 'Essay') {
                                              this.props.navigation.navigate('EssayQuestionEditor',
                                                  {
                                                      'questionId': question.id,
                                                      'examId': this.state.examId,
                                                      'title': question.title,
                                                      'description': question.description,
                                                      'points': question.points
                                                  })
                                          }
                                          if (question.questionType === 'FillInBlank') {
                                              this.props.navigation.navigate('FillInBlankQuestionEditor',
                                                  {
                                                      'questionId': question.id,
                                                      'examId': this.state.examId,
                                                      'title': question.title,
                                                      'description': question.description,
                                                      'variables': question.variables,
                                                      'points': question.points
                                                  })
                                          }
                                      }}
                                      title={question.title}
                                      key={question.id}
                                      subtitle={question.questionType}/>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}