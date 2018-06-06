import React from 'react';
import {Text, View, ScrollView} from "react-native";
import {Button, ListItem} from "react-native-elements";
import {FormLabel, FormInput, FormValidationMessage} from "react-native-elements";
import QuestionTypeButtonGroupChooser from "./QuestionTypeButtonGroupChooser";
import QuestionList from "../components/QuestionList";
import {Alert} from "react-native";
import WidgetServiceClient from "../services/WidgetServiceClient";
import QuestionServiceClient from "../services/QuestionServiceClient";


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

        this.widgetServiceClient = WidgetServiceClient.instance();
        this.questionServiceClient = QuestionServiceClient.instance();
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

        this.questionServiceClient.findAllQuestionsForExam(examId)
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

                <QuestionList navigation={this.props.navigation}
                              examId={this.state.examId}
                              questions={this.state.questions}/>

                {/*{this.state.questions.map((question) => {*/}
                    {/*return (*/}
                        {/*<View key={question.id}>*/}
                            {/*<ListItem leftIcon={{name: question.icon}}*/}
                                      {/*onPress={() => {*/}
                                          {/*if (question.questionType === 'TrueFalse') {*/}
                                              {/*this.props.navigation.navigate('TrueFalseQuestionEditor',*/}
                                                  {/*{*/}
                                                      {/*'questionId': question.id,*/}
                                                      {/*'examId': this.state.examId,*/}
                                                      {/*'title': question.title,*/}
                                                      {/*'description': question.description,*/}
                                                      {/*'points': question.points,*/}
                                                      {/*'isTrue': question.isTrue*/}
                                                  {/*})*/}
                                          {/*}*/}
                                          {/*if (question.questionType === 'Multiple') {*/}
                                              {/*this.props.navigation.navigate('MultipleChoiceQuestionEditor',*/}
                                                  {/*{*/}
                                                      {/*'questionId': question.id,*/}
                                                      {/*'examId': this.state.examId,*/}
                                                      {/*'title': question.title,*/}
                                                      {/*'description': question.description,*/}
                                                      {/*'points': question.points,*/}
                                                      {/*'choices': question.choices,*/}
                                                      {/*'correctAnswer': question.correctAnswer*/}
                                                  {/*})*/}
                                          {/*}*/}
                                          {/*if (question.questionType === 'Essay') {*/}
                                              {/*this.props.navigation.navigate('EssayQuestionEditor',*/}
                                                  {/*{*/}
                                                      {/*'questionId': question.id,*/}
                                                      {/*'examId': this.state.examId,*/}
                                                      {/*'title': question.title,*/}
                                                      {/*'description': question.description,*/}
                                                      {/*'points': question.points*/}
                                                  {/*})*/}
                                          {/*}*/}
                                          {/*if (question.questionType === 'FillInBlank') {*/}
                                              {/*this.props.navigation.navigate('FillInBlankQuestionEditor',*/}
                                                  {/*{*/}
                                                      {/*'questionId': question.id,*/}
                                                      {/*'examId': this.state.examId,*/}
                                                      {/*'title': question.title,*/}
                                                      {/*'description': question.description,*/}
                                                      {/*'variables': question.variables,*/}
                                                      {/*'points': question.points*/}
                                                  {/*})*/}
                                          {/*}*/}
                                      {/*}}*/}
                                      {/*title={question.title}*/}
                                      {/*key={question.id}*/}
                                      {/*subtitle={question.questionType}/>*/}
                        {/*</View>*/}
                    {/*);*/}
                {/*})}*/}

                <QuestionTypeButtonGroupChooser navigation={this.props.navigation}/>

                <Button backgroundColor='#4c73c4'
                        title='Save Exam'
                        onPress={() => {
                            let exam = {
                                'title': this.state.title,
                                'description': this.state.description,
                            };

                            this.widgetServiceClient.updateExam(this.state.examId, exam)
                                .then(() => {
                                    this.props.navigation.navigate('LessonList');
                                })
                        }}
                        buttonStyle={{
                            width: 330,
                            height: 40,
                            marginTop: 2,
                            margin: 10,
                        }}/>
                <Button backgroundColor='#4682B4'
                        title='Cancel'
                        onPress={() => {
                            this.props.navigation.navigate('LessonList');
                        }}
                        buttonStyle={{
                            width: 330,
                            height: 40,
                            marginTop: 1,
                            margin: 10,
                        }}/>
                <Button backgroundColor='#FA8072'
                        title='Delete Exam'
                        onPress={() => {
                            this.widgetServiceClient.deleteExam(this.state.examId)
                                .then(() => {
                                    this.props.navigation.navigate('LessonList')
                                })
                        }}
                        buttonStyle={{
                            width: 330,
                            height: 40,
                            marginTop: 1,
                            margin: 10,
                        }}/>
            </ScrollView>
        );
    }
}
