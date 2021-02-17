import ChatBot from "react-simple-chatbot"
<<<<<<< HEAD
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Head from "next/head";
import AgentAnswer from "./AgentAnswer";
import { BsBook, BsQuestionCircle, BsGearWideConnected } from "react-icons/bs";
import { Navbar, NavItem, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

var latest_answer_options;
var reasoning = [
				{type: "node", load: "Gina wants approval"},
				{type: "edge", load: "causes"},
				{type: "node", load: "Gina feels gratitude"}, 
				{type: "edge", load: "because"},
				{type: "node", load: "Gina's friend brought her a bracelet"},
				{type: "edge", load: "motivates"},
				{type: "node", load: "Gina pretends to be grateful"}
				];
var iteration = 1;				
=======
import Head from "next/head"
// import React, {Component} from 'react'
import AgentAnswer from "./AgentAnswer"
import Sidebar from "./Sidebar"
import 'react-pro-sidebar/dist/css/styles.css';

>>>>>>> 8d6e107fe031c9f43fe76161e1d0e21b98e52638

var latest_answer_options;
 
export function prepareOptionList(answers) {
    var options = []
    answers.array.forEach((element, index) => {
        options.push({ label: element, value: `answer-${index}`, trigger: 'confirm-guess' })
    });
    latest_answer_options = options;
}

export default function ChatBotPage() {
	function trigger_helper(props){
		props.triggerNext({trigger: 'welcome-msg'});
	}
	function App() {
	    //if there are > 0 reasonings left, trigger next event as repeating this function
	    if (iteration >= 1) {
	    		return <trigger_helper />;
	    	}
	    //otherwise trigger next event as next step in dialogue
	}

    const chat_steps = [
        {
            id: "welcome",
            component: <App />
        },
        {
            id: "welcome-msg",
            message: "Welcome to the ultimate AI chatbot.",
            trigger: "welcome-msg2"
        },
        {
            id: "welcome-msg2",
            message: "I'd like your help to understand what you find wrong about my reasoning process. Are you ready to begin?",
            trigger: "help-y-n"
        },

	    {
		    id: 'help-y-n',
		    options: 
		    [
		      { value: 1, label: 'Yes', trigger: 'prem-intro' },
		      { value: 2, label: 'No', trigger: 'not-ready' },
		    ],
	    },
		{
			id: 'not-ready',
			message: 'OK please select "Proceed" when you are ready.',
			trigger: "proceed"
		},
		{
			id: "proceed",
			options:
			[{value: 1, label: "Proceed", trigger: "prem-intro"}]
		},

        {
            id: "prem-intro",
            message: "I'll begin by introducing the graph that contains the AI's logic and any changes you have made to it, here on the left.",
            trigger: "intro-pane"
        },

        {
            id: "intro-pane",
            component: (
                <div>
                    <div>
                    	In the visualization window, blocks of this color {" "}
                        <img src="/node_display.png" /><br/>
                    	represent statements or claims.<br/><br/>
                    	For example:<br/>
                    	<img src="/example_statement.png"/>
                    </div>
                </div>
            ),
            asMessage: true,
            trigger: "intro-pane-2"
        },
        {
            id: "intro-pane-2",
            component: (
                <div>
                    <div>
                    	Additionally, blocks of this color {" "}
                        <img src="/edge_display.png" />{" "} <br/>
                    	represent relationships between claims<br/><br/>
                    	For example:<br/>
                    	<img src="/example_edge.png"/>
                	</div>
                </div>
            ),
<<<<<<< HEAD
=======
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
>>>>>>> 8d6e107fe031c9f43fe76161e1d0e21b98e52638
            asMessage: true,
            trigger: "intro-pane-3",
        },
        {
<<<<<<< HEAD
            id: "intro-pane-3",
            component: (
                <div>
                    <div>
                    	Where the overall structure of the logic, connecting two claims would look like:<br/>
                    	<img src="/overall_logic.png"/>
                	</div>
                </div>
            ),
            asMessage: true,
            trigger: "intro-tool-msg",
=======
            id: 'user-answer-confirm',
            message: ({ previousValue }) => `you choose the answer: ${previousValue}`,
            trigger: 'confirm-guess'
>>>>>>> 8d6e107fe031c9f43fe76161e1d0e21b98e52638
        },
        {
            id: "intro-tool-msg",
            message: "You can also access task-related information via the toolbar.",
            trigger: "intstruction-confirm"
        },
      	{
		    id: 'intstruction-confirm',
		    options: 
		    [
		      { value: 1, label: "Proceed", trigger: 'intro-tool-msg' },
		    ],
	    },
        {
<<<<<<< HEAD
            id: "intro-tool-msg",
            message: "hello"
=======
            id: 'confirm-guess-choice',
            options: [
                { label: 'It looks great to me', value: 'yes', trigger: 'move-on-to-next-step' },
                { label: "I\'d like to adjust it", value: 'yes', trigger: 'move-on-to-next-step' },
            ]
>>>>>>> 8d6e107fe031c9f43fe76161e1d0e21b98e52638
        },
    ];

    return (
<<<<<<< HEAD
        <div class="container" style={{width: "100%", margin: "0", padding: "0"}}>
			<Navbar bg="light" style={{width: "100%", "white-space": "no-wrap" }}expand="lg">
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="#home">Home</Nav.Link>
			      <Nav.Link href="#link">Link</Nav.Link>
			      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
			        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
			        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
			        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
			        <NavDropdown.Divider />
			        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
			      </NavDropdown>
			    </Nav>
			    <Form inline>
			      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			      <Button variant="outline-success">Search</Button>
			    </Form>
			  </Navbar.Collapse>
			</Navbar>

			<div style={{display: "flex", "justify-content": "space-between"}}>
		        <ProSidebar collapsed="collapsed" style={{height: "100vh", display: "inline-block", float: "left"}}>
		      	<SidebarHeader>
			        <div	
			          style={{
			            padding: '24px',
			            textTransform: 'uppercase',
			            fontWeight: 'bold',
			            fontSize: 14,
			            letterSpacing: '1px',
			            overflow: 'hidden',
			            textOverflow: 'ellipsis',
			            whiteSpace: 'nowrap',
			          }}>	
			        <BsGearWideConnected iconShape="cicrle" />
		        	</div>
	      		</SidebarHeader>
				  <Menu>
				    <MenuItem class="story" iconShape="cicrle" icon={<BsBook />}></MenuItem>
				    <MenuItem class="story" iconShape="cicrle" icon={<BsQuestionCircle />}></MenuItem>
				  </Menu>
				</ProSidebar>
=======
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
>>>>>>> 8d6e107fe031c9f43fe76161e1d0e21b98e52638

	        	<div class="chatbot" style={{height: "100vh", display: "block", margin: "0 auto", width: "70%"}}>
		            <Head>
		                <title>Co-Reasoning ChatBot</title>
		                <link rel="icon" href="/favicon.ico" />
		            </Head>
		            <main>
		                <ChatBot
		                    headerTitle="Collaboration with AI"
		                    // speechSynthesis={{ enable: true, lang: 'en' }}
		                    steps={chat_steps}
		                    fontFamily="Helvetica"
		                    width="100%"
		                    height="100vh"
		                />
		            </main>
		        </div>
		        <div class="visualization" style={{float: "right", "borderStyle": "solid", width: "30%"}}>Visual</div>
		    </div>
        </div>
    );
}

