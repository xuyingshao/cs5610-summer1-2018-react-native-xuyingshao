import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {Button, CheckBox, Text} from 'react-native-elements';


export default class EssayQuestionEditor
    extends React.Component {

    static navigationOptions = {title: 'Fill In Blank'};

    constructor(props) {
        super(props);

        this.state = {
            examId: 0,
            questionId: 0,
            title: '',
            description: '',
            variables: '',
            points: 0,
            previewMode: false,
            icon: 'code'
        };
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam('examId', 0);
        const questionId = this.props.navigation.getParam('questionId', 0);
        const title = this.props.navigation.getParam('title', '');
        const description = this.props.navigation.getParam('description', '');
        const points = this.props.navigation.getParam('points', 0);
        const variables = this.props.navigation.getParam('variables', 0);

        this.setState({questionId: questionId});
        this.setState({examId: examId});
        this.setState({title: title});
        this.setState({description: description});
        this.setState({points: points});
        this.setState({variables: variables});

    }


    render() {
        const texts = this.state.variables.split('\n');

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

                    <FormLabel>Variables</FormLabel>
                    <TextInput style={styles.textAreaContainer}
                               multiline={true}
                               onChangeText={(text) => this.setState({variables: text})}>
                        {this.state.variables}
                    </TextInput>
                    <FormValidationMessage>
                        {this.state.variables === '' && 'Variables are required'}
                        {this.state.variables !== '' && ''}
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({points: text.valueOf()})}>
                        {this.state.points}
                    </FormInput>
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
                                    fetch(`http://localhost:8080/api/exam/${this.state.examId}/blanks`,
                                        {
                                            method: 'post',
                                            body: JSON.stringify(
                                                {
                                                    'title': this.state.title,
                                                    'description': this.state.description,
                                                    'points': this.state.points,
                                                    'variables': this.state.variables,
                                                    'questionType': 'FillInBlank',
                                                    'icon': this.state.icon
                                                }
                                            ),
                                            headers: {
                                                'content-type': 'application/json'
                                            }
                                        })
                                        .then(this.props.navigation.navigate('WidgetList'));
                                }
                                else {
                                    fetch(`http://localhost:8080/api/blanks/${this.state.questionId}`,
                                        {
                                            method: 'put',
                                            body: JSON.stringify(
                                                {
                                                    'title': this.state.title,
                                                    'description': this.state.description,
                                                    'points': this.state.points,
                                                    'variables': '',
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
                                fetch(`http://localhost:8080/api/blanks/${this.state.questionId}`, {
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
                    {/*<Text h4>{this.state.variables}</Text>*/}
                    {texts.map((text) => (
                        parseBlank(text)
                    ))}
                </ScrollView>}
            </ScrollView>
        );
    }
}

const parseBlank = (text) => {
    let open = 0;
    let previousClose = -1;
    let close = 0;
    let expressions = [];

    while (text.indexOf('[', previousClose + 1) != -1) {
        open = text.indexOf('[', previousClose + 1);
        close = text.indexOf(']', open);
        if (open === 0) {
            expressions.push('[]');
        }
        else {
            expressions.push(text.substring(previousClose + 1, open));
            expressions.push('[]');
        }
        previousClose = close;
    }
    if (close !== text.length - 1) {
        expressions.push(text.substring(close + 1, text.length));
    }

    return (
        <View style={styles.row}>
            {expressions.map((expression) => {
                if (expression === '[]') {
                    return (<TextInput style={styles.input}/>);
                }
                else {
                    return (<Text h4>{expression}</Text>);
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row"
    },
    textAreaContainer: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 5,
        margin: 10
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    input: {
        height: 40,
        width: 80,
        borderColor: 'black',
        borderWidth: 1
    },
})