import React, { CSSProperties, SetStateAction, useState } from 'react';
import {  Modal } from 'antd';


export interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}
const ModalApp = ({children,state,setState,styles}:{children:React.ReactNode,state:boolean,setState:React.Dispatch<SetStateAction<boolean>>,styles?:ModalStyles}) => {



  const handleCancel = () => {
    setState(false);
  };



  return (
    <>
      <Modal title="Basic Modal" open={state} okText={null} closeIcon={null} okButtonProps={{hidden:true}} cancelText={null} cancelButtonProps={{style:{display:"none"}}} onCancel={handleCancel} styles={styles}>
           {children} 
      </Modal>
    </>
  );
};

export default ModalApp;