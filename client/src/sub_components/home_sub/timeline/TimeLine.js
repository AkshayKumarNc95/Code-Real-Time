import React from "react";
import { List, Button, Image, Header, Item } from "semantic-ui-react";

// Css
import "./timeline.css";
import ListItem from "../../common/ListItem";

export default function TimeLine(props) {
  const data = [
    { id: 1, Title: "One", Thumbnail: null },
    { id: 2, Title: "One", Thumbnail: null },
    { id: 3, Title: "One", Thumbnail: null },
    { id: 4, Title: "One", Thumbnail: null },
    { id: 5, Title: "One", Thumbnail: null },
  ];

  return (
    <div id="time-line-outer">
      <Header as="h3" block>
        Your TimeLine:
      </Header>
      {/* <List animated verticalAlign='middle' size = 'massive'>
        {data.map((ele)=>(
            <ListItem Title = {ele.Title} Thumbnail = {ele.Thumbnail} />
        ))}
      </List> */}
      <List relaxed="very" size="massive">
        {data.map((ele) => (
          <ListItem
            key={ele.id}
            onClick={props.onThumbClick}
            Title={ele.Title}
            Thumbnail={ele.Thumbnail}
          />
        ))}
      </List>
    </div>
  );
}
