import { Divider, Button, Space } from 'antd';
import styles from './UseState.less';
import { useRef } from 'react';
import lodash from 'lodash';
import { copyText } from '@/utils/index';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormList,
  ProFormDependency,
} from '@ant-design/pro-components';

const options = [
  {
    label: 'String',
    value: '1',
  },
  {
    label: 'Number',
    value: '2',
  },
  {
    label: 'Object',
    value: '3',
  },
  {
    label: 'Arrary',
    value: '4',
  },
  {
    label: 'Null',
    value: '5',
  },
];

const handleType = (value: string) => {
  switch (value) {
    default:
    case '1':
      return `''`;
    case '2':
      return 0;
    case '3':
      return '{}';
    case '4':
      return '[]';
    case '5':
      return null;
  }
};

export default () => {
  const formRef = useRef();

  const handleCope = (codes: string[], type: string) => {
    switch (type) {
      default:
      case '1':
        return codes.join(`\r\n`);
      case '2':
        return codes[0];
      case '3':
        return codes.slice(1, codes.length).join(`\r\n`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ProForm formRef={formRef} autoFocusFirstInput submitter={false}>
        <ProFormList
          name="variables"
          initialValue={[
            {
              type: '1',
              name: '',
            },
          ]}
        >
          {() => {
            return (
              <ProForm.Group>
                <ProFormSelect
                  name="type"
                  initialValue={'1'}
                  label="变量类型"
                  fieldProps={{
                    options,
                  }}
                />
                <ProFormText name="name" label="变量名" />
              </ProForm.Group>
            );
          }}
        </ProFormList>
        <ProFormDependency name={['variables']}>
          {({ variables }) => {
            const codes = [`import { useState } from 'react';`];
            for (const item of variables) {
              codes.push(
                `const [${item?.name || ''}, set${lodash.upperFirst(
                  item?.name,
                )}] = useState(${handleType(item?.type)});`,
              );
            }
            return (
              <>
                <Divider />
                <div>
                  <Space style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                      className="code-copy"
                      type="link"
                      onClick={() => copyText('.code-copy', handleCope(codes, '1'))}
                    >
                      全部复制
                    </Button>
                    <Button
                      type="link"
                      className="code-copy"
                      onClick={() => copyText('.code-copy', handleCope(codes, '2'))}
                    >
                      复制引用
                    </Button>
                    <Button
                      type="link"
                      className="code-copy"
                      onClick={() => copyText('.code-copy', handleCope(codes, '3'))}
                    >
                      复制使用
                    </Button>
                  </Space>
                </div>
                <div className={styles.code_container}>
                  <h2>代码：</h2>
                  <code>
                    {codes.map((code: string, index: number) => (
                      <p key={index}>{code}</p>
                    ))}
                  </code>
                </div>
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
};
