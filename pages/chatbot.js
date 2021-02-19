import ChatBot from "react-simple-chatbot"
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
		<h1>{reasoning[step].load}</h1>
      <button onClick={() => {props.triggerNextStep({trigger: 'last-of-human'});}}>
        This makes sense. 
      </button>
      <button onClick={() => {props.triggerNextStep({trigger: 'welcome-msg2'});}}>
        No, this is wrong.
      </button>
    </>
);

const Logic = props => (
	<div style={{height: "12vh", display: "block", width: "100%", position: "relative", "text-align": "center"}}>
		<p>{reasoning[global.step].load}</p>
		<p>{reasoning[global.step + 1].load}</p>
		<p>{reasoning[global.step + 2].load}</p>
	</div>
);

const ButtonReasoningLogic = props => (
	<>
      <button onClick={() => {props.triggerNextStep({trigger: 'accept-logic'}); stepper();}}>
        This makes sense. 
      </button>
      <button onClick={() => {props.triggerNextStep({trigger: 'cont-human-need'});}}>
        No, this is wrong.
      </button>
    </>
);

export default function ChatBotPage() {
    const chat_steps = [
  //   	/****************************************************/
  //   	/*tutorial / intro*/
  //   	/****************************************************/
  //   	{
  //           id: "tut-intro",
  //           message: "Hello, I am an AI chatbot named 'Zheng-bot 3000'. I will begin by teaching you some of the basics.",
  //           trigger: "intro-pane"
  //       },
  //   	{
  //           id: "intro-pane",
  //           component: (
  //               <div>
  //                   <div>
  //                   	In the visualization window, blocks of this color {" "}
  //                       <img src="/node_display.png" /><br/>
  //                   	represent statements or claims.<br/><br/>
  //                   	For example:<br/>
  //                   	<img src="/example_statement.png"/>
  //                   </div>
  //               </div>
  //           ),
  //           asMessage: true,
  //           trigger: "intro-pane-2"
  //       },
  //       {
  //           id: "intro-pane-2",
  //           component: (
  //               <div>
  //                   <div>
  //                   	Additionally, blocks of this color {" "}
  //                       <img src="/edge_display.png" />{" "} <br/>
  //                   	represent relationships between claims<br/><br/>
  //                   	For example:<br/>
  //                   	<img src="/example_edge.png"/>
  //               	</div>
  //               </div>
  //           ),
  //           asMessage: true,
  //           trigger: "intro-pane-3",
  //       },
  //       {
  //           id: "intro-pane-3",
  //           component: (
  //               <div>
  //                   <div>
  //                   	Where the overall structure of the logic, connecting two claims would look like:<br/>
  //                   	<img src="/overall_logic.png"/>
  //               	</div>
  //               </div>
  //           ),
  //           asMessage: true,
  //           trigger: "intro-tool-msg",
  //       },
  //       {
  //           id: "intro-tool-msg",
  //           message: "You can also access task-related information via the toolbar.",
  //           trigger: "intstruction-confirm"
  //       },
  //     	{
		//     id: 'intstruction-confirm',
		//     options: 
		//     [
		//       { value: 1, label: "Proceed", trigger: 'welcome-msg' },
		//     ],
	 //    },
		// /****************************************************/


  //       {
  //           id: "welcome-msg",
  //           message: "Let's get started analyzing the story. First, your opinion on the human need selection?",
  //           trigger: "welcome"
  //       },
  //       {
  //           id: "welcome",
  //           component: <ButtonHumanNeed />
  //       },

  //       /****************************************************/
  //       /*path for human need selection / acceptance*/
  //       /****************************************************/
  //       {
  //           id: "welcome-msg2",
  //           message: "I'd like your help to understand what you find wrong about my reasoning process. Please first select a human need that you find appropriate.",
  //           trigger: "proceed-human-need"
  //       },
		// {
		// 	id: "proceed-human-need",
  //           options: [
  //               { value: 'Food', label: 'Food', trigger: "confirm-new-human-need" },
  //               { value: 'Social contact', label: 'Social contact', trigger: "confirm-new-human-need" },
  //               { value: 'Health', label: 'Health', trigger: "confirm-new-human-need" },
  //               { value: 'Savings', label: 'Savings', trigger: "confirm-new-human-need" },
  //               { value: 'Approval', label: 'Approval', trigger: "confirm-new-human-need" },
  //               { value: 'Order', label: 'Order', trigger: "confirm-new-human-need" },
  //               { value: 'Safety', label: 'Safety', trigger: "confirm-new-human-need" },
  //               { value: 'Romance', label: 'Romance', trigger: "confirm-new-human-need" },
  //               { value: 'Belonging', label: 'Belonging', trigger: "confirm-new-human-need" },
  //               { value: 'Power', label: 'Power', trigger: "confirm-new-human-need" },
  //               { value: 'Safety', label: 'Safety', trigger: "confirm-new-human-need" },
  //               { value: 'Family', label: 'Family', trigger: "confirm-new-human-need" },
  //               { value: 'Competition', label: 'Competition', trigger: "confirm-new-human-need" },
  //               { value: 'Honor', label: 'Honor', trigger: "confirm-new-human-need" },
  //               { value: 'Status', label: 'Status', trigger: "confirm-new-human-need" },
  //               { value: 'Curiosity', label: 'Curiosity', trigger: "confirm-new-human-need" },
  //               { value: 'Serenity', label: 'Serenity', trigger: "confirm-new-human-need" },
  //               { value: 'Idealism', label: 'Idealism', trigger: "confirm-new-human-need" },
  //               { value: 'Independence', label: 'Independence', trigger: "confirm-new-human-need" },
  //           ]
		// },
  //     	{
		//     id: 'confirm-new-human-need',
		//     message: "Are you sure the appropriate human need is {previousValue}?",
		//     trigger: "last-of-human"
	 //    },
	 //    {
		//     id: 'last-of-human',
		//     message: "Great. Let's begin analyzing the rest of the AI's reasoning.",
		//     trigger: "fin-human-need"
	 //    },
	 //    {
	 //    	id: "fin-human-need",
		//     options: 
		// 	    [
		// 	      { value: 1, label: "Begin", trigger: 'acceptable-step'},
		// 	    ]
	 //    },
  //       /****************************************************/

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
        }
    ];

    return (
        <>
			<Navbar bg="light" style={{width: "100%", "white-space": "no-wrap" }}expand="lg">
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="#home">Home</Nav.Link>
			      <Nav.Link href="#link">View Stories</Nav.Link>
			      <NavDropdown title="Options" id="basic-nav-dropdown">
			        <NavDropdown.Item href="#action/3.2">View Task Summary</NavDropdown.Item>
			        <NavDropdown.Item href="#action/3.3">View Human Needs</NavDropdown.Item>
			        <NavDropdown.Divider />
			        <NavDropdown.Item href="#action/3.4">Help</NavDropdown.Item>
			      </NavDropdown>
			    </Nav>
			    <Form inline>
			      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			      <Button variant="outline-success">Search</Button>
			    </Form>
			  </Navbar.Collapse>
			</Navbar>

			<div style={{display: "flex", "justify-content": "space-between"}}>
		        <ProSidebar collapsed="collapsed" style={{height: "100vh", display: "inline-block", float: "left", height: "92vh"}}>
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

				<div class="chat-and-logic" style={{width: "100%", margin:"10px"}}>
					<div class="visual-logic" style={{margin: "10px", "border": "1px solid gray"}}>
						<p style={{margin: "10px", "backgroundColor": "lightgrey", "borderLeft": "6px solid red"}}>Current Logic</p>
						<Logic />
					</div>

		        	<div class="chatbot" style={{display: "block", margin: "0 auto"}}>
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
			    </div>
		        <div class="visualization" style={{float: "right", "borderStyle": "solid", width: "20%", height: "92vh"}}>Visual</div>
		    </div>
        </>
    );
}

