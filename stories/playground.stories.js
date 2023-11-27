import React, { useState, useEffect } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Button from "../components/core/button/button";
import Divider from "../components/core/divider/divider";
import Heading from "../components/core/heading/heading";
import Icon from "../components/core/icon/icon";
import Input from "../components/core/input/input";
import Label from "../components/core/label/label";
import Logo from "../components/core/logo/logo";
import Message from "../components/core/message/message";
import Selectbox from "../components/core/selectbox/selectbox";
import Text from "../components/core/text/text";
import Captcha from "../components/core/captcha/captcha";
import StoreProvider from "../stores/StoreProvider";
import Form from "../components/core/form/form";
import Field from "../components/core/form/field/field";
import VerifyCode from "../components/verifycode/verifyCode";

export default {
  title: "Playground",
};

export const Playground = () => (
  <div className="storybook_liveview">
    <StoreProvider>
      <LiveProvider
        code={`<div style={{maxWidth:400, margin:'auto'}}>\n    <Button />    \n</div>`}
        scope={{
          React,
          Button,
          Divider,
          Heading,
          Icon,
          Input,
          Label,
          Logo,
          Message,
          Selectbox,
          Text,
          Form,
          Field,
          Captcha,
          VerifyCode,
          useState,
          useEffect,
        }}
        fontFamily="monospace"
      >
        <LiveEditor className="liveEditor" />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </StoreProvider>
  </div>
);
