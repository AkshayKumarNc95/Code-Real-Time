import React from "react";
import { List, Button, Image, Header } from "semantic-ui-react";

// Css
import "./timeline.css";

export default function TimeLine(props) {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div id="time-line-outer">
      <Header as="h3" block>
        Your TimeLine: 
        <Button id= 'btn-header'>Filters- </Button>
      </Header>
      <List divided verticalAlign="middle">
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>
          <Image avatar src="/images/avatar/small/lena.png" />
          <List.Content>Lena</List.Content>
        </List.Item>
      </List>
    </div>
  );
}
