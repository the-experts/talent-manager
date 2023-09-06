'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {useFetchAllSkills} from "@/app/hooks/skills";

export default function ModalWrapper(props: any): JSX.Element {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const allSkills = useFetchAllSkills();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add a Skill
            </Button>
            <Modal
                title="Add a Skill"
                open={open}
                width={700}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={'Save'}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
}
