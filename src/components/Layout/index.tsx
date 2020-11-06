import React, { useState } from 'react';
import Sidebar from './Sidebar';

type Props = {};

const Layout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='layout-wrapper'>
      <div className='menu-btn' onClick={() => setOpen(true)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className={'sidebar-overlay' + (open ? ' open' : '')}
        onClick={() => setOpen(false)}
      ></div>
      <aside className={'sidebar-wrapper' + (open ? ' open' : '')}>
        <Sidebar setOpen={setOpen} />
      </aside>
      <main className={'main-wrapper'}>{children}</main>
    </div>
  );
};
export default Layout;
