import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
    MenubarSeparator,
  } from "@/components/ui/menubar"
  import { useState } from "react";
  import { useNavigate } from "react-router";
  
  const Navbar = () => {
      const navigate = useNavigate();
      const [navToggle, setNavToggle] = useState<Boolean>(false)
  
      return (
          <>
          <Menubar className="px-5 py-8 justify-between rounded-none">
          <MenubarMenu>
              <svg onClick={() => {setNavToggle(!navToggle)}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
          </MenubarMenu>
          <MenubarMenu>
              <span onClick={() => navigate('/')} className="text-2xl font-bold text-blue-700"> 
                    Suraksha
              </span>
              
          </MenubarMenu>
          <MenubarMenu>
              <MenubarTrigger>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              </MenubarTrigger>
              <MenubarContent>
              <MenubarItem>
                  Profile
              </MenubarItem>
              <MenubarItem>
                  Order
              </MenubarItem>
              <MenubarItem>Settings</MenubarItem>
              </MenubarContent>
          </MenubarMenu>
          </Menubar>
  
          {navToggle &&
          <div className="px-5 p-2 flex flex-col bg-blue-50 text-sm font-medium text-slate-600">
              <a onClick={() => navigate('/')}  target="_blank" className="py-2">Home</a>
              <MenubarSeparator/>
              <a onClick={() => navigate('/login')}  target="_blank" className="py-2">Login</a>
          </div>
          }
          </>
      )
  }
  
  export default Navbar;