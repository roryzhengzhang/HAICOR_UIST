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
console.log(reasoning[0].type);

export function prepareOptionList(answers){
    var options = []
    answers.array.forEach((element, index) => {
        options.push({label: element, value: `answer-${index}`, trigger: 'confirm-guess'})
    });
    latest_answer_options = options;
}

export default function ChatBotPage() {
    const chat_steps = [
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
		      { value: 1, label: "Proceed", trigger: 'intro-tool-msg' },
		    ],
	    },
        {
            id: "intro-tool-msg",
            message: "hello"
        },
    ];

    return (
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

