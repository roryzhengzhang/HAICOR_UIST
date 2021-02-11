import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="Sidebar-wrapper">
            <ProSidebar>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Dashboard
                </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red">Item 1</span>}
                        >
                            Item 1
                    </MenuItem>
                        <MenuItem icon={<FaGem />}>
                            Item 2
                    </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title="SubMenu 1"
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            prefix={<span className="badge gray">3</span>}
                            title="SubMenu 2"
                            icon={<FaHeart />}
                        >
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3</MenuItem>
                        </SubMenu>
                        <SubMenu title="SubMenu 3" icon={<FaList />}>
                            <MenuItem> 1 </MenuItem>
                            <MenuItem> 2 </MenuItem>
                            <SubMenu title="SubMenu 4">
                                <MenuItem>3.1 </MenuItem>
                                <MenuItem> 3.2 </MenuItem>
                                <SubMenu title="SubMenu 5">
                                    <MenuItem> 3.3.1 </MenuItem>
                                    <MenuItem> 3.3.2 </MenuItem>
                                    <MenuItem> 3.3.3 </MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span> Zheng </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>
    );

};

export default Sidebar;