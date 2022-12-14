import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import Dropzone from '.';
import Button from 'components/atoms/Button';
import Box from 'components/layout/Box';

export default {
  title: 'Molecules/Dropzone',
  argTypes: {
    height: {
      control: { type: 'number' },
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
    width: {
      control: { type: 'number' },
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    hasError: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    acceptedFileTypes: {
      control: { type: 'array' },
      description: '受け付けるファイルタイプ',
      table: {
        type: { summary: 'array' },
      },
    },
    onDrop: {
      description: 'ファイルがドロップされたときのイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    onChange: {
      description: 'ファイルが入力されたときのイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof Dropzone>;

const Template: ComponentStory<typeof Dropzone> = (args) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleDrop = (files: File[]) => {
    setFiles(files);
    args?.onDrop && args.onDrop(files);
  };

  const fetchData = async () => {
    const res = await fetch('/images/sample/1.jpg');
    const blob = await res.blob();
    const file = new File([blob], '1.png', blob);

    setFiles([...files, file]);
  };

  const clearImages = () => {
    setFiles([]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box marginBottom={1}>
        <Dropzone {...args} value={files} onDrop={handleDrop} />
      </Box>
      <Box marginBottom={1}>
        <Button onClick={fetchData}>画像を追加</Button>
      </Box>
      <Box marginBottom={2}>
        <Button onClick={clearImages}>全ての画像をクリア</Button>
      </Box>
      <Box>
        {files.map((file, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={URL.createObjectURL(file)}
            width="100px"
            key={i}
            alt="sample"
          />
        ))}
      </Box>
    </>
  );
};

export const WithControl = Template.bind({});
WithControl.args = {
  height: 200,
  width: '100%',
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  hasError: false,
};
