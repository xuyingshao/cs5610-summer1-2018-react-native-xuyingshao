import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {Button, CheckBox, Text} from 'react-native-elements';
import CustomMultiPicker from "react-native-multiple-select-list";
import QuestionServiceClient from "../services/QuestionServiceClient";


export default class TrueFalseQuestionEditor
    extends React.Component {

    static navigationOptions = {title: 'True or False'};

    constructor(props) {
        super(props);

        this.state = {
            questionId: 0,
            examId: 0,
            title: '',
            description: '',
            points: 0,
            isTrue: true,
            previewMode: false,
            icon: 'check'
        };

        this.questionServiceClient = QuestionServiceClient.instance();
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam('examId', 0);
        const questionId = this.props.navigation.getParam('questionId', 0);
        const title = this.props.navigation.getParam('title', '');
        const description = this.props.navigation.getParam('description', '');
        const points = this.props.navigation.getParam('points', 0);
        const isTrue = this.props.navigation.getParam('isTrue', true);

        this.setState({questionId: questionId});
        this.setState({examId: examId});
        this.setState({title: title});
        this.setState({description: description});
        this.setState({points: points});
        this.setState({isTrue: isTrue});
    }

    componentWillUnmount() {
        this.props.navigation.state.params.onGoBack();
    }

    render() {
        return (
            <ScrollView>
                {!this.state.previewMode &&
                <ScrollView>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({title: text})}>
                        {this.state.title}
                    </FormInput>
                    <FormValidationMessage>
                        {this.state.title === '' && 'Title is required'}
                        {this.state.title !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({description: text})}>
                        {this.state.description}
                    </FormInput>
                    <FormValidationMessage>
                        {this.state.description === '' && 'Description is required'}
                        {this.state.description !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({points: text.valueOf()})}>
                        {this.state.points}
                    </FormInput>
                    <FormValidationMessage>
                        {this.state.points === 0 && 'Points is required'}
                        {this.state.points !== 0 && ''}
                    </FormValidationMessage>

                    <CheckBox onPress={() => this.setState({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue}
                              title='The answer is true'/>

                    <Button buttonStyle={{
                        width: 330,
                        height: 40,
                        marginTop: 1,
                        margin: 10,
                    }}
                            backgroundColor='#4c73c4'
                            color='white'
                            title='Save'
                            onPress={() => {
                                if (this.state.questionId === 0) {
                                    let question = {
                                        'title': this.state.title,
                                        'description': this.state.description,
                                        'isTrue': this.state.isTrue,
                                        'points': this.state.points,
                                        'questionType': 'TrueFalse',
                                        'icon': this.state.icon
                                    };

                                    this.questionServiceClient.createTrueFalseQuestion(this.state.examId, question)
                                        .then(this.props.navigation.navigate('ExamWidget', {examId: this.state.examId}));
                                }
                                else {
                                    let question = {
                                        'title': this.state.title,
                                        'description': this.state.description,
                                        'isTrue': this.state.isTrue,
                                        'points': this.state.points,
                                    };

                                    this.questionServiceClient.updateTrueFalseQuestion(this.state.questionId, question)
                                        .then(this.props.navigation.navigate('ExamWidget', {examId: this.state.examId}));
                                }
                            }}/>
                    <Button backgroundColor='#4682B4'
                            color='white'
                            title='Cancel'
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                            buttonStyle={{
                                width: 330,
                                height: 40,
                                marginTop: 1,
                                margin: 10,
                            }}/>
                    {this.questionId !== 0 &&
                    <Button backgroundColor='#FA8072'
                            color='white'
                            title='Delete'
                            onPress={() => {
                                this.questionServiceClient.deleteTrueFalseQuestion(this.state.questionId)
                                    .then(this.props.navigation.navigate('ExamWidget', {examId: this.state.examId}));
                            }}
                            buttonStyle={{
                                width: 330,
                                height: 40,
                                marginTop: 1,
                                margin: 10,
                            }}/>}
                </ScrollView>}

                <Button title="Preview"
                        onPress={() => {
                            this.setState({previewMode: !this.state.previewMode})
                        }}
                        buttonStyle={{
                            width: 330,
                            height: 40,
                            marginTop: 1,
                            margin: 10,
                        }}/>

                {this.state.previewMode &&
                <ScrollView style={styles.textAreaContainer}>
                    <Text h4>{this.state.description}</Text>
                    <Text h5>{this.state.points} pts</Text>
                    <CustomMultiPicker
                        options={{
                            "123": "True",
                            "124": "False"
                        }}
                        multiple={false}
                        placeholderTextColor={'#757575'}
                        returnValue={"label"} // label or value
                        callback={(res) => {
                            console.log(res)
                        }} // callback, array of selected items
                        rowBackgroundColor={"#eee"}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={"#00a2dd"}
                        iconSize={30}
                        selectedIconName={"ios-checkmark-circle-outline"}
                        unselectedIconName={"ios-radio-button-off-outline"}
                        scrollViewHeight={130}
                        selected={this.state.isTrue ? 'True' : 'False'} // list of options which are selected by default
                    />
                </ScrollView>
                }
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 5,
        margin: 10
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
});