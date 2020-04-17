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
  /* this is such a dirty hack!!! */
  @media (max-width: ${props => props.maxWidth + 40}px) {
    max-width: 100%;
  }
`

export default StyledImg
