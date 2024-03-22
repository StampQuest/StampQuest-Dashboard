import React from 'react';
import Header from './Header.jsx';
import styled from 'styled-components';
import { Tab, Tabs } from '@nextui-org/react';
import loadable from '@loadable/component';
import Loading from '../../layout/Loading.jsx';

const Container = styled.div`
  margin-left: 4rem;
  margin-right: 4rem;
  margin-top: 4rem;
`;
const ListActivity = loadable(() => import('../../pages/Activity/ListActivity.jsx'), { fallback: <Loading /> });

const Activity = () => {
  let tabs = [
    {
      id: 'a',
      // icon: <List />,
      label: 'Liste des Activités',
      children: <ListActivity />,
    },
    // {
    //   id: 'b',
    //   // icon: <Table />,
    //   label: 'test b',
    //   children: <ListActivity />,
    // },
    // {
    //   id: 'c',
    //   // icon: <Table />,
    //   label: 'test c',
    //   children: <ListActivity />,
    // },
  ];

  return (
    <Container>
      <Header />
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Dynamic tabs"
          color="primary"
          variant="underlined"
          items={tabs}
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full',
            tab: 'max-w-fit px-5 h-12 ',
          }}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={
                <div className="flex items-center space-x-2">
                  {item?.icon}
                  <span>{item.label}</span>
                </div>
              }
            >
              {item.children}
            </Tab>
          )}
        </Tabs>
      </div>
    </Container>
  );
};

export default Activity;
