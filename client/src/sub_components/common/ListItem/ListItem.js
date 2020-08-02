import React from "react";
import { List, Image, Button, Item } from "semantic-ui-react";

export default function ListItem(props) {
  return (
    // <List.Item>
    //   <List.Content floated="right">
    //     <Button>Watch</Button>
    //   </List.Content>
    //   <Image avatar src={props.Thumbnail || ""} />
    //   <List.Content>
    //     <List.Header>{props.Title || "Hahah"}</List.Header>
    //     Hello boys
    //   </List.Content>
    // </List.Item>

    <Item>
      <Item.Image size="tiny" src="/images/wireframe/image.png" />

      <Item.Content>
        <Item.Header as="a">Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src="/images/wireframe/short-paragraph.png" />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  );
}
