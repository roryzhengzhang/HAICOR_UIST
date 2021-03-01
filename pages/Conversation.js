import "reactjs-popup/dist/index.css";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

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
        "placeholder of focus in story for this evidence"
      ],
      [
        "SomeoneA wants somethingA. SomeoneB giving someoneA somethingA causes someoneA to have gratitude for someoneB.",
        "placeholder of focus in story for this evidence"
      ],
      [
        "SomeoneA wants to lie to someoneB. To lie causes pretend. Someone A pretends to be someonethingA to lie to someoneB.",
        "placeholder of focus in story for this evidence"
      ]
  ];

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
          props.triggerNextStep({ trigger: "last-of-human" });
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

//start chatbot functionality
  render() {
    return (
      <ChatBot
        headerTitle="Collaboration with AI"
        // speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
          /****************************************************/
          /*tutorial / intro*/
          /****************************************************/
          {
            id: "tut-intro",
            message:
              "Hello, I am an AI chatbot named 'Zheng-bot 3000'. I will begin by teaching you some of the basics.",
            trigger: "intro-pane",
          },
          {
            id: "intro-pane",
            component: (
              <div>
                <div>
                  In the visualization window, blocks of this color{" "}
                  <img src="/node_display.png" />
                  <br />
                  represent statements or claims.
                  <br />
                  <br />
                  For example:
                  <br />
                  <img src="/example_statement.png" />
                </div>
              </div>
            ),
            asMessage: true,
            trigger: "intro-pane-2",
          },
          {
            id: "intro-pane-2",
            component: (
              <div>
                <div>
                  Additionally, blocks of this color{" "}
                  <img src="/edge_display.png" /> <br />
                  represent relationships between claims
                  <br />
                  <br />
                  For example:
                  <br />
                  <img src="/example_edge.png" />
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
                  Where the overall structure of the logic, connecting two
                  claims would look like:
                  <br />
                  <img src="/overall_logic.png" />
                </div>
              </div>
            ),
            asMessage: true,
            trigger: "intro-tool-msg",
          },
          {
            id: "intro-tool-msg",
            message:
              "You can also access task-related information via the toolbar.",
            trigger: "intstruction-confirm",
          },
          {
            id: "intstruction-confirm",
            options: [{ value: 1, label: "Proceed", trigger: "welcome-msg" }],
          },
          /****************************************************/

          {
            id: "welcome-msg",
            message:
              "Let's get started analyzing the story. First, your opinion on the human need selection?",
            trigger: "welcome0",
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
              "I'd like your help to understand what you find wrong about my reasoning process. Please first select a human need that you find appropriate.",
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
            message:
              "Great. Let's begin analyzing the rest of the AI's reasoning.",
            trigger: "fin-human-need",
          },
          {
            id: "fin-human-need",
            options: [{ value: 1, label: "Begin", trigger: "acceptable-step" }],
          },
          /****************************************************/

          /****************************************************/
          /*reasoning step analysis*/
          /****************************************************/
          {
            id: "acceptable-step",
            message: "Is this step in the AI's reasoning rational?",
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
            asMessage: true,
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
              { value: "0", label: "Looks good!", trigger: "accept-logic" },
              {
                value: "1",
                label: "It is still incorrect. Let's work on it a little more.",
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
                  "I want to ask questions to see if you have made a simple mistake in your reasoning.",
                trigger: "further-know-kb",
              },
              {
                value: "1",
                label:
                  "I don't think you understand at all, let me type out the information.",
                trigger: "further-know-provide",
              },
            ],
          },
          {
            id: "further-know-kb",
            message: "placeholder of questions asked from user to AI",
            trigger: "ask-self-reflect",
          },
          {
            id: "further-know-provide",
            message: "added knowledge placeholder.",
            trigger: "generalize-rule",
          },
          {
            id: "generalize-rule",
            message: "placeholder for generalize rule",
            trigger: "ask-self-reflect",
          },
          {
            id: "ask-self-reflect",
            message:
              "From this list of logical fallacies, please select all if any that apply to your contribution to my reasoning.",
            trigger: "do-self-reflect",
          },
          {
            id: "do-self-reflect",
            message: "placeholder for self-reflection",
            trigger: "ask-find-counterex",
          },
          {
            id: "ask-find-counterex",
            options: [
              {
                value: "0",
                label:
                  "I cannot think of a counterexample. I think my contribution is good.",
                trigger: "accept-logic",
              },
              {
                value: "1",
                label: "Yes I thought of a counterexample. Let me show you.",
                trigger: "do-find-counterex",
              },
            ],
          },
          {
            id: "do-find-counterex",
            message: "placeholder of counterexample.",
            trigger: "accept-logic",
          },
        ]}
        fontFamily="Helvetica"
        width="100%"
        height="73vh"
      />
    );
  }
}

export default Conversation;
