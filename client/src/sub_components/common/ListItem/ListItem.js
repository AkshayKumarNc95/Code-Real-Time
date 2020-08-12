import React from "react";
import { List, Image, Button, Item } from "semantic-ui-react";

import './listitem.css';

export default function ListItem(props) {
  return (
    <List.Item onClick={props.onClick}>
      <Image size = "medium" src="/thumbnails/one.jpg" />
      <List.Content>
        <List.Header as="a">Meeting Name</List.Header>
        <List.Description id = "list-item-description">
        03hrs - 
           <a>
            <i>Akshay</i>, 
            <i>Kumar</i>
          </a>{" "}
        -
        9:16 (8/11/2020)
        </List.Description>
      </List.Content>
    </List.Item>
  );
}
