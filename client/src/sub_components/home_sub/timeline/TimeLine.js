import React from "react";
import { List, Button, Image, Header, Item } from "semantic-ui-react";

// Css
import "./timeline.css";
import ListItem from "../../common/ListItem";

export default function TimeLine(props) {
  const data = [{ Title: "One", Thumbnail: null }, {}, {}, {}, {}];

  return (
    <div id="time-line-outer">
      {/* <List animated verticalAlign='middle' size = 'massive'>
        {data.map((ele)=>(
            <ListItem Title = {ele.Title} Thumbnail = {ele.Thumbnail} />
        ))}
      </List> */}

      <Item.Group>
      {data.map((ele)=>(
            <ListItem Title = {ele.Title} Thumbnail = {ele.Thumbnail} />
        ))}
      </Item.Group>
    </div>
  );
}
