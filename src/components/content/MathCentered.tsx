import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

export interface MathCenteredProps {
  full?: boolean
}

export const MathCentered = styled.div<MathCenteredProps>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 38px;
  font-size: 19px;
  overflow: auto;
`
