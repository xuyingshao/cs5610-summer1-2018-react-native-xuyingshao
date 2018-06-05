import React from 'react';
import {ScrollView, TextInput, StyleSheet} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {Button, CheckBox, Text} from 'react-native-elements';


export default class EssayQuestionEditor
    extends React.Component {

    static navigationOptions = {title: 'Essay'};

    constructor(props) {
        super(props);

        this.state = {
            questionId: 0,
            title: '',
            description: '',
            points: 0,
            examId: 0,
            previewMode: false,
            icon: 'subject'
        };
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam('examId', 0);
        const questionId = this.props.navigation.getParam('questionId', 0);
        const title = this.props.navigation.getParam('title', '');
        const description = this.props.navigation.getParam('description', '');
        const points = this.props.navigation.getParam('points', 0);

        this.setState({questionId: questionId});
        this.setState({examId: examId});
        this.setState({title: title});
        this.setState({description: description});
        this.setState({points: points});
    }


    render() {
        return (
            <ScrollView>
                {!this.state.previewMode &&
                <ScrollView>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({title: text})}>{this.state.title}</FormInput>
                    <FormValidationMessage>
                        {this.state.title === '' && 'Title is required'}
                        {this.state.title !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput
                        onChangeText={(text) => this.setState({description: text})}>{this.state.description}</FormInput>
                    <FormValidationMessage>
                        {this.state.description === '' && 'Description is required'}
                        {this.state.description !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput
                        onChangeText={(text) => this.setState({points: text.valueOf()})}>{this.state.points}</FormInput>
                    <FormValidationMessage>
                        {this.state.points === 0 && 'Points is required'}
                        {this.state.points !== 0 && ''}
                    </FormValidationMessage>

                    <Button sytle={{padding: 10}}
                            backgroundColor='#4c73c4'
                            color='white'
                            title='Save'
                            onPress={() => {
                                if (this.state.questionId == 0) {
                                    fetch(`http://localhost:8080/api/exam/${this.state.examId}/essay`,
                                        {
                                            method: 'post',
                                            body: JSON.stringify(
                                                {
                                                    'title': this.state.title,
                                                    'description': this.state.description,
                                                    'points': this.state.points,
                                                    'questionType': 'Essay',
                                                    'icon' : this.state.icon
                                                }
                                            ),
                                            headers: {
                                                'content-type': 'application/json'
                                            }
                                        })
                                        .then(this.props.navigation.navigate('WidgetList'));
                                }
                                else {
                                    fetch(`http://localhost:8080/api/essay/${this.state.questionId}`,
                                        {
                                            method: 'put',
                                            body: JSON.stringify(
                                                {
                                                    'title': this.state.title,
                                                    'description': this.state.description,
                                                    'points': this.state.points,
                                                }
                                            ),
                                            headers: {
                                                'content-type': 'application/json'
                                            }
                                        })
                                        .then(this.props.navigation.navigate('WidgetList'));
                                }
                            }}/>
                    <Button sytle={{padding: 10}}
                            backgroundColor='#4682B4'
                            color='white'
                            title='Cancel'
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}/>
                    <Button sytle={{padding: 10}}
                            backgroundColor='#FA8072'
                            color='white'
                            title='Delete'
                            onPress={() => {
                                fetch(`http://localhost:8080/api/essay/${this.state.questionId}`, {
                                    method: 'delete'
                                })
                                    .then(this.props.navigation.navigate('WidgetList'));
                            }}/>
                </ScrollView>}

                <Button title="Preview"
                        onPress={() => {
                            this.setState({previewMode: !this.state.previewMode})
                        }}/>

                {this.state.previewMode &&
                <ScrollView style={styles.textAreaContainer}>
                    <Text h4>{this.state.description}</Text>
                    <Text h5>{this.state.points} pts</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder={"Type your answer here."}
                        placeholderTextColor={"grey"}
                        numberOfLines={10}
                        multiline={true}/>
                </ScrollView>}

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
})