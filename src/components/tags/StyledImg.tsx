import styled from 'styled-components'

interface StyledImgProps {
  maxWidth?: number
  inline?: boolean
}

const StyledImg = styled.img<StyledImgProps>`
  max-width: 100%;
  max-width: ${props => (props.maxWidth > 0 ? props.maxWidth + 'px' : '')};
  ${props =>
    props.inline
      ? `
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
      `
      : ''}
`

export default StyledImg
