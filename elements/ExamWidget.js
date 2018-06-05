import React from 'react';
import {Text, View, ScrollView} from "react-native";
import {Button, ListItem} from "react-native-elements";
import {FormLabel, FormInput, FormValidationMessage} from "react-native-elements";
import QuestionTypeButtonGroupChooser from "./QuestionTypeButtonGroupChooser";
import QuestionList from "../components/QuestionList";
import {Alert} from "react-native";


export default class ExamWidget
    extends React.Component {

    static navigationOptions = {title: 'Exam Editor'};

    constructor(props) {
        super(props);

        this.state = {
            lessonId: 0,
            examId: 0,
            title: '',
            description: '',
            // points: 0,
            questions: []
        }
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam('lessonId', 0);
        const examId = this.props.navigation.getParam('examId', 0);
        const title = this.props.navigation.getParam('title', '');
        const description = this.props.navigation.getParam('description', '');
        // const points = this.props.navigation.getParam('points', 0);

        this.setState({lessonId: lessonId});
        this.setState({examId: examId});
        this.setState({title: title});
        this.setState({description: description});

        // FIXME
        fetch(`http://localhost:8080/api/exam/${examId}/question`)
            .then((response) => (response.json()))
            .then((questions) => {
                this.setState({questions: questions});
            })
    }

    // componentWillReceiveNewProps() {
    //
    // }

    render() {
        return (
            <ScrollView>
                // FIXME
                {/*<QuestionList navigation={this.props.navigation}*/}
                {/*examId={this.state.examId}*/}
                {/*questions={this.state.questions}/>*/}

                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={(text) => {
                    this.setState({title: text});
                }}>{this.state.title}</FormInput>
                <FormValidationMessage>
                    {this.state.title === '' && 'Title is required'}
                    {this.state.title !== '' && ''}
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={(text) => {
                    this.setState({description: text});
                }}>{this.state.description}</FormInput>
                <FormValidationMessage>
                    {this.state.description === '' && 'Description is required'}
                    {this.state.description !== '' && ''}
                </FormValidationMessage>

                {this.state.questions.map((question) => {
                    return (
                        <View>
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

                <QuestionTypeButtonGroupChooser navigation={this.props.navigation}/>

                <Button sytle={{padding: 20}}
                        backgroundColor='#4c73c4'
                        title='Save Exam'
                        onPress={() => {
                            fetch(`http://localhost:8080/api/exam/${this.state.examId}`, {
                                method: 'put',
                                body: JSON.stringify({
                                    'title': this.state.title,
                                    'description': this.state.description,
                                }),
                                headers: {
                                    'content-type': 'application/json'
                                }
                            })
                                .then(() => {
                                    this.props.navigation.navigate('LessonList');
                                })
                        }}/>
                <Button sytle={{padding: 20}}
                        backgroundColor='#4682B4'
                        title='Cancel'
                        onPress={() => {
                            this.props.navigation.navigate('LessonList');
                        }}/>
                <Button sytle={{padding: 20}}
                        backgroundColor='#FA8072'
                        title='Delete Exam'
                        onPress={() => {
                            fetch(`http://localhost:8080/api/exam/${this.state.examId}`, {
                                method: 'delete'
                            })
                                .then(() => {
                                    this.props.navigation.navigate('LessonList')
                                })
                        }}/>
            </ScrollView>
        );
    }
}
