import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';


export default class ExamCreator
    extends React.Component {

    static navigationOptions = {title: 'Create Exam'};

    constructor(props) {
        super(props);

        this.state = {
            lessonId: 0,
            title: '',
            description: '',
            // points: 0
        };
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam('lessonId', 0);

        this.setState({lessonId: lessonId});
    }

    render() {
        return (
            <View>
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

                {/*<FormLabel>Points</FormLabel>*/}
                {/*<FormInput onChangeText={(text) => {*/}
                {/*this.setState({points: text.valueOf()});*/}
                {/*}}>{this.state.points}</FormInput>*/}
                {/*<FormValidationMessage>*/}
                {/*{this.state.points === 0 && 'Points is required'}*/}
                {/*{this.state.points !== 0 && ''}*/}
                {/*</FormValidationMessage>*/}

                <Button backgroundColor="#4c73c4"
                        title="Create Exam"
                        onPress={() => {
                            fetch(`http://localhost:8080/api/lesson/${this.state.lessonId}/exam`, {
                                method: 'post',
                                body: JSON.stringify({
                                    'title': this.state.title,
                                    'description': this.state.description,
                                    // 'points': this.state.points,
                                    'widgetType': 'Exam'
                                }),
                                headers: {
                                    'content-type': 'application/json'
                                }
                            })
                                .then(response => response.json())
                                .then((exam) => {
                                    this.props.navigation.navigate('ExamWidget', {
                                        lessonId: this.state.lessonId,
                                        examId: exam.id,
                                        title: exam.title,
                                        description: exam.description,
                                    })
                                });
                        }}/>
                <Button backgroundColor="#4682B4"
                        title="Cancel"
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}/>
            </View>
        );
    }
}