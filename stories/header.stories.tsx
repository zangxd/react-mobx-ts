import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
import Header from '../src/components/Header';

// storiesOf('Header', module).add('基本用法', withInfo({inline: true})(() => <Header />))

storiesOf('Header', module).add('基本用法', () => <Header />);
