import ChatBot from "react-simple-chatbot"
import Head from "next/head"
// import React, {Component} from 'react'
import AgentAnswer from "./AgentAnswer"
import Sidebar from "./Sidebar"
import 'react-pro-sidebar/dist/css/styles.css';


var latest_answer_options;
 
export function prepareOptionList(answers) {
    var options = []
    answers.array.forEach((element, index) => {
        options.push({ label: element, value: `answer-${index}`, trigger: 'confirm-guess' })
    });
    latest_answer_options = options;
}

export default function ChatBotPage() {

    const chat_steps = [
        {
            id: "welcome-msg",
            message: "Hello! Thank you for pointing out the problems existed in my social reasoning, and I'd like to collaborate with you on improving this flawed reasoning!",
            trigger: "intro-pane-msg"
        },
        {
            id: "intro-pane-msg",
            message: "First of all, let me introduce the function of each component.",
            trigger: "intro-pane"
        },
        {
            id: "intro-pane",
            component: (
                <div>
                    <p>The "Current Logic" pane illustrates the status of the overall reasoning at the interaction time.</p>
                    <div>
                        <img src="/node_display.png" />{" "}
                    represents the statements (nodes)
                </div>
                    <div>
                        <img src="/edge_display.png" />{" "}
                    represents the logical relations between the statements (nodes)
                </div>
                </div>
            ),
            asMessage: true,
            trigger: "intro-tool-msg",
            delay: 0
        },
        {
            id: "intro-tool-msg",
            message: "You can also access task-related information via toolbar.",
            trigger: "intro-tool"
        },
        {
            id: "intro-tool",
            asMessage: true,
            component: (
                <div>
                    <div>
                        <img src="/story.png" />{" "}
                        view the corresponding story and question
                    </div>
                    <div>
                        <img src="/search.png" />{" "}
                        look up particular words in the completed part
                    </div>
                    <div>
                        <img src="/question.png" />{" "}
                        check FAQ
                    </div>
                </div>
            ),
            trigger: "human-need-wrong"
        },
        {
            id: 'human-need-wrong',
            message: " Since you think the original human need is inappropriate, could you please tell me what human need we'd like to instead start with?",
            trigger: 'update-human-need',
        },
        {
            id: 'update-human-need',
            options: [
                { value: 'Food', label: 'Food', trigger: "confirm-new-human-need" },
                { value: 'Social contact', label: 'Social contact', trigger: "confirm-new-human-need" },
                { value: 'Health', label: 'Health', trigger: "confirm-new-human-need" },
                { value: 'Savings', label: 'Savings', trigger: "confirm-new-human-need" },
                { value: 'Approval', label: 'Approval', trigger: "confirm-new-human-need" },
                { value: 'Order', label: 'Order', trigger: "confirm-new-human-need" },
                { value: 'Safety', label: 'Safety', trigger: "confirm-new-human-need" },
                { value: 'Romance', label: 'Romance', trigger: "confirm-new-human-need" },
                { value: 'Belonging', label: 'Belonging', trigger: "confirm-new-human-need" },
                { value: 'Power', label: 'Power', trigger: "confirm-new-human-need" },
                { value: 'Safety', label: 'Safety', trigger: "confirm-new-human-need" },
                { value: 'Family', label: 'Family', trigger: "confirm-new-human-need" },
                { value: 'Competition', label: 'Competition', trigger: "confirm-new-human-need" },
                { value: 'Honor', label: 'Honor', trigger: "confirm-new-human-need" },
                { value: 'Status', label: 'Status', trigger: "confirm-new-human-need" },
                { value: 'Curiosity', label: 'Curiosity', trigger: "confirm-new-human-need" },
                { value: 'Serenity', label: 'Serenity', trigger: "confirm-new-human-need" },
                { value: 'Idealism', label: 'Idealism', trigger: "confirm-new-human-need" },
                { value: 'Independence', label: 'Independence', trigger: "confirm-new-human-need" },
            ],
        },
        {
            id: 'confirm-new-human-need',
            message: 'OK, we change human need to {previousValue}. Let’s complete the reasoning between “Gina wants social contact” and “Gina’s friend brought Gina a bracelet”',
            trigger: 'human-need-confirm-button'
        },
        {
            id: 'human-need-confirm-button',
            options: [
                { value: 'Let\' start', label: 'yes', trigger: "select-relation" },
                { value: 'Re-select human need', label: 'no' }
            ],
        },
        {
            id: 'select-relation',
            message: 'First, do you think we can reach (B) “Gina\'s friend brought Gina a bracelet” directly from (A) “Gina wants social contact” with one of the following logic type? If yes, please select the corresponding logic type; Otherwise, please select “No”',
            trigger: 'relation-type-for-single-step'
        },
        {
            id: 'relation-type-for-single-step',
            options: [
                { value: 'A is caused by B', label: 'because', trigger: 'finish-single-step' },
                { value: 'A causes B', label: 'cause', trigger: 'finish-single-step' },
                { value: 'A is motivated by B', label: 'is motivated by', trigger: 'finish-single-step' },
                { value: 'The location of A causes B', label: 'location-cause', trigger: 'finish-single-step' },
                { value: 'A causes emotion B', label: 'emotion-cause', trigger: 'finish-single-step' },
                { value: 'Changing location in A causes B', label: 'change-location-cause', trigger: 'finish-single-step' },
                { value: 'Changing posession in A causes B', label: 'change-possession-cause', trigger: 'finish-single-step' },
                { value: 'Possessing an item in A causes B', label: 'possession-cause', trigger: 'finish-single-step' },
                { value: 'No', label: 'no', trigger: 'additional-step-confirmed' },
            ]
        },
        {
            id: 'additional-step-confirmed',
            message: "OK, it seems that we need to add additional steps between “Gina wants social contact” and “Gina’s friend brought Gina a bracelet”.",
            trigger: 'additional-step-confirmed-button'
        },
        {
            id: 'additional-step-confirmed-button',
            options: [
                { value: 'Yes', label: 'yes', trigger: "ask-relation-type-for-additional-step" },
                { value: 'No', label: 'no' }
            ],
        },
        {
            id: 'finish-single-step',
            message: 'Placeholder',
            end: true
        },
        {
            id: 'ask-relation-type-for-additional-step',
            message: 'Could you tell me what’s kind of inference we’d like to draw at this step?',
            trigger: 'relation-type-for-additional-step'
        },
        {
            id: 'relation-type-for-additional-step',
            options: [
                { label: 'A is caused by B', value: 'because', trigger: 'agent-begin-make-guess' },
                { label: 'A causes B', value: 'cause', trigger: 'agent-begin-make-guess' },
                { label: 'A is motivated by B', value: 'is motivated by', trigger: 'agent-begin-make-guess' },
                { label: 'The location of A causes B', value: 'location-cause', trigger: 'agent-begin-make-guess' },
                { label: 'A causes emotion B', value: 'emotion-cause', trigger: 'agent-begin-make-guess' },
                { label: 'Changing location in A causes B', value: 'change-location-cause', trigger: 'agent-begin-make-guess' },
                { label: 'Changing posession in A causes B', value: 'change-possession-cause', trigger: 'agent-begin-make-guess' },
                { label: 'Possessing an item in A causes B', value: 'possession-cause', trigger: 'agent-begin-make-guess' },
            ]
        },
        {
            id: 'agent-begin-make-guess',
            message: "Thanks! Just a moment. I'm making guess of 'Why Gina wants social contact'?",
            trigger: 'agent-return-answer',
            metadata: { question: "Gina wants social contact", dimension: "1" }
        },
        {
            id: 'agent-return-answer',
            // message: "Thanks for your patience! I made three guesses about 'Why Gina wants social contact'?",
            component: <AgentAnswer />,
            waitAction: true,
            asMessage: true,
        },
        {
            id: 'user-answer-confirm',
            message: ({ previousValue }) => `you choose the answer: ${previousValue}`,
            trigger: 'confirm-guess'
        },
        {
            id: 'confirm-guess',
            message: "I\'m glad that I made an appropraite guess. I\'ve updated the logic-view in the left pane. The new logic step we just created is highlighted. How does it look now that I\'ve added the changes?",
        },
        {
            id: 'confirm-guess-choice',
            options: [
                { label: 'It looks great to me', value: 'yes', trigger: 'move-on-to-next-step' },
                { label: "I\'d like to adjust it", value: 'yes', trigger: 'move-on-to-next-step' },
            ]
        },
        {
            id: 'move-on-to-next-step',
            message: "Thanks a lot! Let’s complete the logic between “Gina wants friendship” and “Gina’s friend brought her a bracelet”"
        }
    ];

    return (
        <div>
            <Head>
                <title>Co-reasoning chatBot</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div class="flexbox-container app">
                    <Sidebar/>
                    <ChatBot
                        headerTitle="Collaborative reasoning"
                        // speechSynthesis={{ enable: true, lang: 'en' }}
                        steps={chat_steps}
                        width="auto"
                        height="100vh"
                    />
                </div>
            </main>
        </div>

    );
}

