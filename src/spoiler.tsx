import React from 'react'
import styled from 'styled-components'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Spoiler(props) {
  const { defaultOpen, title, children } = props
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <StyledSpoiler>
      <SpoilerTitle onClick={() => setOpen(!open)}>
        {open ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} />
        )}{' '}
        {title}
      </SpoilerTitle>
      {open && <SpoilerContent>{children}</SpoilerContent>}
    </StyledSpoiler>
  )
}

const StyledSpoiler = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  border-left: 4px solid gray;
`

const SpoilerTitle = styled.button`
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 18px;
  padding: 2px;
  cursor: pointer;
  color: black;
`

const SpoilerContent = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 0;
`

export default Spoiler
