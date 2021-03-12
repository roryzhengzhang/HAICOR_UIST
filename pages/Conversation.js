import "reactjs-popup/dist/index.css";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    fontFamily: "Helvetica Neue",
  }; 

class Conversation extends Component {
  constructor(props) {
    super(props);

    /************************************
    this.state is useless for now, but might be useful in the future.
    **************************************/

    
    // this.state = {
    // 	loading: true,
    // 	result: '',
    // 	trigger: false,
    //   };

    //   this.triggerNext = this.triggerNext.bind(this);
  } 

  //triplet premise: [evidence, focus]
  info = [
      [
        "Gratitude is like thankful. SomeoneA did somethingA for someoneB for approval of someoneA. SomeoneB is thankful.",
        "Example of focus."
      ],
      [
        "SomeoneA wants somethingA. SomeoneB giving someoneA somethingA causes someoneA to have gratitude for someoneB.",
        "Example of focus."
      ],
      [
        "SomeoneA wants to lie to someoneB. To lie causes pretend. Someone A pretends to be someonethingA to lie to someoneB.",
        "Example of focus."
      ]
  ];

  //type:load
  //type = node or edge
  //load = content
  node = [
    { load: "Gina wants approval" },
    { load: "Gina feels gratitude" },
    { load: "Gina's friend brought her a bracelet" },
    { load: "Gina pretends to be grateful" },
  ];

  edge = [{ load: "causes" }, { load: "because" }, { load: "motivates" }];

  nodeStep = 0;
  edgeStep = 0;

  prepareOptionList(answers) {
    var options = [];
    answers.array.forEach((element, index) => {
      options.push({
        label: element,
        value: `answer-${index}`,
        trigger: "confirm-guess",
      });
    });
    latest_answer_options = options;
  };

  triggerNext(props) {
    // this.setState({ trigger: true,
    //     result:[this.nodeStep < this.node.length? this.node[this.nodeStep].load : null,
    // 	this.edgeStep < this.edge.length? this.edge[this.edgeStep].load: null,
    //     this.nodeStep < this.node.length? this.node[this.nodeStep+1].load: null
    // ] }, () => {
    //     console.log(this.state.result);
    //   props.triggerNextStep({trigger: 'accept-logic'});
    // });
    props.triggerNextStep({ trigger: "accept-logic" });
    this.nodeStep++;
    this.edgeStep++;
  };

  ButtonHumanNeed = (props) => (
    <>
      <button
        onClick={() => {
          props.triggerNextStep({ trigger: "move-on-human-need" });
        }}
      >
        This makes sense.
      </button>
      <button
        onClick={() => {
          props.triggerNextStep({ trigger: "welcome-msg2" });
        }}
      >
        No, this is wrong.
      </button>
    </>
  );

  areEqual = (prevProps, nextProps) => true;

  ButtonReasoningLogic = React.memo(
    (props) => (
      <>
        {console.log(props)}
        <div style={{textAlign: "center"}}>
          <p>
            {this.nodeStep < this.node.length
              ? this.node[this.nodeStep].load
              : null}{" "}
            <br />
            {this.edgeStep < this.edge.length
              ? this.edge[this.edgeStep].load
              : null}
            <br />
            {this.nodeStep < this.node.length
              ? this.node[this.nodeStep + 1].load
              : null}
          </p>
        </div>
        {/* <button onClick={() => {props.triggerNextStep({trigger: 'accept-logic'}); this.nodeStep +=1; this.edgeStep +=1;}}> */}
        {/* <button onClick={() => {this.setState({ trigger: true }, () => {
		  props.triggerNextStep({trigger: 'accept-logic'});
		}); this.nodeStep +=1; this.edgeStep +=1;}}> */}

        <button
          onClick={() => {
            this.triggerNext(props);
          }}
        >
          This makes sense.
        </button>
        <button
          onClick={() => {
            props.triggerNextStep({ trigger: "explain-rationale" });
          }}
        >
          No, this is wrong.
        </button>
      </>
    ),
    this.areEqual
  );

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Chat with AI-Bot"
          // speechSynthesis={{ enable: true, lang: 'en' }}
          steps={[
            /****************************************************/
            /*tutorial / intro*/
            /****************************************************/
            {
              id: "tut-intro",
              message:
                "Hello, I am an AI chatbot.",
              trigger: "present-goal"
            },
            {
              id: "present-goal",
              message: "Your task is to teach me commonsense by answering and asking questions.",
              trigger: "present-task"
            },
            {
              id: "present-task",
              message: "I'll provide you a story, and you guide me along as I think about it. Are you ready to begin?",
              trigger: "present-story"
            },
            {
                id: "present-story",
                component: 
                  <>
                    <div>
                      <h1>Your Story</h1><hr/>
                      Everyone got a bracelet except Gina. The next day her friend
                      May brought one for Gina. It was clearly made with the
                      leftover threads. It was ugly orange and green, but Gina
                      pretended to be grateful.
                    </div>
                  </>,
                trigger: "confirm-tut",
            },
            {
              id: "confirm-tut",
              options: [{value: 0, label: "Ready", trigger: "welcome-msg"}]
            },
            /****************************************************/

            {
              id: "welcome-msg",
              message:
                "First let's discuss human needs.",
              trigger: "explain-human-need1",
            },
            {
              id: "explain-human-need1",
              message: "Humans have needs that motivate them to act.",
              trigger: "explain-human-need2"
            },
            {
              id: "explain-human-need2",
              component:
                <>
                  <img  src="/needs.png" />
                </>,
              trigger: "explain-human-need3"
            },
            {
              id: "explain-human-need3",
              message: "Here are some examples",
              trigger: "explain-human-need4"
            },
            {
              id: "explain-human-need4",
              component: 
                <>
                  <div>
                    <hr/>
                    <h1>Curiosity</h1><br/>
                    <p><i><b>Jen heard a rustle in the bushes. She put down her phone and walked over to it.</b></i></p>
                    <br/>
                    <p>It is clear that Jen wanted to check out the bushes to see what made that sound!</p>
                    <hr/>

                    <hr/>
                    <h1>Eating</h1>
                    <br/>
                    <p><b><i>In the morning Brian saw his refrigerator was empty. He decided to run to the corner store and buy some muffins.</i></b></p>
                    <br/>
                    <p>Here Brian was obviously hungry, and in need of food during breakfast time. So he took a trip to his local grocer to pick up a meal.</p>
                    <hr/>
                  </div>
                </>,
              trigger: "fin-HN"
            },
            {
              id: "fin-HN",
              message: "You can find a full list of human needs and their meanings in the dashboard.",
              trigger: "move-past-HN-text"
            },
            {
              id: "move-past-HN-text",
              message: "Let's start analyzing my thoughts on this regarding your story. Are you ready?",
              trigger: "move-past-HN-question"
            },
            {
              id: "move-past-HN-question",
              options: [
                {value: 0, label: "Continue", trigger: "welcome0"},
              ],
            },
            {
              id: "welcome0",
              component:              
                <>
                  <div>
                    <div style={{margin: "20px", display: "block", textAlign: "center"}}>
                      <p>{this.node[0].load}</p>
                    </div>
                    <br /><br />
                  </div>
                </>,
              asMessage: true,
              trigger: "welcome"
            },  
            {
              id: "welcome",
              component: (<this.ButtonHumanNeed />),
              asMessage: true
            },

            /****************************************************/
            /*path for human need selection / acceptance*/
            /****************************************************/
            {
              id: "welcome-msg2",
              message:
                "Okay! Please select the appropriate human need.",
              trigger: "proceed-human-need",
            },
            {
              id: "proceed-human-need",
              options: [
                {
                  value: "Food",
                  label: "Food",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Social contact",
                  label: "Social contact",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Health",
                  label: "Health",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Savings",
                  label: "Savings",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Approval",
                  label: "Approval",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Order",
                  label: "Order",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Safety",
                  label: "Safety",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Romance",
                  label: "Romance",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Belonging",
                  label: "Belonging",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Power",
                  label: "Power",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Safety",
                  label: "Safety",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Family",
                  label: "Family",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Competition",
                  label: "Competition",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Honor",
                  label: "Honor",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Status",
                  label: "Status",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Curiosity",
                  label: "Curiosity",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Serenity",
                  label: "Serenity",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Idealism",
                  label: "Idealism",
                  trigger: "confirm-new-human-need",
                },
                {
                  value: "Independence",
                  label: "Independence",
                  trigger: "confirm-new-human-need",
                },
              ],
            },
            {
              id: "confirm-new-human-need",
              message:
                "Are you sure the appropriate human need is {previousValue}?",
              trigger: "last-of-human",
            },
            {
              id: "last-of-human",
              options: [
                          { value: 1, label: "Accept", trigger: "move-on-human-need" },
                          { value: 2, label: "Retry", trigger: "welcome-msg2" }
              ]
            },
            {
              id: "move-on-human-need",
              message: "Great. Let's continue.",
              trigger: "acceptable-step"
            },
            /****************************************************/

            /****************************************************/
            /*reasoning step analysis*/
            /****************************************************/
            {
              id: "acceptable-step",
              message: "Is this step in the my reasoning rational?",
              trigger: "rational-step",
            },
            {
              id: "rational-step",
              component: <this.ButtonReasoningLogic />,
              asMessage: true
            },
            {
              id: "explain-rationale",
              component:
                <div>
                  <p>Here is the explanation for my reasoning:</p>
                  <div style={{border: "solid", margin: "20px", display: "block", textAlign: "center"}}>
                    {this.info[this.nodeStep][0]}
                    <br /><br />
                  </div>
                  <p>Here is the part of the story I focused on when making my reasoning:</p>
                  <div style={{border: "solid", margin: "20px", display: "block", textAlign: "center"}}>
                    {this.info[this.nodeStep][1]}
                  </div>
                  <br /><br />
                </div>,
              trigger: "what-wrong"
            },

            //reasoning IS rational
            {
              id: "accept-logic",
              message:
                "Great. You've selected that the previous reasoning performed by the AI is acceptable. Let's move to the next step.",
              trigger: "acceptable-step",
            },
            {
              id: "what-wrong",
              options: [
                { value: "0", label: "Incorrect Focus", trigger: "ask-focus" },
                {
                  value: "1",
                  label: "Incorrect Word Sense",
                  trigger: "ask-sense",
                },
                { value: "2", label: "Incorrect Knowledge", trigger: "ask-know" },
              ],
            },
            {
              id: "ask-focus",
              message:
                "It seems my original reasoning was incorrect because what I thought was important in the original story was incorrect. I believe I may have focused on the wrong information. Please select from the story the most important content.",
              trigger: "provide-focus",
            },
            {
              id: "provide-focus",
              message: "example of user selecting correct focus on story",
              trigger: "re-organize-confirm",
            },

            {
              id: "ask-sense",
              message:
                "It seems I misunderstood some words in my own reasoning. Please correct me by selecting the word(s), then choosing the appropriate definition from the list of options.",
              trigger: "provide-sense",
            },
            {
              id: "provide-sense",
              message: "Example selection of user-modifications.",
              trigger: "re-organize-ask",
            },
            {
              id: "re-organize-ask",
              message: "Does this reasoning look more appropriate?",
              trigger: "re-organize-confirm",
            },
            {
              id: "re-organize-confirm",
              options: [
                { value: "0", label: "Accept", trigger: "accept-logic" },
                {
                  value: "1",
                  label: "Retry",
                  trigger: "what-wrong",
                },
              ],
            },
            {
              id: "ask-know",
              message:
                "It seems my reasoning is incorrect because I lack some background knowledge. Please select the way that you would like to help me understand.",
              trigger: "provide-know",
            },
            {
              id: "provide-know",
              options: [
                {
                  value: "0",
                  label:
                    "Let me see what you know.",
                  trigger: "further-know-kb",
                },
                {
                  value: "1",
                  label:
                    "I'll tell you what you missed.",
                  trigger: "further-know-provide",
                },
              ],
            },
            {
              id: "further-know-kb",
              message: "placeholder of questions asked from user to AI",
              trigger: "ask-find-counterex",
            },
            {
              id: "further-know-provide",
              user: true,
              trigger: "generalize-rule",
            },
            {
              id: "generalize-rule",
              message: "'{previousValue}', I will process this. Thank you.",
              trigger: "find-counterex",
            },
            {
              id: "find-counterex",
              message: "Can you find a counterexample for when your added knowledge could be false?",
              trigger: "ask-find-counterex"
            },
            {
              id: "ask-find-counterex",
              options: [
                {
                  value: "0",
                  label:
                    "Yes",
                  trigger: "do-find-counterex",
                },
                {
                  value: "1",
                  label: "No",
                  trigger: "accept-logic",
                },
              ],
            },
            {
              id: "do-find-counterex",
              user: true,
              trigger: "accept-counter-example",
            },
            {
              id: "display-counterex",
              message: "'{previousValue}', is this correct?",
              trigger: "accept-counter-example"
            },
            {
              id: "accept-counter-example",
              options: [
                {
                  value: "0",
                  label: "Accept",
                  trigger: "accept-logic",
                },
                {
                  value: "1",
                  label: "Re-Enter",
                  trigger: "do-find-counterex",
                },
              ],
            },
          ]}
          width="100%"
          height="100vh"
        />
      </ThemeProvider>
    );
  }
}

export default Conversation;
