import {useTranslation} from "react-i18next";
import {LOCAL_STORAGE} from '@/constants';
import {Select} from 'antd';
import React from 'react';
import './style.scss';

interface IProperties {}

const {Option} = Select;

const OPTIONS = [
  {value: 'en', key: 'english'},
  {value: 'vi', key: 'vietnamese'},
];

const defaultLng = window.localStorage.getItem(LOCAL_STORAGE.LNG) || 'vi';

const SelectLanguage: React.FC<IProperties> = () => {
  const {t, i18n} = useTranslation();

  /** - Handle changing Default Language !*/
  function handleChange(value: string) {
    i18n.changeLanguage(value).then(() => {
      window.localStorage.setItem(LOCAL_STORAGE.LNG, value);
    });
  }

  return (
    <Select defaultValue={defaultLng} style={{width: 120}} onChange={handleChange}>
      {OPTIONS.map(option => <Option key={option.key} value={option.value}>{t(option.key)}</Option>)}
    </Select>
  );
};

export default React.memo(SelectLanguage);
