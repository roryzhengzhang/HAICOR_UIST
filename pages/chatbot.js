import "reactjs-popup/dist/index.css";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatBot from "react-simple-chatbot";
import Head from "next/head";
import AgentAnswer from "./AgentAnswer";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import { BsBook, BsQuestionCircle, BsGearWideConnected } from "react-icons/bs";
import {
  Navbar,
  NavItem,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Conversation from "./Conversation";

class chatbot extends Component {
  render() {
    return (
      <>
        <Navbar
          bg="light"
          style={{ width: "100%", "white-space": "no-wrap" }}
          expand="lg"
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">View All Stories</Nav.Link>
              <Popup
                trigger={<Nav.Link href="#link">Task Summary</Nav.Link>}
                position="bottom center"
                modal
              >
                <div
                  style={{
                    "background-color": "#fff",
                    border: "3px solid #d7d7d7",
                  }}
                >
                  The chatbot AI has been asked to answer a question based on
                  the story provided below, with a focus on what "Human Need"
                  motivates the characters' behavior.
                  <br />
                  <br />
                  Your task is to analyze the AI's reasoning by answering a
                  series of questions to determine how rational the AI is at
                  each step of its thought process.
                </div>
              </Popup>
              <Popup
                trigger={<Nav.Link href="#link">Human Needs</Nav.Link>}
                position="bottom center"
                modal
              >
                <div
                  style={{
                    "background-color": "#fff",
                    border: "3px solid #d7d7d7",
                  }}
                >
                  <ul>
                    <li>
                      Food: the need to eat
                      <br />
                    </li>
                    <li>
                      Social Contact: the need for relationship with others
                      <br />
                    </li>
                    <li>
                      Health: the need for work out of the body
                      <br />
                    </li>
                    <li>
                      Savings: the need to accumulate something
                      <br />
                    </li>
                    <li>
                      Approval: the need to be appreciated
                      <br />
                    </li>
                    <li>
                      Order: the need for prepared, established, and
                      conventional environments
                      <br />
                    </li>
                    <li>
                      Romance: the need for mating or sex
                      <br />
                    </li>
                    <li>
                      Power: the need for control of will
                      <br />
                    </li>
                    <li>
                      Family: the need to take care of one’s offspring
                      <br />
                    </li>
                    <li>
                      Physical Activity: the need for exercise
                      <br />
                    </li>
                    <li>
                      Honor: the need to be faithful to the customary values of
                      an individual’s ethnic group, family or clan
                      <br />
                    </li>
                    <li>
                      Status: the need for social significance
                      <br />
                    </li>
                    <li>
                      Curiosity: the need to gain knowledge
                      <br />
                    </li>
                    <li>
                      Serenity: the need to be safe
                      <br />
                    </li>
                    <li>
                      Idealism: the need for social justice
                      <br />
                    </li>
                    <li>
                      Independence: the need to be distinct and self-reliant
                      <br />
                    </li>
                  </ul>
                </div>
              </Popup>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div style={{ display: "flex", "justify-content": "space-between" }}>
          <ProSidebar
            style={{
              height: "92vh",
              display: "inline-block",
              float: "left",
              "z-index": "2",
            }}
          >
            <SidebarHeader>
              <div
                style={{
                  padding: "10px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "visible",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <BsGearWideConnected
                  iconShape="cicrle"
                  style={{ margin: "20px" }}
                />
                Help Menu
              </div>
            </SidebarHeader>
            <Menu>
              <Popup
                trigger={
                  <MenuItem class="story" iconShape="cicrle" icon={<BsBook />}>
                    View Story
                  </MenuItem>
                }
                position="right center"
              >
                <div>
                  Everyone got a bracelet except Gina. The next day her friend
                  May brought one for Gina. It was clearly made with the
                  leftover threads. It was ugly orange and green, but Gina
                  pretended to be grateful.
                </div>
              </Popup>

              <Popup
                trigger={
                  <MenuItem
                    class="story"
                    iconShape="cicrle"
                    icon={<BsQuestionCircle />}
                  >
                    View Question
                  </MenuItem>
                }
                position="right center"
              >
                <div>
                  What human need drives Gina to pretend to be grateful?
                </div>
              </Popup>
            </Menu>
          </ProSidebar>

          <div
            class="chatbot"
            style={{ display: "block", margin: "0 auto", width: "100%" }}
          >
            <Head>
              <title>Co-Reasoning ChatBot</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <Conversation />
            </main>
          </div>
          <div
            class="visualization"
            style={{
              float: "right",
              borderStyle: "solid",
              width: "20%",
              height: "92vh",
            }}
          >
            Visual
          </div>
        </div>
      </>
    );
  }
}

export default chatbot;
