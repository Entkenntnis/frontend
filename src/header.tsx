import styled from 'styled-components'
import { Menu } from './desktopmenu'
import { menudata } from './menudata'
import Logo from './logo'
import { SearchInput } from './searchinput'
import { MobileMenuButton } from './mobilemenubutton'
import React from 'react'
import { MobileMenu } from './mobilemenu'

export default function Header() {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <BlueHeader>
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <PaddedDiv>
        <DesktopMenu links={menudata}></DesktopMenu>
        <Logo subline={'Die freie Lernplattform'} />
      </PaddedDiv>
      <SearchInput />
      {isOpen && <MobileMenu links={menudata} />}
    </BlueHeader>
  )
}

const BlueHeader = styled.header`
  background-color: ${props => props.theme.colors.bluewhite};
`

const PaddedDiv = styled.div`
  padding: 2rem 1.5rem 1.5rem;
`

const DesktopMenu = styled(Menu)`
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`
