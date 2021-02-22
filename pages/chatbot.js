import 'reactjs-popup/dist/index.css';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import Popup from 'reactjs-popup';
import ChatBot from "react-simple-chatbot";
import Head from "next/head";
import AgentAnswer from "./AgentAnswer";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import { BsBook, BsQuestionCircle, BsGearWideConnected } from "react-icons/bs";
import { Navbar, NavItem, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';

var evidence = 
				[
					"I don't need evidence.",
					"I am an AI who is smarter than you.",
					"hahaha"
				];

var reasoning = [
				{type: "node", load: "Gina wants approval"},
				{type: "edge", load: "causes"},
				{type: "node", load: "Gina feels gratitude"}, 
				{type: "edge", load: "because"},
				{type: "node", load: "Gina's friend brought her a bracelet"},
				{type: "edge", load: "motivates"},
				{type: "node", load: "Gina pretends to be grateful"}
				];
global.step = 0;	

export function prepareOptionList(answers){
    var options = []
    answers.array.forEach((element, index) => {
        options.push({label: element, value: `answer-${index}`, trigger: 'confirm-guess'})
    });
    latest_answer_options = options;
}

function stepper(){
	global.step += 2;
};
function stepChecker(){
	if (step > reasoning.length-2){	//meaning there is less than 1 whole step left
	}
};

const ButtonHumanNeed = props => (
	<>
		<h1>{reasoning[0].load}</h1>
      <button onClick={() => {props.triggerNextStep({trigger: 'last-of-human'});}}>
        This makes sense. 
      </button>
      <button onClick={() => {props.triggerNextStep({trigger: 'welcome-msg2'});}}>
        No, this is wrong.
      </button>
    </>
);

const ButtonReasoningLogic = props => (
	<>
		<p>{reasoning[global.step].load}</p>
		<p>{reasoning[global.step + 1].load}</p>
		<p>{reasoning[global.step + 2].load}</p>
      <button onClick={() => {props.triggerNextStep({trigger: 'accept-logic'}); stepper();}}>
        This makes sense. 
      </button>
      <button onClick={() => {props.triggerNextStep({trigger: 'why1'});}}>
        No, this is wrong.
      </button>
    </>
);

export default function ChatBotPage() {
    const chat_steps = [
    	/****************************************************/
    	/*tutorial / intro*/
    	/****************************************************/
    	{
            id: "tut-intro",
            message: "Hello, I am an AI chatbot named 'Zheng-bot 3000'. I will begin by teaching you some of the basics.",
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
            asMessage: true,
            trigger: "intro-pane-3",
        },
        {
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
		      { value: 1, label: "Proceed", trigger: 'welcome-msg' },
		    ],
	    },
		/****************************************************/


        {
            id: "welcome-msg",
            message: "Let's get started analyzing the story. First, your opinion on the human need selection?",
            trigger: "welcome"
        },
        {
            id: "welcome",
            component: <ButtonHumanNeed />
        },

        /****************************************************/
        /*path for human need selection / acceptance*/
        /****************************************************/
        {
            id: "welcome-msg2",
            message: "I'd like your help to understand what you find wrong about my reasoning process. Please first select a human need that you find appropriate.",
            trigger: "proceed-human-need"
        },
		{
			id: "proceed-human-need",
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
            ]
		},
      	{
		    id: 'confirm-new-human-need',
		    message: "Are you sure the appropriate human need is {previousValue}?",
		    trigger: "last-of-human"
	    },
	    {
		    id: 'last-of-human',
		    message: "Great. Let's begin analyzing the rest of the AI's reasoning.",
		    trigger: "fin-human-need"
	    },
	    {
	    	id: "fin-human-need",
		    options: 
			    [
			      { value: 1, label: "Begin", trigger: 'acceptable-step'},
			    ]
	    },
        /****************************************************/

        /****************************************************/
        /*reasoning step analysis*/
        /****************************************************/
        {
        	id: "acceptable-step",
        	message: "Is this step in the AI's reasoning rational?",
        	trigger: "rational-step"
        },
        {
        	id: "rational-step",
        	component: <ButtonReasoningLogic />                
        },
        //reasoning IS rational
        {
        	id: "accept-logic",
        	message: "Great. You've selected that the previous reasoning performed by the AI is acceptable. Let's move to the next step.",
        	trigger: "acceptable-step"
        },

        //reasoning is NOT rational
        {
        	id: "why1",
        	message: "Sample reasoning, and sample focus values on original story.",
        	trigger: "what-wrong"
        },
        {
        	id: "what-wrong",
        	options:
        		[
        			{value: '0', label: "Incorrect Focus", trigger: "ask-focus"},
        			{value: '1', label: "Incorrect Word Sense", trigger: "ask-sense"},
        			{value: '2', label: "Incorrect Knowledge", trigger: "ask-know"}
        		]
        },
        {
        	id: "ask-focus",
        	message: "It seems my original reasoning was incorrect because what I thought was important in the original story was incorrect. I believe I may have focused on the wrong information. Please select from the story the most important content.",
        	trigger: "provide-focus"
        },
        {
        	id: "provide-focus",
        	message: "example of user selecting correct focus on story",
        	trigger: "re-organize-confirm"
        },

        {
        	id: "ask-sense",
        	message: "It seems I misunderstood some words in my own reasoning. Please correct me by selecting the word(s), then choosing the appropriate definition from the list of options.",
        	trigger: "provide-sense"
        },
        {
        	id: "provide-sense",
        	message: "Example selection of user-modifications.",
        	trigger: "re-organize-ask"
        },
        {
        	id: "re-organize-ask",
        	message: "Does this reasoning look more appropriate?",
        	trigger: "re-organize-confirm"
        },
        {
        	id: "re-organize-confirm",
        	options:
        		[
        			{value: '0', label: "Looks good!", trigger: "accept-logic"},
        			{value: '1', label: "It is still incorrect. Let's work on it a little more.", trigger: "what-wrong"},
        		]
        },
        {
        	id: "ask-know",
        	message: "It seems my reasoning is incorrect because I lack some background knowledge. Please select the way that you would like to help me understand.",
        	trigger: "provide-know"
        },
        {
        	id: "provide-know",
     		options:
        		[
        			{value: '0', label: "I want to ask questions to see if you have made a simple mistake in your reasoning.", trigger: "further-know-kb"},
        			{value: '1', label: "I don't think you understand at all, let me type out the information.", trigger: "further-know-provide"},
        		]
        },
        {
        	id: "further-know-kb",
        	message: "placeholder of questions asked from user to AI",
        	trigger: "ask-self-reflect"
        },
        {
        	id: "further-know-provide",
        	message: "added knowledge placeholder.",
        	trigger: "generalize-rule"
        },
        {
        	id: "generalize-rule",
        	message: "placeholder for generalize rule",
        	trigger: "ask-self-reflect"
        },
        {
        	id: "ask-self-reflect",
        	message: "From this list of logical fallacies, please select all if any that apply to your contribution to my reasoning.",
        	trigger: "do-self-reflect"
        },
        {
        	id: "do-self-reflect",
        	message: "placeholder for self-reflection",
        	trigger: "ask-find-counterex"
        },
        {
        	id: "ask-find-counterex",
        	options:
        		[
        			{value: '0', label: "I cannot think of a counterexample. I think my contribution is good.", trigger: "accept-logic"},
        			{value: '1', label: "Yes I thought of a counterexample. Let me show you.", trigger: "do-find-counterex"},
        		]
        },
        {
        	id: "do-find-counterex",
        	message: "placeholder of counterexample.",
        	trigger: "accept-logic"
        },
    ];

    return (
        <>
			<Navbar bg="light" style={{width: "100%", "white-space": "no-wrap"}}expand="lg">
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="#home">Home</Nav.Link>
			      <Nav.Link href="#link">View All Stories</Nav.Link>
		  		<Popup trigger={<Nav.Link href="#link">Task Summary</Nav.Link>} position="bottom center" modal>
					<div style={{"background-color": '#fff', border: "3px solid #d7d7d7"}}>The chatbot AI has been asked to answer a question based on the story provided below, with a focus on what "Human Need" motivates the characters' behavior.<br/><br/> 
						Your task is to analyze the AI's reasoning by answering a series of questions to determine how rational the AI is at each step of its thought process.</div>
				</Popup>
			    <Popup trigger={<Nav.Link href="#link">Human Needs</Nav.Link>} position="bottom center" modal>
					<div style={{"background-color": '#fff', border: "3px solid #d7d7d7"}}>
						<ul>						
							<li>Food: the need to eat<br/></li>
							<li>Social Contact: the need for relationship with others<br/></li>
							<li>Health: the need for work out of the body<br/></li>
							<li>Savings: the need to accumulate something<br/></li>
							<li>Approval: the need to be appreciated<br/></li>
							<li>Order: the need for prepared, established, and conventional environments<br/></li>
							<li>Romance: the need for mating or sex<br/></li>
							<li>Power: the need for control of will<br/></li>
							<li>Family: the need to take care of one’s offspring<br/></li>
							<li>Physical Activity: the need for exercise<br/></li>
							<li>Honor: the need to be faithful to the customary values of an individual’s ethnic group, family or clan<br/></li>
							<li>Status: the need for social significance<br/></li>
							<li>Curiosity: the need to gain knowledge<br/></li>
							<li>Serenity: the need to be safe<br/></li>
							<li>Idealism: the need for social justice<br/></li>
							<li>Independence: the need to be distinct and self-reliant<br/></li>
						</ul>
					</div>
				</Popup>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>

			<div style={{display: "flex", "justify-content": "space-between"}}>
		        <ProSidebar style={{height: "92vh", display: "inline-block", float: "left", "z-index": "2"}}>
		      	<SidebarHeader>
			        <div	
			          style={{
			            padding: '10px',
			            textTransform: 'uppercase',
			            fontWeight: 'bold',
			            fontSize: 14,
			            letterSpacing: '1px',
			            overflow: 'visible',
			            textOverflow: 'ellipsis',
			            whiteSpace: 'nowrap',
			          }}>	
			        <BsGearWideConnected iconShape="cicrle" style={{margin: "20px"}} />Help Menu
		        	</div>
	      		</SidebarHeader>
				  <Menu>
				  		<Popup trigger={<MenuItem class="story" iconShape="cicrle" icon={<BsBook />}>View Story</MenuItem>} position="right center">
    						<div>Everyone got a bracelet except Gina. The next day her friend May brought one for Gina. It was clearly made with the leftover threads. It was ugly orange and green, but Gina pretended to be grateful.</div>
  						</Popup>

  						<Popup trigger={<MenuItem class="story" iconShape="cicrle" icon={<BsQuestionCircle />}>View Question</MenuItem>} position="right center">
    						<div>What human need drives Gina to pretend to be grateful?</div>
  						</Popup>
				  </Menu>
				</ProSidebar>

		        <div class="chatbot" style={{display: "block", margin: "0 auto", width: "100%",}}>
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
			                    height="73vh"
			                />
			            </main>
			    </div>
		        <div class="visualization" style={{float: "right", "borderStyle": "solid", width: "20%", height: "92vh"}}>Visual</div>
		    </div>
        </>
    );
}

