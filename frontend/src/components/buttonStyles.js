import styled from 'styled-components';
import { Button } from '@mui/material';

// RedButton: A button with a red background and white text, changes to lighter red on hover
export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

// BlackButton: A button with a black background and white text, changes to dark gray on hover
export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

// DarkRedButton: A button with a dark red background and white text, changes to lighter red on hover
export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

// BlueButton: A button with a dark blue background and white text, changes to brighter blue on hover
export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

// PurpleButton: A button with a purple background and white text, changes to darker purple on hover
export const PurpleButton = styled(Button)`
  && {
    background-color: #270843;
    color: #fff;
    &:hover {
      background-color: #3f1068;
    }
  }
`;

// LightPurpleButton: A button with a light purple background and white text, changes to darker purple on hover
export const LightPurpleButton = styled(Button)`
  && {
    background-color: #7f56da;
    color: #fff;
    &:hover {
      background-color: #7a1ccb;
    }
  }
`;

// GreenButton: A button with a dark green background and white text, changes to brighter green on hover
export const GreenButton = styled(Button)`
  && {
    background-color: #133104;
    color: #fff;
    &:hover {
      background-color: #266810;
    }
  }
`;

// BrownButton: A button with a brown background and white text, changes to darker brown on hover
export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

// IndigoButton: A button with an indigo background and white text, changes to lighter indigo on hover
export const IndigoButton = styled(Button)`
  && {
    background-color: #2f2b80;
    color: white;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;
