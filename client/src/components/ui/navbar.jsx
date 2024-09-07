import { Fragment } from 'react';
// import { Transition, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../state/slices/userSlice';
import axios from '../../service/api';
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import Menu from '@mui/material/Menu';


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        dispatch(clearUser());
        console.log("hello")
        await axios.get("/logout");
        navigate("/login", { replace: true });
    }

    return (
        <nav className="bg-skin-primary p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center max-h-10">
                <h1 className='text-3xl font-teko text-skin-base'>Donezo</h1>

                {/* <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="h-10">
                            <img className='rounded-full h-full hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-green-500 transition-all duration-75'
                                src='https://avatar.iran.liara.run/public/boy?username=Ash' alt="profile" />
                        </MenuButton>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-teko-400 tracking-wide">
                            <div className="py-1">
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => navigate("/profile")}
                                        >
                                            Account settings
                                        </a>
                                    )}
                                </MenuItem>

                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={handleSignOut}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-red-500' : 'text-red-500',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}>
                                            Sign out
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu> */}

                <Dropdown.Root>
                    <Dropdown.Trigger className='h-10 outline-none'>
                        <img className='rounded-full h-full hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-green-500 transition-all duration-75'
                            src='https://avatar.iran.liara.run/public/boy?username=Ash' alt="profile" />
                    </Dropdown.Trigger>

                    <Dropdown.Content data-align="end"  className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" >
                        <Dropdown.Item className='outline-none hover:text-white hover:bg-slate-500 p-1 rounded' onClick={()=>navigate("/profile")} >Profile</Dropdown.Item>
                        <Dropdown.Item className='outline-none hover:text-white hover:bg-red-500 p-1 rounded' onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>


            </div>
        </nav>
    );
};

export default Navbar;


