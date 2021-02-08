import React, { Component, component } from 'react';
import { Loading } from 'react-simple-chatbot';
import { prepareOptionList } from './chatbot';

export default class AgentAnswer extends Component {
    constructor(props) {
        super(props);
        //don't use setState within constructor
        this.state = {
            loading: true,
            result: null,
            trigger: false
        };
        //explicitly hard bind the event handler to the component
        this.triggerNext = this.triggerNext.bind(this);
    }

    //Fetch infernece from reasoning model in "componentDidMount lifecycle method"
    componentDidMount() {
        //create a reference to the component
        const self = this;
        const { previousStep } = this.props;
        const { question, dimension } = previousStep.metadata;
        //use template literal `` and placeholder ${}
        const query = encodeURI(question);
        const dim = encodeURI(dimension);
        const queryURL = `http://interplaylab.xyz:5000/query?question=${query}&dimension=${dim}`;

        const fetch = new XMLHttpRequest();
        fetch.addEventListener('readystatechange', readyStateChange);
        fetch.addEventListener('error', () => {
            console.log("An error occured");
        });

        function readyStateChange() {
            //readyState == 4 means data has been retrieved successsfully
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                const answers = response.results;
                if (answers && answers.length > 0) {
                    console.log(answers);
                    self.setState({ loading: false, result: answers });
                }
                else {
                    self.setState({ loading: false, result: ['Fail to make any guess'] });
                }
            }
            else {
                console.log(`fail to fetch data, Status: ${this.status}`)
            }
        }

        fetch.open('GET', queryURL);
        fetch.send();
    }

    triggerNext(chosen_answer) {
        this.setState({ trigger: true }, () => {
            console.log(chosen_answer)
            this.props.triggerNextStep({ value: chosen_answer, trigger: 'user-answer-confirm' });
        })
    }

    render() {
        const { trigger, loading, result } = this.state;

        return (
            <div className="agent-answer">
                {loading && <Loading />}
                {!loading &&
                    <div>
                        {result.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <button onClick={
                                        e => {
                                            this.triggerNext(value);
                                        }
                                    }>{value}</button>
                                    <br/>
                                </React.Fragment>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}