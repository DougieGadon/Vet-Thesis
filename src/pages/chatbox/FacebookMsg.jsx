
import React, { Component} from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default class FacebookMsg extends Component {
  render() {
    return (
      <FacebookProvider appId="947734189784076" chatSupport>
        <CustomChat pageId="105615302625029" minimized="true"/>
      </FacebookProvider>    
    );
  }
}