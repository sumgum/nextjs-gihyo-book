import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CloudUploadIcon } from 'components/atoms/IconButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDragEvent = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer;
};

const isInput = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null;
};

/**
 * イベントから入植されたファイルを取得
 * @param e DragEventかChangeEvent
 * @returns Fileの配列
 */
const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  if (isDragEvent(e)) {
    return Array.from(e.dataTransfer.files);
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files);
  }

  return [];
};

// ファイルのContent-type
type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf';

type DropzoneRootProps = {
  isFocused?: boolean;
  hasError?: boolean;
  width?: number | string;
  height?: number | string;
};

// ドロップゾーンの外側の外観
const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px dashed
    ${({ theme, isFocused, hasError }) => {
      if (hasError) {
        return theme.colors.danger;
      } else if (isFocused) {
        return theme.colors.black;
      } else {
        return theme.colors.border;
      }
    }};
  border-radius: 8px;
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

// ドロップゾーンの中身
const DropzoneContent = styled.div<{
  width: string | number;
  height: string | number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

const DropzoneInputFile = styled.input`
  display: none;
`;

interface DropzoneProps {
  /**
   * 入力ファイル
   */
  value?: File[];
  /**
   * <input />のname属性
   */
  name?: string;
  /**
   * 許可されるファイルタイプ
   */
  acceptedFileTypes?: FileType[];
  /**
   * 横幅
   */
  width?: number | string;
  /**
   * 縦幅
   */
  height?: number | string;
  /**
   * バリデーションフラグ
   */
  hasError?: boolean;
  /**
   * ファイルがドロップ入力されたときのイベントハンドラ
   */
  onDrop?: (files: File[]) => void;
  /**
   * ファイルが入力されたときのイベントハンドラ
   */
  onChange?: (files: File[]) => void;
}

/**
 * ドロップゾーン
 */
const Dropzone = (props: DropzoneProps) => {
  const {
    value = [],
    name,
    acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    width = '100%',
    height = '200px',
    hasError,
    onDrop,
    onChange,
  } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // ファイル選択ダイアログを表示する
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((file) =>
        acceptedFileTypes.includes(file.type as FileType),
      ),
    );

    if (files.length === 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません${acceptedFileTypes.join(
          ',',
        )}`,
      );
    }

    onDrop && onDrop(files);
    onChange && onChange(files);
  };

  // ドラッグ状態のマウスポインタが範囲内に入っているとき
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // ドラッグ状態のマウスポインタが範囲がに消えたときにフォーカスを外す
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);
  }, []);

  // ドラッグ状態のマウスポインタが範囲内に来たときにフォーカスを当てる
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((file) =>
        acceptedFileTypes.includes(file.type as FileType),
      ),
    );

    onDrop && onDrop(files);
    onChange && onChange(files);
  };

  useEffect(() => {
    if (inputRef.current && value && value.length === 0) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <>
      <DropzoneRoot
        ref={rootRef}
        isFocused={isFocused}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        hasError={hasError}
        width={width}
        height={height}
        data-testid="dropzone"
      >
        {/* ダミーインプット */}
        <DropzoneInputFile
          ref={inputRef}
          type="input"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon />
          <span style={{ textAlign: 'center' }}>デバイスからアップロード</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  );
};

Dropzone.defaultProps = {};

export default Dropzone;
